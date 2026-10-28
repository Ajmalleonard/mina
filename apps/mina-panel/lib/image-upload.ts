export type ImageOutputFormat = "webp" | "jpg" | "png"
export type ImageCompressionPreset = "compressed" | "standard" | "original"

export type PreparedImageVariant = {
  id: string
  file: File
  format: ImageOutputFormat
  preset: ImageCompressionPreset
  height: number
  mimeType: string
  previewUrl: string
  width: number
}

const PRESET_CONFIG: Record<
  ImageCompressionPreset,
  {
    label: string
    maxEdge: number | null
    quality: Record<Exclude<ImageOutputFormat, "png">, number>
  }
> = {
  compressed: {
    label: "Compressed",
    maxEdge: 1280,
    quality: {
      jpg: 0.72,
      webp: 0.68,
    },
  },
  standard: {
    label: "Standard",
    maxEdge: 1920,
    quality: {
      jpg: 0.84,
      webp: 0.8,
    },
  },
  original: {
    label: "Original",
    maxEdge: null,
    quality: {
      jpg: 0.92,
      webp: 0.9,
    },
  },
}

const FORMAT_CONFIG: Record<
  ImageOutputFormat,
  {
    extension: string
    label: string
    mimeType: string
  }
> = {
  webp: {
    extension: "webp",
    label: "WEBP",
    mimeType: "image/webp",
  },
  jpg: {
    extension: "jpg",
    label: "JPG",
    mimeType: "image/jpeg",
  },
  png: {
    extension: "png",
    label: "PNG",
    mimeType: "image/png",
  },
}

export const IMAGE_FORMAT_OPTIONS = (Object.keys(FORMAT_CONFIG) as ImageOutputFormat[]).map((value) => ({
  label: FORMAT_CONFIG[value].label,
  value,
}))

export const IMAGE_PRESET_OPTIONS = (Object.keys(PRESET_CONFIG) as ImageCompressionPreset[]).map((value) => ({
  label: PRESET_CONFIG[value].label,
  value,
}))

export async function prepareImageVariants(file: File) {
  const image = await loadImageElement(file)
  const baseName = sanitizeBaseName(file.name)
  const variants: PreparedImageVariant[] = []

  try {
    for (const preset of Object.keys(PRESET_CONFIG) as ImageCompressionPreset[]) {
      const { height, width } = getOutputDimensions(image.width, image.height, PRESET_CONFIG[preset].maxEdge)
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext("2d")

      if (!context) {
        throw new Error("The browser could not prepare the image canvas.")
      }

      context.drawImage(image, 0, 0, width, height)

      for (const format of Object.keys(FORMAT_CONFIG) as ImageOutputFormat[]) {
        const mimeType = FORMAT_CONFIG[format].mimeType
        const outputFile = await canvasToFile(
          canvas,
          mimeType,
          format === "png" ? undefined : PRESET_CONFIG[preset].quality[format],
          `${baseName}-${preset}.${FORMAT_CONFIG[format].extension}`,
        )

        variants.push({
          id: `${preset}-${format}`,
          file: outputFile,
          format,
          preset,
          height,
          mimeType,
          previewUrl: URL.createObjectURL(outputFile),
          width,
        })
      }
    }

    return variants
  } finally {
    image.cleanup()
  }
}

export function revokePreparedImageVariants(variants: PreparedImageVariant[]) {
  for (const variant of variants) {
    URL.revokeObjectURL(variant.previewUrl)
  }
}

function canvasToFile(canvas: HTMLCanvasElement, type: string, quality: number | undefined, fileName: string) {
  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to create an image variant from this file."))
          return
        }

        resolve(new File([blob], fileName, { type: blob.type || type }))
      },
      type,
      quality,
    )
  })
}

function getOutputDimensions(width: number, height: number, maxEdge: number | null) {
  if (!maxEdge) {
    return { height, width }
  }

  const longestEdge = Math.max(width, height)

  if (longestEdge <= maxEdge) {
    return { height, width }
  }

  const scale = maxEdge / longestEdge

  return {
    height: Math.max(1, Math.round(height * scale)),
    width: Math.max(1, Math.round(width * scale)),
  }
}

function loadImageElement(file: File) {
  return new Promise<HTMLImageElement & { cleanup: () => void }>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image() as HTMLImageElement & { cleanup: () => void }

    image.decoding = "async"
    image.onload = () => {
      image.cleanup = () => URL.revokeObjectURL(objectUrl)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error("Unable to read the selected image."))
    }
    image.src = objectUrl
  })
}

function sanitizeBaseName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/u, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "") || "upload"
}

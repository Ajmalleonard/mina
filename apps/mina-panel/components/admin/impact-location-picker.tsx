"use client"

import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type ImpactLocationPickerProps = {
  latitude: number | null
  longitude: number | null
  onLocationSelect: (latitude: number, longitude: number) => void
  className?: string
}

export function ImpactLocationPicker({
  latitude,
  longitude,
  onLocationSelect,
  className,
}: ImpactLocationPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)
  const onLocationSelectRef = useRef(onLocationSelect)

  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect
  }, [onLocationSelect])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [35, -6.5],
      zoom: 4.5,
      minZoom: 4,
      maxBounds: [
        [28, -12],
        [42, -0.5],
      ],
      attributionControl: { compact: true },
    })
    const marker = new maplibregl.Marker({ color: "#10b981" })
    mapRef.current = map
    markerRef.current = marker
    map.addControl(new maplibregl.NavigationControl(), "top-right")

    map.on("click", (event) => {
      const { lat, lng } = event.lngLat
      marker.setLngLat([lng, lat]).addTo(map)
      onLocationSelectRef.current(lat, lng)
    })

    return () => {
      marker.remove()
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const marker = markerRef.current

    if (!map || !marker) {
      return
    }

    if (latitude === null || longitude === null) {
      marker.remove()
      return
    }

    marker.setLngLat([longitude, latitude]).addTo(map)
    map.flyTo({ center: [longitude, latitude], duration: 300 })
  }, [latitude, longitude])

  return (
    <div
      aria-label="Select an impact location in Tanzania"
      className={cn(
        "h-72 overflow-hidden rounded-[1rem] border border-[var(--border)]",
        className
      )}
      ref={containerRef}
    />
  )
}

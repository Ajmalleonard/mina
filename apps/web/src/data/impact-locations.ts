export interface ProjectLocation {
  id: string;
  title: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  status: 'completed' | 'planned';
  category: string;
}

export const impactLocations: ProjectLocation[] = [
  {
    id: "dar-orphanage",
    title: "Orphanage Complex",
    description: "Multi-functional educational and residential complex for children in need.",
    image: "/assets/MASJID/IMG_4157.JPG",
    lat: -6.7924,
    lng: 39.2083,
    status: 'completed',
    category: "Infrastructure",
  },
  {
    id: "dodoma-girls",
    title: "Girls Orphanage",
    description: "Dedicated safe housing and school specifically for orphaned girls in Central Tanzania.",
    image: "/assets/MASJID/DJI_20250902124328_0005_D.JPG",
    lat: -6.1731,
    lng: 35.7419,
    status: 'completed',
    category: "Infrastructure",
  },
  {
    id: "zanzibar-masjid",
    title: "Stone Town Masjid",
    description: "Community center and prayer hub serving the island's coastal residents.",
    image: "/assets/MASJID/DJI_20241221122624_0083_D.JPG",
    lat: -6.1659,
    lng: 39.2026,
    status: 'completed',
    category: "Infrastructure",
  },
  {
    id: "tanga-boat",
    title: "Coastal Motorboat",
    description: "Providing essential transport and fishing livelihood for remote coastal villages.",
    image: "/images/hands.jpg",
    lat: -5.0689,
    lng: 39.0988,
    status: 'completed',
    category: "Livelihood",
  },
  {
    id: "mwanza-farm",
    title: "Future Poultry Farm",
    description: "Planned sustainable farming initiative to support local food security.",
    image: "/images/children.jpg",
    lat: -2.5164,
    lng: 32.9038,
    status: 'planned',
    category: "Agriculture",
  },
  {
    id: "arusha-clinic",
    title: "Mobile Clinic Stop",
    description: "Future route for our mobile health unit to provide essential vision screenings.",
    image: "/assets/KATARAKT/JQ0G3807.JPG",
    lat: -3.3731,
    lng: 36.6858,
    status: 'planned',
    category: "Health",
  },
  {
    id: "kigoma-learning",
    title: "Learning Center",
    description: "Upcoming educational hub for digital literacy and vocational training.",
    image: "/assets/QUR_DISTRIBUTION/IMG_4157.JPG",
    lat: -4.8769,
    lng: 29.6267,
    status: 'planned',
    category: "Education",
  },
  {
    id: "mtwara-well",
    title: "Deep Water Well",
    description: "Mapping the location for a future high-capacity solar-powered water system.",
    image: "/assets/MASJID/DJI_20241221122624_0083_D.JPG",
    lat: -10.2745,
    lng: 40.1800,
    status: 'planned',
    category: "Water",
  },
];

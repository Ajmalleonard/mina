"use client";

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { impactLocations, ProjectLocation } from '../../data/impact-locations';
import { getOptimizedImageEntry } from '@/lib/images';
import { fetchPublicImpactActivities } from '@/lib/impact-activities';

function addImpactMarker(map: maplibregl.Map, location: ProjectLocation) {
  const locationImage = getOptimizedImageEntry(location.image);
  const element = document.createElement('div');
  element.className = 'custom-marker';
  element.style.width = '24px';
  element.style.height = '24px';
  element.style.borderRadius = '50%';
  element.style.cursor = 'pointer';
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';
  element.style.backgroundColor = location.status === 'completed' ? '#95E18A' : '#F5A623';

  if (location.status !== 'completed') {
    element.classList.add('marker-pulse');
  }

  const dot = document.createElement('div');
  dot.style.width = '6px';
  dot.style.height = '6px';
  dot.style.borderRadius = '50%';
  dot.style.backgroundColor = 'white';
  element.appendChild(dot);

  const popupContent = document.createElement('div');
  popupContent.className = 'w-72 overflow-hidden bg-white border-none';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'relative h-40 w-full overflow-hidden';
  const image = document.createElement('img');
  image.src = locationImage.src;
  image.alt = location.title;
  image.loading = 'lazy';
  image.className = 'object-cover w-full h-full';
  imageContainer.appendChild(image);

  const status = document.createElement('span');
  status.className =
    'absolute top-4 left-4 px-3 py-1 bg-white/95 rounded-full text-[10px] font-black uppercase tracking-widest text-[#111111]';
  status.textContent = location.status === 'completed' ? '✓ Contributed' : '○ Planned';
  imageContainer.appendChild(status);
  popupContent.appendChild(imageContainer);

  const details = document.createElement('div');
  details.className = 'p-6 bg-white';
  const category = document.createElement('span');
  category.className =
    'text-[10px] font-bold uppercase tracking-[0.2em] text-[#95E18A] mb-1 block';
  category.textContent = location.category;
  const title = document.createElement('h3');
  title.className = 'text-xl font-black text-[#111111] mb-2 leading-tight';
  title.textContent = location.title;
  const description = document.createElement('p');
  description.className = 'text-sm text-gray-500 leading-relaxed';
  description.textContent = location.description;
  details.append(category, title, description);
  popupContent.appendChild(details);

  new maplibregl.Marker({ element })
    .setLngLat([location.lng, location.lat])
    .setPopup(
      new maplibregl.Popup({ offset: 25, maxWidth: 'none', className: 'maplibre-popup-content' })
        .setDOMContent(popupContent)
    )
    .addTo(map);
}

const ImpactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [activityLocations, setActivityLocations] = useState<ProjectLocation[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetchPublicImpactActivities()
      .then((activities) => {
        if (isMounted) {
          setActivityLocations(
            activities.map((activity) => ({
              id: activity.id,
              title: activity.title,
              description: activity.description,
              image: activity.image,
              lat: activity.impactLat,
              lng: activity.impactLng,
              status: 'planned' as const,
              category: activity.category,
            }))
          );
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to load activity locations for the Impact Map.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [34.8888, -6.3690], // Center of Tanzania
      zoom: 5.5,
      attributionControl: false,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    impactLocations.forEach((location) => addImpactMarker(map.current!, location));

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) {
      return;
    }

    activityLocations.forEach((location) => addImpactMarker(map.current!, location));
  }, [activityLocations]);

  return (
    <div className="relative w-full h-full min-h-[700px] rounded-4xl overflow-hidden transition-all duration-700">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend Overlay */}
      <div className="absolute bottom-8 left-8 z-10 bg-white/95 backdrop-blur-md p-6 rounded-3xl transition-all duration-300">
        <h4 className="text-sm font-black uppercase tracking-widest text-[#111111] mb-6">Impact Map Indicator</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-[#95E18A]" />
            <span className="text-xs font-bold text-[#111111]">Completed Contributions</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-[#F5A623] marker-pulse" />
            <span className="text-xs font-bold text-[#111111]">Planned Future Impact</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-black/5">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
            Explore our footprint across Tanzania. Each point represents a life-changing project supported by your donations.
          </p>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-4">
        <div className="bg-[#111111] text-white p-6 rounded-3xl">
           <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Total Impact Points</div>
           <div className="text-3xl font-black">{impactLocations.length + activityLocations.length}</div>
        </div>
        <div className="bg-[#95E18A] text-[#111111] p-6 rounded-3xl">
           <div className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/50 mb-1">Active Regions</div>
           <div className="text-3xl font-black">8+</div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMap;

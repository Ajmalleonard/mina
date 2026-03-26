"use client";

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { impactLocations, ProjectLocation } from '../../data/impact-locations';
import Image from 'next/image';

const ImpactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<ProjectLocation | null>(null);

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

    // Add markers
    impactLocations.forEach((location) => {
      // Create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      
      if (location.status === 'completed') {
        el.style.backgroundColor = '#95E18A'; // Premium Green
      } else {
        el.style.backgroundColor = '#F5A623'; // Pulse Orange
        el.classList.add('marker-pulse');
      }

      // Add a smaller white center dot
      const dot = document.createElement('div');
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = 'white';
      el.appendChild(dot);

      // Create Popup content
      const popupContent = `
        <div class="w-72 overflow-hidden bg-white border-none">
          <div class="relative h-40 w-full overflow-hidden">
            <img src="${location.image}" class="object-cover w-full h-full" alt="${location.title}" />
            <div class="absolute top-4 left-4">
               <span class="px-3 py-1 bg-white/95 rounded-full text-[10px] font-black uppercase tracking-widest text-[#111111]">
                ${location.status === 'completed' ? '✓ Contributed' : '○ Planned'}
              </span>
            </div>
          </div>
          <div class="p-6 bg-white">
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#95E18A] mb-1 block">
              ${location.category}
            </span>
            <h3 class="text-xl font-black text-[#111111] mb-2 leading-tight">${location.title}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">${location.description}</p>
          </div>
        </div>
      `;

      // Add marker to map
      new maplibregl.Marker({ element: el })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25, maxWidth: 'none', className: 'maplibre-popup-content' })
            .setHTML(popupContent)
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

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
           <div className="text-3xl font-black">{impactLocations.length}</div>
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

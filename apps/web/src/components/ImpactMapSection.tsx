"use client";

import React from "react";
import { useI18n } from '@/lib/i18n';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map";

const LOCATIONS = [
  { id: "dar-orphanage", title: "Orphanage Complex", description: "Educational & residential complex for children in Dar es Salaam.", lat: -6.7924, lng: 39.2083, status: "completed" as const, category: "Infrastructure" },
  { id: "dodoma-girls", title: "Girls Orphanage", description: "Safe housing & school for orphaned girls in Dodoma.", lat: -6.1731, lng: 35.7419, status: "completed" as const, category: "Infrastructure" },
  { id: "zanzibar-masjid", title: "Stone Town Masjid", description: "Community prayer & education hub on Zanzibar Island.", lat: -6.1659, lng: 39.2026, status: "completed" as const, category: "Infrastructure" },
  { id: "tanga-boat", title: "Coastal Motorboat", description: "Essential transport for remote coastal fishing villages.", lat: -5.0689, lng: 39.0988, status: "completed" as const, category: "Livelihood" },
  { id: "cataract-camp", title: "Cataract Medical Camp", description: "Free sight-restoring surgeries for elderly patients.", lat: -3.2517, lng: 36.8239, status: "completed" as const, category: "Health" },
  { id: "mwanza-farm", title: "Poultry Farm", description: "Planned sustainable farming initiative near Lake Victoria.", lat: -2.5164, lng: 32.9038, status: "planned" as const, category: "Agriculture" },
  { id: "arusha-clinic", title: "Mobile Health Unit", description: "Future mobile clinic serving remote northern communities.", lat: -3.3731, lng: 36.6858, status: "planned" as const, category: "Health" },
  { id: "kigoma-learning", title: "Learning Center", description: "Planned digital literacy & vocational training hub in Kigoma.", lat: -4.8769, lng: 29.6267, status: "planned" as const, category: "Education" },
];

// STATS will be generated inside the component so translations can be applied

export default function ImpactMapSection() {
  const { t } = useI18n();

  const STATS = [
    { label: t('impact.stats.completed'), value: `${LOCATIONS.filter(l => l.status === "completed").length}`, color: "#95E18A" },
    { label: t('impact.stats.planned'), value: `${LOCATIONS.filter(l => l.status === "planned").length}`, color: "#F5A623" },
    { label: t('impact.stats.active'), value: "8+", color: "#111111" },
  ];

  return (
    <section className="py-24 bg-[#FFFBF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <span className="inline-block px-3 py-1 bg-[#95E18A]/15 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2D5A27] mb-5">
              {t('impact.map.badge')}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              {t('impact.map.title').split(' ').slice(0,2).join(' ')} <br />
              <span className="text-[#F5A623]">{t('impact.map.title').split(' ').slice(2).join(' ')}</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-medium text-gray-400 leading-relaxed md:text-right">
            {t('impact.map.subtitle')}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl p-6"
              style={{ background: s.color === "#111111" ? "#111111" : `${s.color}22` }}
            >
              <div className="text-3xl font-black" style={{ color: s.color === "#111111" ? "white" : s.color.replace("22", "") }}>
                {s.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: s.color === "#111111" ? "rgba(255,255,255,0.4)" : "rgba(17,17,17,0.4)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-4xl overflow-hidden" style={{ height: 520 }}>
          <Map
            theme="light"
            center={[35.0, -6.5]}
            zoom={5.2}
            scrollZoom={false}
            className="h-full w-full"
            styles={{
              light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            }}
          >
            <MapControls position="top-right" showZoom showCompass={false} />

            {LOCATIONS.map((loc) => (
              <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat}>
                <MarkerContent>
                  {/* Custom dot marker */}
                  <div
                    className={`w-4 h-4 rounded-full transition-transform hover:scale-150 ${loc.status === "planned" ? "marker-pulse" : ""}`}
                    style={{ background: loc.status === "completed" ? "#95E18A" : "#F5A623" }}
                  />
                </MarkerContent>

                <MarkerPopup offset={10} className="p-0 rounded-3xl overflow-hidden bg-white">
                  <div className="p-5 min-w-[190px]">
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.2em] block mb-2"
                      style={{ color: loc.status === "completed" ? "#2D5A27" : "#7a4e00" }}
                    >
                      {loc.category}
                    </span>
                    <h4 className="text-base font-black text-[#111111] mb-2 leading-tight">{loc.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{loc.description}</p>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-[#111111]"
                      style={{ background: loc.status === "completed" ? "#95E18A" : "#F5A623" }}
                    >
                      {loc.status === "completed" ? `✓ ${t('impact.legend.contributed')}` : `● ${t('impact.legend.planned')}`}
                    </span>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#95E18A]" />
            <span className="text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider">{t('impact.legend.contributed')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
            <span className="text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider">{t('impact.legend.planned')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

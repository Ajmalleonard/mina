"use client";

import React from 'react';
import ImpactMap from '@/components/impact/ImpactMap';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function ImpactPage() {
  const { t } = useI18n();
  return (
    <div className="w-full bg-[#FFFBF2] text-[#111111] min-h-screen">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-[10px] uppercase font-black tracking-widest text-gray-500">
            {t('impact.page.ourFootprint')}
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-[#111111] tracking-tighter leading-none mb-8">
            {t('impact.page.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-400 leading-relaxed italic">
            "{t('impact.page.description')}"
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative rounded-[3rem] overflow-hidden bg-white transition-all duration-700">
           
           <div className="w-full h-[800px]">
             <ImpactMap />
           </div>
        </div>
        
        {/* Supporting Text/Call to Action */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start px-8">
            <div>
                <h2 className="text-3xl font-black text-[#111111] mb-6 leading-tight uppercase tracking-tighter">{t('impact.page.beyondCoordinates')}</h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                    {t('impact.page.markerStory')}
                </p>
                <Link 
                    href="/gallery" 
                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#111111] hover:text-[#95E18A] transition-colors"
                >
                    {t('impact.page.viewGallery')}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
            </div>
            <div className="space-y-8">
            <div className="p-8 bg-white border-black/5 rounded-4xl">
                    <h3 className="text-xl font-black mb-4">{t('impact.page.howWeChoose')}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {t('impact.page.locationDesc')}
                    </p>
                </div>
                <div className="p-8 bg-[#95E18A]/10 rounded-4xl border border-[#95E18A]/20">
                    <h3 className="text-xl font-black mb-4 text-[#2D5A27]">{t('impact.page.expandReach')}</h3>
                    <p className="text-sm text-[#2D5A27]/70 leading-relaxed mb-6">
                        {t('impact.page.expandDesc')}
                    </p>
                    <Link 
                        href="/donate" 
                        className="inline-block bg-[#111111] text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#95E18A] hover:text-[#111111] transition-all"
                    >
                        {t('impact.page.fundProject')}
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

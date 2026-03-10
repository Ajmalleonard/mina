"use client";
import React from "react";
import Link from "next/link";
import HeroSection from "@/components/hero";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
            <HeroSection
                title="Your Empathy Transforms Lives"
                description="Empowering communities by transforming lives and fostering sustainable change through compassionate giving across Tanzania."
            />

            {/* Impact Text Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#111111]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 space-y-2">
                        <h3 className="font-bold text-sm uppercase tracking-wide border-b border-[#111111] pb-2 inline-block">Our Positive Impact</h3>
                        <p className="text-[#111111] text-xs font-medium mt-2">Across Tanzania</p>
                        <p className="text-[#111111] text-xs mt-4 font-medium">Core Values Guiding <br /> Our National Mission</p>
                    </div>

                    <div className="md:col-span-8">
                        <p className="text-2xl md:text-3xl font-medium leading-tight mb-8">
                            Over 80,000 lives have been touched by our charity's work. We focus on empowering individuals, improving communities, and fostering sustainable development across Tanzania. Through targeted initiatives, we have enabled access to education, healthcare, and economic opportunities.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {["Spreading Hope", "Inspiring Action", "Building Futures", "Fostering Unity"].map((tag) => (
                                <span key={tag} className="px-6 py-2 rounded-none border border-[#111111] bg-white text-sm font-medium hover:bg-[#111111] hover:text-white cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Achievements Section */}
            <section className="py-16 bg-[#111111] text-white border-b border-[#111111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                        <div className="p-6">
                            <h3 className="text-5xl font-bold mb-4 text-[#95E18A]">15</h3>
                            <p className="text-xl font-medium uppercase tracking-wide">Masjids Across Nation</p>
                            <p className="text-sm mt-3 text-white/70">Built to serve rural communities as spiritual and educational centers.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-5xl font-bold mb-4 text-[#95E18A]">2,348</h3>
                            <p className="text-xl font-medium uppercase tracking-wide">Cataract Surgeries</p>
                            <p className="text-sm mt-3 text-white/70">Successfully performed, restoring sight to the elderly and vulnerable.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-5xl font-bold mb-4 text-[#95E18A]">500+</h3>
                            <p className="text-xl font-medium uppercase tracking-wide">Orphans Sponsored</p>
                            <p className="text-sm mt-3 text-white/70">Receiving comprehensive care, education, and family support.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Activities Section */}
            <section className="py-24 bg-[#FFFBF2] border-b border-[#111111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Core Activities</h2>
                        <p className="text-lg text-gray-700 max-w-2xl">A comprehensive focus on sustainable humanitarian initiatives designed to provide immediate relief and long-term empowerment across Tanzania.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Zakat Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/images/IMG_8983 2.jpg" alt="Zakat Distribution" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Zakat & Zakat-ul-fitr</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    Purify your wealth and fulfill your religious duty. We manage Zakat distribution with 100% transparency, ensuring funds reach only those strictly eligible under Sharia guidelines in the most impoverished regions.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Donate Zakat
                                </Link>
                            </div>
                        </div>

                        {/* Eid Clothing Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/images/10.jpg" alt="Eid Clothing" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Eid Clothing</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    Celebrate the joy of Eid by gifting new clothes to orphans and vulnerable children. Every child deserves to feel beautiful and valued during our most sacred festivals.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Gift a Set
                                </Link>
                            </div>
                        </div>

                        {/* Iftar Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/images/2.jpg" alt="Mina Iftar Table" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Mina Iftar Table</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    Our community Iftar tables serve thousands of fasting individuals. We focus on providing nutritious, hot meals to orphans and families who struggle to find Suhoor and Iftar every day.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Feed a Family
                                </Link>
                            </div>
                        </div>

                        {/* Water Well Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/images/IMG_5852.jpg" alt="Water Well" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Water Well</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    Water is the source of life. We construct solar-powered and hand-pumped wells in remote villages, ensuring permanent access to clean drinking water and stopping the spread of diseases.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Fund a Well
                                </Link>
                            </div>
                        </div>

                        {/* Masjid Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/assets/MASJID/DJI_20250902124328_0005_D.JPG" alt="Masjid Construction" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Masjid & Madrasa</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    We build durable, high-capacity Mosques that serve as the spiritual and educational heart of the community, providing a safe space for prayer and traditional education for children.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Build a Masjid
                                </Link>
                            </div>
                        </div>

                        {/* Cataract Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/assets/KATARAKT/JQ0G4907_1.JPG" alt="Cataract Surgery" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Cataract Surgery</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    In just 30 minutes, we can restore a person's sight. Our specialized surgical camps provide free cataract procedures to the elderly, helping them regain their independence and quality of life.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Restore Sight
                                </Link>
                            </div>
                        </div>

                        {/* Emergency Relief Card */}
                        <div className="bg-white border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/images/7.jpg" alt="Emergency Relief" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3">Emergency Relief</h3>
                                <p className="text-sm text-gray-600 mb-8 grow leading-relaxed">
                                    Responding to urgent crises, floods, and droughts. We provide direct food aid, medicine, and emergency shelter to families facing immediate life-threatening situations across Tanzania.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-white text-[#111111] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white">
                                    Donate Now
                                </Link>
                            </div>
                        </div>

                        {/* Orphan Sponsorship Card */}
                        <div className="bg-[#95E18A] border border-[#111111] flex flex-col group h-full">
                            <div className="aspect-video relative overflow-hidden border-b border-[#111111]">
                                <Image src="/images/15.jpg" alt="Orphan Sponsorship" fill className="object-cover" />
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold mb-3 text-[#111111]">Orphan Sponsorship</h3>
                                <p className="text-sm text-[#111111] mb-8 grow leading-relaxed font-medium">
                                    Change a life forever. Your sponsorship provides a child with education, healthcare, nutrition, and home support, ensuring they have the foundation to build a successful future.
                                </p>
                                <Link href="/donate" className="inline-block w-full py-4 border border-[#111111] bg-[#111111] text-white text-center font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors">
                                    Sponsor Today
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seasonal Campaigns: Ramadan, Zakat, Eid */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#111111]">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-4">Core Islamic Campaigns</h2>
                    <p className="text-lg text-gray-700 max-w-2xl">Fulfilling specific community obligations and spreading joy during holy months in Tanzania.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#111111]">
                    {/* Ramadan Card */}
                    <div className="bg-white p-8 border-r border-b border-[#111111]">
                        <h3 className="text-2xl font-bold mb-4">Ramadan Relief</h3>
                        <p className="text-sm text-gray-700 mb-8 min-h-[60px]">Providing Suhoor and Iftar food packages to impoverished families throughout the holy month of Ramadan.</p>
                        <Link href="/ramadan" className="inline-block py-3 px-6 bg-white border border-[#111111] text-center font-bold text-sm hover:bg-[#111111] hover:text-white">
                            Support Ramadan
                        </Link>
                    </div>

                    {/* Zakat Card */}
                    <div className="bg-[#95E18A] p-8 border-r border-b border-[#111111]">
                        <h3 className="text-2xl font-bold mb-4">Zakat Distribution</h3>
                        <p className="text-sm text-[#111111] mb-8 font-medium min-h-[60px]">Purify your wealth. We ensure your Zakat reaches the most eligible families strictly under Islamic guidelines.</p>
                        <Link href="/zakat" className="inline-block py-3 px-6 bg-[#111111] text-white border border-[#111111] text-center font-bold text-sm hover:bg-white hover:text-[#111111]">
                            Pay Zakat
                        </Link>
                    </div>

                    {/* Eid Clothing Card */}
                    <div className="bg-white p-8 border-r border-b border-[#111111]">
                        <h3 className="text-2xl font-bold mb-4">Eid Clothing</h3>
                        <p className="text-sm text-gray-700 mb-8 min-h-[60px]">Gift a child the joy of Eid with brand new clothes. Ensure they feel valued and celebrated.</p>
                        <Link href="/eid" className="inline-block py-3 px-6 bg-white border border-[#111111] text-center font-bold text-sm hover:bg-[#111111] hover:text-white">
                            Donate Clothes
                        </Link>
                    </div>
                </div>
      </section>

            {/* Masjid Construction Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#111111]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Masjid Construction</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Building a Masjid is an ongoing charity (Sadaqah Jariyah). Across rural Tanzania, many communities lack a proper place for worship, education, and gathering. Our construction projects aim to provide structurally sound, large-capacity Mosques that serve as the heart of the community.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="text-[#95E18A] text-xl">✓</span>
                                <span className="font-medium text-sm">Providing safe spiritual centers.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#95E18A] text-xl">✓</span>
                                <span className="font-medium text-sm">Serving as educational hubs for children.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#95E18A] text-xl">✓</span>
                                <span className="font-medium text-sm">Building with durable, modern materials.</span>
                            </li>
                        </ul>
                        <Link href="/masjid" className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-[#333333]">
                            Fund a Masjid
                            <span>→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-4/5 relative border border-[#111111]">
                            <Image src="/assets/MASJID/DJI_20250902124328_0005_D.JPG" alt="Masjid Construction" fill className="object-cover" />
                        </div>
                        <div className="grid grid-rows-2 gap-4">
                            <div className="relative border border-[#111111]">
                                <Image src="/assets/MASJID/IMG_4157.JPG" alt="Masjid Workers" fill className="object-cover" />
                            </div>
                            <div className="relative border border-[#111111]">
                                <Image src="/assets/MASJID/DJI_20241221122624_0083_D.JPG" alt="Masjid Drone View" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cataract Surgeries (Katarakt) Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#111111]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
                        <div className="grid grid-rows-2 gap-4">
                            <div className="relative border border-[#111111]">
                                <Image src="/assets/KATARAKT/JQ0G3807.JPG" alt="Medical Exam" fill className="object-cover" />
                            </div>
                            <div className="relative border border-[#111111]">
                                <Image src="/assets/KATARAKT/JQ0G3753_1.JPG" alt="Elderly Patient" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="aspect-4/5 relative border border-[#111111]">
                            <Image src="/assets/KATARAKT/JQ0G4907_1.JPG" alt="Restored Sight" fill className="object-cover" />
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl font-bold mb-6">Restoring Sight: Cataract Relief</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Thousands in Tanzania suffer from preventable blindness due to cataracts. For many elderly individuals, this means a loss of independence and severe hardship. Our medical camps provide free, life-changing cataract surgeries that restore sight in under 30 minutes.
                        </p>
                        <div className="bg-[#e6f7e4] border border-[#111111] p-6 mb-8">
                            <h4 className="font-bold mb-2">Impact per $75</h4>
                            <p className="text-sm">Funds an entire surgery, including pre-operative screening, the procedure itself, and post-operative medications.</p>
                        </div>
                        <Link href="/katarakt" className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-[#333333]">
                            Give the Gift of Sight
                            <span>→</span>
                        </Link>
                    </div>
        </div>
      </section>

            {/* Standard Donation Cards Section (Without animations/shadows/rounded borders) */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Urgent General Appeals</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#111111]">
                        {/* Card 1 */}
                        <div className="bg-white p-8 border-r border-b border-[#111111]">
                            <div className="w-10 h-10 bg-[#95E18A] border border-[#111111] mb-6 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 min-h-[56px]">Empower Vulnerable Youth Through Education</h3>

                            <div className="flex justify-between text-xs font-bold uppercase mb-2 text-[#111111]">
                                <span>Fund Raised</span>
                                <span>76%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 border border-[#111111] mb-2 p-px">
                                <div className="h-full bg-[#95E18A]" style={{ width: '76%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-gray-500 mb-8">
                                <span>$75,000</span>
                                <span>$100,000</span>
                            </div>

                            <Link href="/donate" className="block w-full py-3 bg-white border border-[#111111] text-center font-bold text-sm hover:bg-[#111111] hover:text-white">
                                Donate Now
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#95E18A] p-8 border-r border-b border-[#111111]">
                            <div className="w-10 h-10 bg-[#111111] border border-[#111111] mb-6 flex items-center justify-center text-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                                    <path d="M4.5 12.5l5 5L20 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 min-h-[56px] text-[#111111]">Support Local Families in Crisis Today</h3>

                            <div className="flex justify-between text-xs font-bold uppercase mb-2 text-[#111111]">
                                <span>Fund Raised</span>
                                <span>45%</span>
                            </div>
                            <div className="w-full h-2 bg-white/50 border border-[#111111] mb-2 p-px">
                                <div className="h-full bg-[#111111]" style={{ width: '45%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-[#111111] mb-8">
                                <span>$45,000</span>
                                <span>$100,000</span>
                            </div>

                            <Link href="/donate" className="block w-full py-3 bg-[#111111] text-white border border-[#111111] text-center font-bold text-sm hover:bg-white hover:text-[#111111]">
                                Donate Now
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 border-r border-b border-[#111111]">
                            <div className="w-10 h-10 bg-[#95E18A] border border-[#111111] mb-6 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                                    <path d="M3 18v-6a9 9 0 0118 0v6M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 21v-2a2 2 0 10-4 0v2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 min-h-[56px]">Provide Nutritious Meals to Hungry Children</h3>

                            <div className="flex justify-between text-xs font-bold uppercase mb-2 text-[#111111]">
                                <span>Fund Raised</span>
                                <span>63%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 border border-[#111111] mb-2 p-px">
                                <div className="h-full bg-[#95E18A]" style={{ width: '63%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-gray-500 mb-8">
                                <span>$63,000</span>
                                <span>$100,000</span>
                            </div>

                            <Link href="/donate" className="block w-full py-3 bg-white border border-[#111111] text-center font-bold text-sm hover:bg-[#111111] hover:text-white">
                                Donate Now
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/donate" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:opacity-70">
                            Join the Movement, and Change the Life
                            <span className="bg-[#111111] text-white w-5 h-5 flex items-center justify-center text-[10px] border border-[#111111]">➜</span>
                        </Link>
                    </div>
                </div>
      </section>
    </main>
  );
}

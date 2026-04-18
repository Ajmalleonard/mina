"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerMenu, CloseCircle, Bag2, User, ArrowDown2 } from "iconsax-reactjs";
import { Package, Gift, UtensilsCrossed, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import { useI18n } from '@/lib/i18n';

const MEGA_MENU_ITEMS = {
  projects: [
    { labelKey: "mega.projects.waterWells", label: "Water Wells", href: "/campaigns?category=WATER_WELL_PROJECT" },
    { labelKey: "mega.projects.incomeSecurity", label: "Income Security", href: "/campaigns?category=INCOME_SUPPORT" },
    { labelKey: "mega.projects.zakat", label: "Zakat", href: "/campaigns?category=ZAKAT_AND_SADAKA" },
    { labelKey: "mega.projects.sadaka", label: "Sadaka", href: "/campaigns?category=ZAKAT_AND_SADAKA" },
    { labelKey: "mega.projects.educationSupport", label: "Education Support", href: "/campaigns?category=EDUCATION_AID" },
    { labelKey: "mega.projects.emergencySupport", label: "Emergency Support", href: "/campaigns?category=EMERGENCY_AID" },
    { labelKey: "mega.projects.buildingProjects", label: "Building Projects", href: "/campaigns?category=CONSTRUCTION_PROJECTS" },
  ],
  campaigns: [
    { labelKey: "mega.campaigns.ramadan", label: "Ramadan", href: "/campaigns?category=RAMADAN_CAMPAIGN" },
    { labelKey: "mega.campaigns.threeMonths", label: "Three Holy Months Campaign", href: "/campaigns" },
    { labelKey: "mega.campaigns.qurban", label: "Qurban Campaign", href: "/campaigns" },
    { labelKey: "mega.campaigns.winter", label: "Winter Campaign", href: "/campaigns" },
  ],
  healthSupport: [
    { labelKey: "mega.health.support", label: "Health Support for the Needy", href: "/campaigns?category=HEALTH" },
    { labelKey: "mega.health.circumcision", label: "Male Circumcision Support", href: "/campaigns?category=HEALTH" },
    { labelKey: "mega.health.cataract", label: "Gray Star/Cataract", href: "/campaigns?category=HEALTH" },
    { labelKey: "mega.health.medicalSupport", label: "Medical Support & Health Support", href: "/campaigns?category=HEALTH" },
  ],
  sponsorship: [
    { labelKey: "mega.sponsorship.sponsorshipForOrphans", label: "Sponsorship for Orphan Children", href: "/campaigns?category=ORPHAN" },
    { labelKey: "mega.sponsorship.orphanFund", label: "Orphan Fund", href: "/campaigns" },
    { labelKey: "mega.sponsorship.weAreWithOrphans", label: "We are with the Orphans", href: "/campaigns?category=WE_ARE_TOGETHER_WITH_OUR_ORPHANS" },
  ]
};

const RIGHT_BANNERS = [
  {
    titleKey: "banner.foodPackages",
    title: "FOOD PACKAGES",
    price: "40€",
    href: "/campaigns?category=RAMADAN_CAMPAIGN",
    icon: Package,
  },
  {
    titleKey: "banner.eidGifts",
    title: "EID GIFTS",
    price: "38€",
    href: "/campaigns?category=WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
    icon: Gift,
  },
  {
    titleKey: "banner.iftarForOrphans",
    title: "IFTAR FOR ORPHANS",
    price: "5€",
    href: "/campaigns?category=RAMADAN_CAMPAIGN",
    icon: UtensilsCrossed,
  },
  {
    titleKey: "banner.zakat",
    title: "ZAKAT",
    price: "%2.5",
    href: "/campaigns?category=ZAKAT_AND_SADAKA",
    icon: HandHeart,
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { itemCount, openDrawer } = useCart();

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links (include English fallback labels)
  const navLinks = [
    { href: "/", labelKey: "nav.home", label: "Home" },
    { href: "/about", labelKey: "nav.about", label: "Who we are" },
    { href: "/campaigns", labelKey: "nav.projects", hasMegaMenu: true, label: "Projects & Campaigns" },
    { href: "/gallery", labelKey: "nav.gallery", label: "Gallery" },
    { href: "/impact", labelKey: "nav.impact", label: "Impact Map" },
    { href: "/donate", labelKey: "nav.donate", label: "Zakat Calculator" },
    { href: "/contact", labelKey: "nav.contact", label: "Contact" },
  ];
  
  const { t } = useI18n();

  return (
    <>
      {/* Navbar - Cream Background, No Blur, Flat */}
      <nav className="bg-[#FFFBF2] fixed w-full z-9999 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="shrink-0 flex items-center gap-2">
                <Image
                  src={"/logo.PNG"} // Assuming logo is adaptable or we might need a black version
                  height={60}
                  width={60}
                  alt="Mina Foundation"
                  className="object-contain"
                />
               
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                link.hasMegaMenu ? (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className="text-[#111111] hover:text-[#E84E34] px-2 py-6 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      {t(link.labelKey) || link.label}
                      <ArrowDown2 size="14" />
                    </Link>
                    {/* Mega Menu Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-15 pt-4 hidden group-hover:block w-225">
                      <div className="bg-[#FFFBF2] rounded-xl shadow-2xl border border-gray-200 p-8 flex gap-8">
                        {/* Lists Section */}
                        <div className="flex-1 grid grid-cols-3 gap-8 text-[#111111]">
                          {/* Column 1 */}
                          <div>
                            <h3 className="font-bold text-sm mb-4">{t('mega.projects')}</h3>
                            <ul className="space-y-4">
                              {MEGA_MENU_ITEMS.projects.map((item, i) => (
                                <li key={i}>
                                  <Link href={item.href} className="text-xs text-gray-600 hover:text-[#E84E34] transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    {t(item.labelKey) || item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Column 2 */}
                          <div className="space-y-8">
                            <div>
                              <h3 className="font-bold text-sm mb-4">{t('mega.campaigns')}</h3>
                              <ul className="space-y-4">
                                {MEGA_MENU_ITEMS.campaigns.map((item, i) => (
                                  <li key={i}>
                                    <Link href={item.href} className="text-xs text-gray-600 hover:text-[#E84E34] transition-colors flex items-center gap-2">
                                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                      {t(item.labelKey) || item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-bold text-sm mb-4">{t('mega.healthSupport')}</h3>
                              <ul className="space-y-4">
                                {MEGA_MENU_ITEMS.healthSupport.map((item, i) => (
                                  <li key={i}>
                                    <Link href={item.href} className="text-xs text-gray-600 hover:text-[#E84E34] transition-colors flex items-center gap-2">
                                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                      {t(item.labelKey) || item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {/* Column 3 */}
                          <div>
                            <h3 className="font-bold text-sm mb-4">{t('mega.sponsorship')}</h3>
                            <ul className="space-y-4">
                              {MEGA_MENU_ITEMS.sponsorship.map((item, i) => (
                                <li key={i}>
                                  <Link href={item.href} className="text-xs text-gray-600 hover:text-[#E84E34] transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    {t(item.labelKey) || item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Interactive Banners Section */}
                        <div className="w-75 border-l border-gray-200 pl-8 grid grid-cols-2 gap-y-6 gap-x-2">
                          {RIGHT_BANNERS.map((banner, idx) => {
                            const Icon = banner.icon;
                            return (
                              <Link
                                key={idx}
                                href={banner.href}
                                className="group/banner flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
                              >
                                <div className="w-14 h-14 rounded-full border-2 border-[#E84E34] flex items-center justify-center text-[#E84E34] mb-2 group-hover/banner:bg-[#E84E34] group-hover/banner:text-white transition-colors duration-300">
                                  <Icon className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-[#E84E34] text-[10px] leading-tight tracking-wider uppercase px-1">
                                  {t(banner.titleKey) || banner.title}
                                </span>
                                <span className="font-black text-[#E84E34] text-xl mt-0.5">
                                  {banner.price}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#111111] hover:text-[#E84E34] px-2 py-6 text-sm font-medium transition-colors"
                  >
                    {t(link.labelKey) || link.label}
                  </Link>
                )
              ))}

              {/* Cart Icon */}
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              <button
                onClick={openDrawer}
                className="relative p-2 text-[#111111] hover:text-[#95E18A] transition-colors focus:outline-none"
                aria-label="Open Cart"
              >
                <Bag2 size="24" variant="Bulk" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#95E18A] text-[10px] font-bold text-[#111111]">
                    {itemCount}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/account"
                    className="text-[#111111] hover:text-[#95E18A]"
                  >
                    <User size="24" variant="Bulk" />
                  </Link>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm"
                  >
                    {t('auth.logout')}
                  </Button>
                </div>
              ) : (
                <Button href="/auth/login" className="rounded-full">
                  {t('auth.login')}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={openDrawer}
                className="relative p-2 text-[#111111]"
                aria-label="Open Cart"
              >
                <Bag2 size="24" variant="Bulk" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#95E18A] text-[10px] font-bold text-[#111111]">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 text-[#111111] focus:outline-none"
                aria-label="Toggle menu"
              >
                <HamburgerMenu size="32" color="#111111" variant="Bulk" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-10000 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#FFFBF2] border-l border-black/5 overflow-y-auto">
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl">{t('nav.menu') || 'Menu'}</span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-[#111111]"
                  aria-label="Close menu"
                >
                  <CloseCircle size="32" color="#111111" variant="Bulk" />
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#111111] text-lg font-medium py-3 border-b border-gray-100 hover:text-[#95E18A]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(link.labelKey) || link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#111111] text-white w-full block text-center py-3 rounded-full font-medium active:scale-95 transition-transform"
                >
                  {t('button.donate')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

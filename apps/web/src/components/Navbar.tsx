"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerMenu, CloseCircle } from "iconsax-reactjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Navbar - Cream Background, No Blur, Flat */}
      <nav className="bg-[#FFFBF2] fixed w-full z-[9999] border-b border-black/5">
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
                <span className="font-bold text-xl tracking-tight">Mina Foundation</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#111111] hover:text-[#95E18A] px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {/* Donate Button - Black Pill */}
              <Link
                href="/donate"
                className="bg-[#111111] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Donate Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 text-[#111111] focus:outline-none"
              >
                <HamburgerMenu size="32" color="#111111" variant="Bulk" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[10000] md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#FFFBF2] border-l border-black/5 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                 <span className="font-bold text-xl">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-[#111111]"
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
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#111111] text-white w-full block text-center py-3 rounded-full font-medium active:scale-95 transition-transform"
                >
                  Donate Now
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

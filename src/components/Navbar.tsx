"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerMenu, CloseCircle } from "iconsax-reactjs";
import { motion, AnimatePresence } from "framer-motion";

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
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-9999">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="shrink-0 flex items-center">
                <Image
                  src={"/logo.PNG"}
                  height={80}
                  width={80}
                  alt="Mina foundation"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="md:hidden flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                <HamburgerMenu size="32" color="#16a34a" variant="Bulk" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu as a separate fixed element */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-10000 md:hidden">
          {/* Opaque backdrop */}
          <div className="absolute inset-0 bg-white opacity-100"></div>

          {/* Actual menu content */}
          <div className="relative h-full w-full bg-white overflow-auto">
            <div className="p-2">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <Link href="/" className="shrink-0 flex items-center">
                  <Image
                    src={"/logo.PNG"}
                    height={70}
                    width={70}
                    alt="Mina foundation"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </Link>
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 hover:bg-green-100 focus:outline-none"
                >
                  <CloseCircle size="32" color="#16a34a" variant="Bulk" />
                </button>
              </div>

              <div className="flex flex-col mt-8 space-y-4 bg-white">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="bg-white">
                    <Link
                      href={link.href}
                      className="text-green-700 hover:text-green-900 text-xl font-medium py-3 px-4 block border-b border-gray-100 bg-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-auto mb-8 p-4">
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium block text-center transition-colors"
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

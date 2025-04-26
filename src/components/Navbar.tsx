import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerMenu } from "iconsax-reactjs";

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md  fixed w-full z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={"/logo.PNG"}
                height={80}
                width={80}
                alt="Mina foundation"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
            >
              About Us
            </Link>
            <Link
              href="/gallery"
              className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
            >
              Gallery
            </Link>
            <Link
              href="/donate"
              className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
            >
              Donate
            </Link>
            <Link
              href="/contact"
              className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
            >
              Contact
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            {/* Mobile menu button */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <HamburgerMenu size="32" color="#37d67a" variant="Bulk" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

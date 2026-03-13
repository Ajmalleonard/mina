import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-16 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Mina Foundation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming lives and fostering sustainable change through compassionate giving and community support.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-[#95E18A] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#95E18A] transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-[#95E18A] transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[#95E18A] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal / More */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-[#95E18A] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#95E18A] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-[#95E18A] transition-colors">Cookie Policy</Link></li>
              <li><Link href="/donate" className="hover:text-[#95E18A] transition-colors">Donate</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>info@minafoundation.org</p>
              <p>+255 68 798 0701</p>
              <p>Keko, Dar es salaam, Tanzania</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mina Foundation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             {/* Social placeholders could go here */}
             <span>Instagram</span>
             <span>Twitter</span>
             <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
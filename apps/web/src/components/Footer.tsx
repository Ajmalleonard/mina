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
        {/* Payment & Bank Details Section */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-[#95E18A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Supported Payment Methods
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We accept safe and secure payments from anywhere in the world. Choose the option that works best for you.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-medium hover:bg-white/10 transition-colors">
                PayPal
              </div>
              <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-medium hover:bg-white/10 transition-colors">
                Pesapal
              </div>
              <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-medium hover:bg-white/10 transition-colors">
                Card Transfer
              </div>
            </div>
          </div>

          {/* Bank Transfer */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-[#95E18A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              Direct Bank Transfer
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 mb-2 text-xs uppercase tracking-widest font-bold">Bank Details</p>
                <div className="space-y-1">
                  <p className="text-gray-200 font-medium text-sm">KCB Tanzania Ltd</p>
                  <p className="text-gray-400 text-sm">Lumumba Branch</p>
                  <p className="text-gray-400 text-sm">P.O. Box 804, Tanzania</p>
                  <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-white/10">
                    SWIFT: <span className="text-gray-200 font-mono tracking-wider ml-1">Kcbl TzTz</span>
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2 text-xs uppercase tracking-widest font-bold">Account Info</p>
                <div className="space-y-3">
                  <p className="text-gray-300 flex flex-col text-sm">
                    <span className="text-gray-500 text-xs mb-0.5">Name</span>
                    Mina Foundation
                  </p>
                  <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/10">
                    <p className="text-gray-400 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#95E18A]"></span>
                        USD
                      </span>
                      <span className="text-gray-200 font-mono tracking-wider">3390715967</span>
                    </p>
                    <p className="text-gray-400 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#95E18A]"></span>
                        EUR
                      </span>
                      <span className="text-gray-200 font-mono tracking-wider">3390715983</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mina Foundation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             {/* Social placeholders could go here */}
             <span className="hover:text-gray-300 cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-gray-300 cursor-pointer transition-colors">Twitter</span>
             <span className="hover:text-gray-300 cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
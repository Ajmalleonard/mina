import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mina Foundation</h3>
            <p>Supporting families through donations and community services.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <a href="/gallery" className="hover:underline">
                  Gallery
                </a>
              </li>
              <li>
                <Link href="/donate" className="hover:underline">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: info@minafoundation.org</p>
            <p>Keko, Dar es salaam, Tanzania</p>
            <p>Phone: +255 68 798 0701</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p>
            © {new Date().getFullYear()} Mina Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

}

export default Footer
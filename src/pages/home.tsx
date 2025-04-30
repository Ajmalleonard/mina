"use server"
import React from 'react';
import Link from 'next/link';

function Main() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-green-50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-green-800/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6 animate-fade-in">
            Supporting families Through Compassion
          </h1>
          <p className="text-xl md:text-2xl text-green-800 mb-8 max-w-3xl mx-auto animate-slide-up">
            Mina Foundation is dedicated to providing support, resources, and
            community services to families in need.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/donate"
              className="btn-primary bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-all"
            >
              Donate Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-md font-medium text-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              To provide support, resources, and community services to families
              in need, fostering a sense of unity and compassion within our
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">
                Financial Support
              </h3>
              <p className="text-gray-700 text-center">
                Providing financial assistance to families facing economic
                hardship.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">
                Educational Programs
              </h3>
              <p className="text-gray-700 text-center">
                Offering educational resources and programs for children and
                adults.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">
                Community Building
              </h3>
              <p className="text-gray-700 text-center">
                Creating spaces and events that foster community connections and
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Make a Difference Today
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Your generous donations help us support families in need. Every
              contribution makes a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Donation Options
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 border border-green-200 rounded-md hover:bg-green-50 transition-all">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold">$25</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Provides meals for a family for a week
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-green-200 rounded-md hover:bg-green-50 transition-all">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold">$50</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Supports educational materials for children
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-green-200 rounded-md hover:bg-green-50 transition-all">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold">$100</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Helps with emergency housing assistance
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/donate"
                  className="btn-primary bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium text-lg transition-all w-full block text-center"
                >
                  Donate Now
                </Link>
              </div>
            </div>

            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-green-800/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-6 bg-green-900/70 rounded-lg max-w-md">
                  <h3 className="text-2xl font-bold mb-2">Impact Statistics</h3>
                  <p className="mb-4">In the past year, with your support:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-3xl font-bold text-green-300">500+</p>
                      <p>Families Supported</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-300">
                        $100K+
                      </p>
                      <p>Donations Received</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Gallery
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the impact of our work and community events through our
              gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery items would typically use actual images */}
            <div className="relative h-64 bg-green-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">Community Iftar</h3>
                  <p className="text-sm">Annual Ramadan community gathering</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 bg-green-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">
                    Educational Workshop
                  </h3>
                  <p className="text-sm">Children&apos;s education program</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 bg-green-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">Charity Drive</h3>
                  <p className="text-sm">Winter clothing distribution event</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
            >
              View Full Gallery
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
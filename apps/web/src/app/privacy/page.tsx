import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <div className="bg-[#111111] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Mina Foundation (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website minafoundationtz.org or minafoundation.org (the &quot;Site&quot;), make a donation, or otherwise interact with our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>We collect information in several ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Donation Information:</strong> When you make a donation, we collect your name, email address, phone number, billing address, and payment details (processed securely via PayPal, PesaPal, or our payment processor). We do not store your full credit card details.</li>
              <li><strong>Account Information:</strong> If you create an account, we collect your name, email, phone number, and password (stored in hashed form).</li>
              <li><strong>Usage Data:</strong> We collect non-personally identifying information such as browser type, IP address, pages visited, and referring URL through cookies and server logs.</li>
              <li><strong>Communications:</strong> If you contact us via the contact form, we collect your name, email, and message content.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and receipt your donations</li>
              <li>Send you updates about our programs, campaigns, and impact (you may opt out at any time)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Improve our website and services</li>
              <li>Comply with applicable laws and regulations</li>
              <li>Detect and prevent fraud or unauthorized transactions</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with: (a) our payment processors (PayPal, PesaPal, Stripe) solely for processing your donation; (b) our service providers who assist in operating our website, under strict confidentiality obligations; (c) law enforcement or regulators when required by law; and (d) with your explicit consent for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your personal information for as long as your account is active, or as needed to provide you services, comply with legal obligations, resolve disputes, and enforce our agreements. Donation records are retained for a minimum of 7 years in accordance with financial record-keeping requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include HTTPS encryption, secure servers, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Cookies & Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device. We use essential cookies (necessary for the site to function), analytics cookies (to understand how visitors use our site), and marketing cookies (with your consent). You can control cookie preferences through our cookie consent banner or your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Your Rights</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:info@minafoundation.org" className="text-[#95E18A] underline">info@minafoundation.org</a>.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites (e.g., PayPal, PesaPal). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. Children&apos;s Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete such information promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200">
            <p className="font-bold text-[#111111]">Mina Foundation</p>
            <p className="text-gray-600">Keko, Dar es Salaam, Tanzania</p>
            <p className="text-gray-600">Email: <a href="mailto:info@minafoundation.org" className="text-[#95E18A] underline">info@minafoundation.org</a></p>
            <p className="text-gray-600">Phone: +255 68 798 0701</p>
          </div>
        </section>

        <div className="pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#95E18A] font-bold hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <div className="bg-[#111111] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using the Mina Foundation website (minafoundationtz.org and minafoundation.org, the &quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Site. We reserve the right to modify these Terms at any time. Continued use of the Site after any changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. About Mina Foundation</h2>
          <p className="text-gray-700 leading-relaxed">
            Mina Foundation is a registered non-profit charitable organization based in Dar es Salaam, Tanzania. Registration number: 00NGO/N/0789. Our mission is to serve communities in Tanzania through humanitarian aid, healthcare, education, and infrastructure programs. We are committed to transparency and accountability in all our operations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Charitable Donations</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>By making a donation through our Site, you agree to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All donations are voluntary and non-refundable once processed, unless in exceptional circumstances at our sole discretion.</li>
              <li>Donations are used at our discretion to support our charitable programs, operations, and administrative costs in accordance with our mission.</li>
              <li>Donations are processed through third-party payment processors (PayPal, PesaPal, or card payments). Your payment details are governed by the terms of the respective payment processor.</li>
              <li>You confirm that you are authorized to use the payment method and that funds are from legitimate sources.</li>
              <li>Donations made from outside Tanzania may be subject to international transaction fees charged by your bank or payment provider.</li>
              <li>Mina Foundation is not a tax-exempt organization in most jurisdictions. Please consult a tax professional regarding deductibility of your donation.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. User Accounts</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>If you create an account on our Site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must provide accurate and complete information when registering.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms or are used for fraudulent purposes.</li>
              <li>You may delete your account at any time by contacting us.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Prohibited Uses</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree not to use our Site to: (a) violate any applicable local, national, or international law or regulation; (b) upload or transmit viruses, malware, or any other malicious code; (c) attempt to gain unauthorized access to our systems or other users&apos; accounts; (d) collect or harvest any information from the Site without permission; (e) interfere with or disrupt the Site or servers connected to the Site; (f) impersonate Mina Foundation or any other person or entity; (g) use the Site for any fraudulent or deceptive purpose; (h) spam, harass, or harm any other user.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this Site, including text, graphics, logos, images, and software, is the property of Mina Foundation or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent, except as expressly permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Site may include links to third-party websites, services, or payment processors. These third parties operate under their own terms and privacy policies. Mina Foundation does not endorse, guarantee, or assume responsibility for any third-party content, products, or services. Your interactions with third parties are solely between you and that third party.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
          <p className="text-gray-700 leading-relaxed">
            OUR SITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WHILE WE STRIVE TO PROVIDE ACCURATE INFORMATION ABOUT OUR PROGRAMS, WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR TIMELINESS OF ANY INFORMATION ON THE SITE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MINA FOUNDATION AND ITS OFFICERS, DIRECTORS, VOLUNTEERS, AND EMPLOYEES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SITE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SITE; (C) ANY CONTENT OBTAINED FROM THE SITE; OR (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify, defend, and hold harmless Mina Foundation and its officers, directors, volunteers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the Site, your violation of these Terms, or your violation of any rights of a third party.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the United Republic of Tanzania, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of Tanzania.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">12. Severability</h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">13. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms, please contact us:
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

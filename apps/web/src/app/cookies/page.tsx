import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <div className="bg-[#111111] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information. Cookies are not software programs and cannot execute code on your device. They are passive and cannot spread viruses or malware.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            Mina Foundation uses cookies and similar tracking technologies to improve your experience on our website, analyze how visitors use our site, and to support our marketing efforts. The cookies we use fall into the following categories:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Categories of Cookies We Use</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">Essential Cookies</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, session management, and accessibility. You cannot opt out of these cookies as the site would not work without them.
              </p>
              <p className="text-gray-500 text-xs"><strong>Examples:</strong> Session cookies, authentication tokens, shopping cart cookies</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">Performance Cookies</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                These cookies collect anonymous information about how visitors use our website — which pages they visit most often, how long they stay, and if they encounter any errors. This data helps us improve our website&apos;s performance and user experience.
              </p>
              <p className="text-gray-500 text-xs"><strong>Examples:</strong> Google Analytics page view tracking, session duration measurement</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">Functionality Cookies</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                These cookies allow our website to remember choices you make (such as your language preference, region, or donation preferences) and provide enhanced, personalized features. The information these cookies collect is anonymized and cannot track your browsing activity on other websites.
              </p>
              <p className="text-gray-500 text-xs"><strong>Examples:</strong> Remembering your preferred donation amount, language settings</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">Marketing Cookies</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                With your consent, we may use marketing cookies to track your browsing behavior across websites and build a profile of your interests. These cookies are used to deliver relevant advertisements and measure the effectiveness of our campaigns.
              </p>
              <p className="text-gray-500 text-xs"><strong>Examples:</strong> Facebook Pixel, Google Ads conversion tracking</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            Some cookies are placed by third-party services that appear on our pages. We use the following third-party services that may set cookies:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
            <li><strong>Google Analytics</strong> — to understand how visitors use our site. Google Analytics uses cookies to collect anonymous usage data. You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#95E18A] underline">Google Analytics Opt-out Browser Add-on</a>.</li>
            <li><strong>PayPal &amp; PesaPal</strong> — payment processors that may set cookies during the checkout process to manage your transaction securely.</li>
            <li><strong>Stripe</strong> — if you use card payments, Stripe sets cookies to process your transaction and prevent fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Managing Your Cookie Preferences</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>You have several options for managing cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookie Consent Banner:</strong> When you first visit our site, you will see a cookie consent banner where you can accept or customize your cookie preferences. You can revisit these choices at any time by contacting us.</li>
              <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can typically block cookies, delete existing cookies, or allow cookies only from specific websites. Instructions for common browsers:</li>
            </ul>
            <ul className="list-disc pl-10 mt-2 space-y-1 text-sm text-gray-600">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy &amp; Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Cookies and site permissions</li>
            </ul>
            <p className="mt-4">Note: Disabling essential cookies may impair the functionality of our website, including the donation process.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Do Not Track</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website currently does not respond to &quot;Do Not Track&quot; browser signals. We honor the choices you make through our cookie consent mechanism, but our response is consistent regardless of whether your browser sends a DNT signal.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or legal requirements. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
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

"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <div className="bg-[#111111] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            {t("privacy.title")}
          </h1>
          <p className="text-gray-400">{t("privacy.lastUpdated")}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section1.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section1.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section2.title")}</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t("privacy.section2.p1")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>{t("privacy.section2.li.donationTitle")}</strong> {t("privacy.section2.li.donation")}</li>
              <li><strong>{t("privacy.section2.li.accountTitle")}</strong> {t("privacy.section2.li.account")}</li>
              <li><strong>{t("privacy.section2.li.usageTitle")}</strong> {t("privacy.section2.li.usage")}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section3.title")}</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t("privacy.section3.p1")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("privacy.section3.li.processDonations")}</li>
              <li>{t("privacy.section3.li.sendUpdates")}</li>
              <li>{t("privacy.section3.li.respondInquiries")}</li>
              <li>{t("privacy.section3.li.improve")}</li>
              <li>{t("privacy.section3.li.comply")}</li>
              <li>{t("privacy.section3.li.detectFraud")}</li>
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
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section5.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section5.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section6.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section6.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section7.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section7.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section8.title")}</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t("privacy.section8.p1")}</p>
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
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section9.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section9.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section10.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section10.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section11.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section11.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section12.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("privacy.section12.p1")}</p>
          <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200">
            <p className="font-bold text-[#111111]">{t("footer.brandTitle")}</p>
            <p className="text-gray-600">{t("contact.location.address")}</p>
            <p className="text-gray-600">Email: <a href={`mailto:${t("contact.email.address")}`} className="text-[#95E18A] underline">{t("contact.email.address")}</a></p>
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

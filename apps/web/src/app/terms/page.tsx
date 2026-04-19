"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <div className="bg-[#111111] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            {t("terms.title")}
          </h1>
          <p className="text-gray-400">{t("terms.lastUpdated")}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section1.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section1.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section2.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section2.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section3.title")}</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t("terms.section3.p1")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("terms.section3.li.1")}</li>
              <li>{t("terms.section3.li.2")}</li>
              <li>{t("terms.section3.li.3")}</li>
              <li>{t("terms.section3.li.4")}</li>
              <li>{t("terms.section3.li.5")}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section4.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section4.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section5.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section5.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section6.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section6.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section7.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section7.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section8.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section8.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section9.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section9.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section10.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section10.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.section11.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("terms.section11.p1")}</p>
        </section>

        <div className="pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#95E18A] font-bold hover:underline">
            {t("terms.backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}

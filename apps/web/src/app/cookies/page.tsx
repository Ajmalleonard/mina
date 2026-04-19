"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function CookiesPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <div className="bg-[#111111] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            {t("cookies.title")}
          </h1>
          <p className="text-gray-400">{t("cookies.lastUpdated")}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section1.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("cookies.section1.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section2.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("cookies.section2.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section3.title")}</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">{t("cookies.categories.essential.title")}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">{t("cookies.categories.essential.desc")}</p>
              <p className="text-gray-500 text-xs"><strong>{t("cookies.categories.examples")}</strong> {t("cookies.categories.essential.examples")}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">{t("cookies.categories.performance.title")}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">{t("cookies.categories.performance.desc")}</p>
              <p className="text-gray-500 text-xs"><strong>{t("cookies.categories.examples")}</strong> {t("cookies.categories.performance.examples")}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">{t("cookies.categories.functionality.title")}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">{t("cookies.categories.functionality.desc")}</p>
              <p className="text-gray-500 text-xs"><strong>{t("cookies.categories.examples")}</strong> {t("cookies.categories.functionality.examples")}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-[#111111]">{t("cookies.categories.marketing.title")}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">{t("cookies.categories.marketing.desc")}</p>
              <p className="text-gray-500 text-xs"><strong>{t("cookies.categories.examples")}</strong> {t("cookies.categories.marketing.examples")}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section4.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("cookies.section4.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section5.title")}</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t("cookies.section5.p1")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("cookies.section5.li.browser")}</li>
              <li>{t("cookies.section5.li.chrome")}</li>
              <li>{t("cookies.section5.li.firefox")}</li>
              <li>{t("cookies.section5.li.safari")}</li>
              <li>{t("cookies.section5.li.edge")}</li>
            </ul>
            <p className="mt-4">{t("cookies.section5.note")}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section6.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("cookies.section6.p1")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("cookies.section7.title")}</h2>
          <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200">
            <p className="font-bold text-[#111111]">{t("footer.brandTitle")}</p>
            <p className="text-gray-600">{t("contact.location.address")}</p>
            <p className="text-gray-600">Email: <a href={`mailto:${t("contact.email.address")}`} className="text-[#95E18A] underline">{t("contact.email.address")}</a></p>
            <p className="text-gray-600">Phone: +255 68 798 0701</p>
          </div>
        </section>

        <div className="pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#95E18A] font-bold hover:underline">
            {t("cookies.backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}

import {Link} from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy");

  return (
    <main className="mx-auto flex w-full max-w-[960px] flex-col gap-8 px-4 pb-16 pt-24 md:px-8 md:pt-28">
      <header className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#888]">
          {t("legal")}
        </p>
        <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("intro")}
        </p>
        <p className="mt-3 text-xs text-[#777]">{t("updated")}</p>
      </header>

      <section className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">{t("s1Title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("s1Body")}
        </p>
      </section>

      <section className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">{t("s2Title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("s2Body")}
        </p>
      </section>

      <section className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">{t("s3Title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("s3Body")}
        </p>
      </section>

      <section className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">{t("s4Title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("s4Body")}
        </p>
      </section>

      <section className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">{t("s5Title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("s5Body")}
        </p>
      </section>

      <section className="rounded-2xl border border-border-gray bg-[#0d0d0d] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">{t("s6Title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#aaa] md:text-base">
          {t("s6Body")}
        </p>
      </section>

      <Link
        href="/"
        className="inline-flex w-fit items-center rounded-lg border border-border-gray bg-[#131313] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[#bbb] transition-colors hover:border-logo hover:text-foreground"
      >
        {t("backToHome")}
      </Link>
    </main>
  );
}

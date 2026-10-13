import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="container-x py-32 text-center">
      <p className="text-sm font-semibold tabular-nums text-teal-dark">404</p>
      <h1 className="h-section mt-4">{t("title")}</h1>
      <p className="lead mx-auto mt-4 max-w-md">{t("text")}</p>
      <Link href="/" className="btn-primary mt-10">{t("back")}</Link>
    </section>
  );
}

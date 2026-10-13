import clsx from "clsx";

export function SectionHeading({
  eyebrow, title, intro, align = "left", tone = "dark", id,
}: { eyebrow: string; title: string; intro?: string; align?: "left" | "center"; tone?: "dark" | "light"; id?: string }) {
  return (
    <div data-reveal className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className={clsx("eyebrow", tone === "light" && "!text-sage before:!bg-sage")}>{eyebrow}</p>
      <h2 id={id} className={clsx("h-section mt-4", tone === "light" && "text-ivory")}>{title}</h2>
      {intro && <p className={clsx("lead mt-5", tone === "light" && "!text-ivory/75")}>{intro}</p>}
    </div>
  );
}

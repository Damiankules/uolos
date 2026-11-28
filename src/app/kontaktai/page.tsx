import Contact from "@/components/sections/Contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontaktai",
  description: "Papasakokite apie savo idėją — aptarsime individualaus uolų reljefo projekto galimybes. Telefonas, el. paštas ir užklausos forma.",
  path: "/kontaktai/",
});

export default function ContactPage() {
  return <div className="min-h-[calc(100svh-78px)] bg-ink"><Contact as="h1" /></div>;
}

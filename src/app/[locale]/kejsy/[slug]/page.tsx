import { permanentRedirect } from "next/navigation";
import { CASES } from "@/content/cases-stub";
import { localizedPath } from "@/lib/locale-path";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export default function KejsyAliasSlugPage({ params }: Props) {
  permanentRedirect(localizedPath(params.locale, `/keysy/${params.slug}`));
}

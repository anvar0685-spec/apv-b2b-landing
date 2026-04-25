import { permanentRedirect } from "next/navigation";
import { localizedPath } from "@/lib/locale-path";

type Props = { params: { locale: string } };

/** Канонический раздел в коде — `/keysy`; URL из мастер-документа §5 — `/kejsy`. */
export default function KejsyAliasPage({ params }: Props) {
  permanentRedirect(localizedPath(params.locale, "/keysy"));
}

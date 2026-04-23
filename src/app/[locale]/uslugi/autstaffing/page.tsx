import { permanentRedirect } from "next/navigation";

type Props = { params: { locale: string } };

/** Аутстаффинг не оказываем — единая витрина складского аутсорсинга. */
export default function Page({ params }: Props) {
  const path = params.locale === "en" ? "/en/uslugi/autsorsing" : "/uslugi/autsorsing";
  permanentRedirect(path);
}

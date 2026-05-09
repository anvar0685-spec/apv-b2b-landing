import { permanentRedirect } from "next/navigation";

type Props = { params: { locale: string } };

/** Раньше отдельная услуга; позиционируем только складской аутсорсинг — см. `/uslugi/autsorsing`. */
export default function Page({ params }: Props) {
  permanentRedirect(`/${params.locale}/uslugi/autsorsing`);
}

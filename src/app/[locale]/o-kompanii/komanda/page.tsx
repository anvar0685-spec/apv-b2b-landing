import { permanentRedirect } from "next/navigation";

type PageProps = { params: { locale: string } };

export default function Page({ params }: PageProps) {
  permanentRedirect(`/${params.locale}/o-kompanii`);
}

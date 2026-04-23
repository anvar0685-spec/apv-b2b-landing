import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ответы на частые вопросы по аутстаффингу, ценам и compliance.",
};

export default function Page() {
  return (
    <StubPage
      title="FAQ"
      kicker="Поддержка"
      description="Ответы на частые вопросы по модели поставки, срокам выхода на объекты и документальному контуру. Расширенная версия появится здесь же после редакционного наполнения."
    />
  );
}

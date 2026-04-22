import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "О компании — команда и EEAT",
  description: "История, ценности, цифры, ссылки на команду, документы и прессу.",
};

export default function Page() {
  return <StubPage title="О компании" />;
}

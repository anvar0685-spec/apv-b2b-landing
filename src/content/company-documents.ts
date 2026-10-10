export type CompanyDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
};

/** Подтверждённые публичные ссылки; расширенный пакет — в docs/copywriting-business-questions.md */
export const COMPANY_DOCUMENTS: CompanyDocument[] = [
  {
    id: "requisites",
    title: "Реквизиты исполнителя",
    description: "ИНН, КПП, расчётный счёт и контакты для договора — на странице контактов.",
    href: "/kontakty",
  },
  {
    id: "privacy",
    title: "Политика конфиденциальности",
    description: "Как обрабатываем персональные данные при обращении через сайт и в работе по договору.",
    href: "/politika-konfidencialnosti",
  },
  {
    id: "legal",
    title: "Правовая информация",
    description: "Оферта, согласие на обработку ПДн, правила сайта и сводные сведения для пользователей.",
    href: "/pravovaya-informaciya",
  },
];

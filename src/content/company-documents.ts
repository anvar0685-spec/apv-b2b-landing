export type CompanyDocument = {
  id: string;
  title: string;
  description: string;
};

export const COMPANY_DOCUMENTS: CompanyDocument[] = [
  {
    id: "charter",
    title: "Устав и корпоративные документы",
    description: "Актуальная редакция устава, решения о единоличном исполнительном органе, выписки по запросу.",
  },
  {
    id: "licenses",
    title: "Лицензии и допуски",
    description: "Перечень лицензируемых видов деятельности (при наличии) и подтверждения допуска к работам.",
  },
  {
    id: "policies",
    title: "Локальные акты по ПДн и ИБ",
    description: "Политика конфиденциальности, модель угроз, регламенты доступа к данным заказчика.",
  },
  {
    id: "financial",
    title: "Финансовые справки",
    description: "Карточка предприятия, справки об отсутствии задолженности — по запросу для тендерных комиссий.",
  },
];

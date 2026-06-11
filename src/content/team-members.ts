export type TeamMember = {
  id: string;
  initials: string;
  name: string;
  role: string;
  focus: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ceo",
    initials: "РК",
    name: "Руководитель направления",
    role: "CEO / Управляющий партнёр",
    focus: "Стратегия, ключевые клиенты, развитие сервисной модели.",
  },
  {
    id: "ops",
    initials: "ОД",
    name: "Директор по операциям",
    role: "COO",
    focus: "Операции на объекте, гарантии, масштабирование выхода на площадки.",
  },
  {
    id: "hr",
    initials: "КП",
    name: "Директор по персоналу",
    role: "HRD",
    focus: "Подбор, адаптация, удержание, кадровые документы и проверки.",
  },
  {
    id: "legal",
    initials: "ЮС",
    name: "Руководитель юридического блока",
    role: "Chief Legal",
    focus: "Договоры, претензионная работа, персональные данные.",
  },
  {
    id: "fin",
    initials: "ФА",
    name: "Финансовый директор",
    role: "CFO",
    focus: "Маржинальность проектов, прозрачность КП, отчётность.",
  },
  {
    id: "bd",
    initials: "ПР",
    name: "Директор по развитию",
    role: "BD",
    focus: "Новые отрасли, партнёрства и развитие контента под клиентов.",
  },
];

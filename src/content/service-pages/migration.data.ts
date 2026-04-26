import type { ServicePageBilingual } from "./types";

export const migrationPage: ServicePageBilingual = {
  slug: "migracionnyy-uchet",
  ru: {
    h1: "Миграционный учёт и compliance для работодателя",
    subtitle:
      "Снижаем регуляторные риски: уведомления, сроки, документальный след и взаимодействие с контуром безопасности — в связке с поставкой смен на объект.",
    intro: [
      "Миграционный учёт для складов и производств — это не «отдел кадров отдельно», а часть операционной дисциплины: кто отвечает за уведомления, где хранятся версии документов, как проходят проверки.",
      "Мы выстраиваем чек-листы, матрицу ответственности и регламент эскалаций до выхода сотрудника на смену — чтобы линейный руководитель не оставался один на один с формальными рисками.",
      "Информация на странице не заменяет юридическое заключение; сложные кейсы передаются профильному юристу после сбора фактов.",
    ],
    segments: [
      { title: "Склады и логистика", text: "Массовый персонал, сменность, жёсткие проверки и аудит следов документов." },
      { title: "Производство", text: "Патенты, разрешения, учёт по объектам и сменам." },
      { title: "Стройка", text: "Временные бригады, пропускной режим, контроль сроков уведомлений." },
      { title: "HoReCa", text: "Сезонные пики, сменные графики, обучение ответственных на точке." },
    ],
    howItWorks: [
      "Аудит текущего состояния документов и процессов.",
      "Регламент и матрица ответственности.",
      "Внедрение чек-листов и контрольных точек до смены.",
      "Обучение линейных руководителей и ответственных за смену.",
      "Регулярный мониторинг изменений законодательства и внутренних политик заказчика.",
    ],
    includes: [
      { name: "Чек-листы и шаблоны документов", included: true },
      { name: "Сопровождение проверок и аудита", included: true },
      { name: "Индивидуальное юридическое заключение по кейсу", included: false },
    ],
    comparison: [
      { label: "Скорость реакции", us: "Регламентированная эскалация", staff: "Зависит от загрузки HR", agency: "Проектно" },
      { label: "Документооборот", us: "Централизованный след", staff: "Часто разрозненный", agency: "Частично" },
      { label: "Покрытие объектов", us: "Москва и МО", staff: "Локально", agency: "Ограничено договором" },
    ],
    faq: [
      { q: "Это юридическая консультация?", a: "Нет: это информационные материалы. Индивидуальные выводы готовит юрист после анализа документов." },
      { q: "Как связать с аутсорсингом смен?", a: "Compliance — обязательный слой при поставке персонала; пакеты комбинируются в КП." },
      { q: "Кто отвечает перед проверяющими?", a: "Зависит от модели договора; в стандартной схеме подрядчика — документальный контур на стороне подрядчика." },
      { q: "Можно ли только compliance без смен?", a: "Обсуждается в КП; чаще связка эффективнее." },
      { q: "Какие сроки внедрения регламентов?", a: "Зависят от объёма и текущего состояния учёта — фиксируются в проекте." },
      { q: "Как запросить разбор?", a: "Форма заявки с пометкой «миграционный учёт» — менеджер вернётся с чек-листом вопросов." },
    ],
  },
  en: {
    h1: "Migration compliance for employers",
    subtitle:
      "Reduce regulatory risk: notifications, deadlines, an audit trail and security alignment — tied to shift delivery on site.",
    intro: [
      "For warehouses and plants, migration compliance is part of ops discipline: who owns notifications, where document versions live, how inspections are prepared.",
      "We deploy checklists, a responsibility matrix and escalation paths before anyone hits the shift — so line managers are not alone with formal risk.",
      "Copy is informational; complex cases go to counsel after facts are collected.",
    ],
    segments: [
      { title: "Warehouses and logistics", text: "Mass headcount, shift patterns, tight inspections and audit trails." },
      { title: "Manufacturing", text: "Patents, permits, per-site and per-shift tracking." },
      { title: "Construction", text: "Temporary crews, access control, notification deadlines." },
      { title: "HoReCa", text: "Seasonal peaks, rosters, training for accountable leads on site." },
    ],
    howItWorks: [
      "Audit current paperwork and processes.",
      "Playbook and responsibility matrix.",
      "Checklists and control points before shifts.",
      "Train line leads and shift owners.",
      "Monitor law changes and customer internal policies.",
    ],
    includes: [
      { name: "Checklists and document templates", included: true },
      { name: "Inspection and audit support", included: true },
      { name: "Bespoke legal opinion on a case", included: false },
    ],
    comparison: [
      { label: "Response speed", us: "Regulated escalation", staff: "Depends on HR load", agency: "Project-based" },
      { label: "Document trail", us: "Centralised", staff: "Often fragmented", agency: "Partial" },
      { label: "Site coverage", us: "Moscow and the Moscow Oblast", staff: "Local", agency: "Contract-limited" },
    ],
    faq: [
      { q: "Is this legal advice?", a: "No — informational only. Counsel issues opinions after reviewing facts." },
      { q: "How does it tie to shift outsourcing?", a: "Compliance is a required layer when supplying labour; bundles are combined in the proposal." },
      { q: "Who faces inspectors?", a: "Contract-dependent; in the standard vendor model the vendor runs the document loop." },
      { q: "Compliance without shifts?", a: "Ask in the proposal; the bundle is usually stronger together." },
      { q: "How long to roll out playbooks?", a: "Depends on volume and current state — fixed in the project plan." },
      { q: "How to request a review?", a: "Use the request form with a “migration compliance” note — the manager returns a question checklist." },
    ],
  },
};

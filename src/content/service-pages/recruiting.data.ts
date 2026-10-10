import type { ServicePageBilingual } from "./types";
import { SERVICE_CASES_LEAD, SERVICE_COST_FAQ, SERVICE_FINAL_CTA } from "./shared-service-copy";

export const recruitingPage: ServicePageBilingual = {
  slug: "podbor-personala",
  ru: {
    h1: "Как подбираем работников для вашего склада",
    metaTitle: "Подбор работников для склада | АПВ — СИСТЕМА",
    subtitle:
      "Уточняем задачи, график и требования к опыту. Подбираем кандидатов, проверяем необходимые документы и согласуем выход на объект. После начала работы сопровождаем смены и замену работников в рамках договора на аутсорсинг.",
    intro: [
      "Уточняем, какие работы предстоят на складе, сколько работников требуется и какой график нужен. При подборе учитываем опыт, необходимые документы и условия объекта. Дату выхода и порядок дальнейшего сопровождения согласуем заранее.",
    ],
    segments: [
      { title: "Профессии и численность", text: "Согласуем роли и количество работников под задачи склада." },
      {
        title: "Задачи и требования",
        text: "Учитываем операции участков, оборудование и требования к опыту.",
      },
      {
        title: "Адрес, график и старт",
        text: "Фиксируем адрес склада, график и предполагаемую дату начала.",
      },
      {
        title: "Документы и доступ",
        text: "Согласуем документы, инструктажи и правила доступа до выхода.",
      },
    ],
    howItWorks: [
      "Уточняем задачу. Согласуем профессии, количество работников, операции и график.",
      "Подбираем кандидатов. Учитываем согласованные требования к опыту и документам.",
      "Готовим выход. Уточняем доступ, инструктажи и дату первых смен.",
      "Сопровождаем работу. Решаем вопросы по выходам и заменам в рамках согласованной услуги.",
    ],
    includes: [
      { name: "Поиск и отбор под требования", included: true },
      { name: "Проверка необходимых документов", included: true },
      { name: "Подготовка согласованного выхода", included: true },
      { name: "Связь с менеджером по работникам и заменам", included: true },
    ],
    comparison: [],
    casesLead: SERVICE_CASES_LEAD,
    finalCta: SERVICE_FINAL_CTA,
    faq: [
      {
        q: "Каких работников подбираете?",
        a: "Грузчиков, комплектовщиков, упаковщиков, кладовщиков, водителей погрузчиков и других работников из списка профессий на сайте. Доступность уточним под вашу задачу.",
      },
      {
        q: "Это подбор в штат?",
        a: "Эта страница описывает подбор команды в рамках аутсорсинга и организацию её выхода на склад.",
      },
      {
        q: "Когда работники смогут начать?",
        a: "После обсуждения задачи проверим доступность команды и согласуем дату первых смен.",
      },
      {
        q: "Как учитываете опыт?",
        a: "Уточняем операции и требования склада до подбора. Необходимые навыки и документы согласуем для конкретной профессии.",
      },
      {
        q: "Что делать при невыходе?",
        a: "Связаться с закреплённым менеджером. Порядок замены определяем до начала работы.",
      },
      { q: SERVICE_COST_FAQ.q, a: SERVICE_COST_FAQ.a },
    ],
  },
  en: {
    h1: "End-to-end recruiting for line roles",
    subtitle:
      "From profile to first shift: funnel, screening, checks and handover into shift outsourcing or an agreed hiring model.",
    intro: [
      "Warehouse recruiting differs from a classic agency: time-to-shift, line profile literacy and willingness to hand people over with briefings and KPIs matter.",
      "We design funnels for loaders, pickers, forklift operators and adjacent roles, then either shift outsourcing or a customer-agreed model.",
      "Handover: first-shift checklist, named mentor and a minimum AQL/error bar; otherwise 'HR got the candidates' is lost WMS time, not a closed vacancy.",
      "Fees and guarantees are fixed in the proposal; this page is an overview without individual promises.",
    ],
    segments: [
      { title: "Warehouse roles", text: "Loaders, pickers, forklift operators, warehouse clerks." },
      { title: "Manufacturing", text: "Assembly, packing and line support tasks." },
      { title: "Seasonal campaigns", text: "Volume hiring for peaks without losing screening quality." },
      { title: "Churn backfill", text: "Fast closure of gaps with a clear funnel guarantees." },
    ],
    howItWorks: [
      "Profile, funnel and candidate sources.",
      "Screening, checks and briefings.",
      "Site access and first shifts with mentors.",
      "Handover to shift outsourcing or the customer loop.",
    ],
    includes: [
      { name: "Sourcing and first contact", included: true },
      { name: "Basic skills assessment", included: true },
      { name: "First-shift accompaniment", included: true },
      { name: "Executive search for leadership", included: false },
    ],
    comparison: [
      {
        label: "Time to fill",
        us: "Packaged to profile",
        staff: "Depends on HR",
        agency: "Fast without ops handover",
      },
      { label: "Quality control", us: "Single vendor standard", staff: "Internal", agency: "Variable" },
      {
        label: "Cost",
        us: "Transparent package in proposal",
        staff: "Payroll + risk",
        agency: "Fee + delivery risk",
      },
    ],
    faq: [
      {
        q: "How is this different from a classic agency?",
        a: "We focus on line roles and operational handover, not CVs alone.",
      },
      {
        q: "Can it combine with shift outsourcing?",
        a: "Yes — typical path: recruit → shift delivery → reporting.",
      },
      {
        q: "Do you guarantee N hires per week?",
        a: "Numbers belong in the proposal and depend on market availability for the profile.",
      },
      {
        q: "Is hiring limited to Moscow and the region?",
        a: "Yes — search and on-site deployment are focused on Moscow and the Moscow Oblast so the pool, travel time and commercial model stay aligned.",
      },
      {
        q: "Which checks do you run?",
        a: "Baseline pack is agreed in the proposal; extended checks on request.",
      },
      {
        q: "How to start?",
        a: "Send a request with profile and volume — we reply with funnel and timelines.",
      },
    ],
  },
};

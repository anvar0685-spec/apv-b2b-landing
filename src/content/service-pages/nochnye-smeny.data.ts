import type { ServicePageBilingual } from "./types";
import { SERVICE_CASES_LEAD, SERVICE_COST_FAQ, SERVICE_FINAL_CTA } from "./shared-service-copy";

export const nochnyeSmenyPage: ServicePageBilingual = {
  slug: "nochnye-smeny",
  ru: {
    h1: "Персонал для ночных смен на складе",
    metaTitle: "Персонал для ночных смен на складе | АПВ — СИСТЕМА",
    subtitle:
      "Подбираем работников для ночной разгрузки, комплектации и подготовки отгрузки. До начала работы согласуем график, транспорт, ответственного по смене и порядок замены при невыходе. Стоимость рассчитываем по задачам и условиям вашего объекта.",
    overviewTitle: "Как организуем ночную работу",
    segmentsTitle: "Какие задачи выполняет команда",
    intro: [
      "Уточняем ночные операции, время смен и состав команды. До выхода согласуем доступ на склад, инструктажи, связь по смене и порядок замены. Транспорт и другие дополнительные условия обсудим, если они нужны для вашего объекта.",
    ],
    segments: [
      {
        title: "Разгрузка и перемещение",
        text: "Работники для согласованных операций с товаром.",
      },
      {
        title: "Сборка и упаковка заказов",
        text: "Комплектовщики и упаковщики под задачи участка.",
      },
      {
        title: "Подготовка отгрузки",
        text: "Команда для согласованного объёма работ перед выдачей товара.",
      },
      {
        title: "Уборка зон",
        text: "Работники для уборки согласованных участков в ночном графике.",
      },
    ],
    howItWorks: [
      "Уточняем ночной график и задачи.",
      "Согласуем стоимость, документы и связь.",
      "Готовим команду к выходу.",
      "Сопровождаем смены и учёт часов по договорённостям.",
    ],
    includes: [
      { name: "Подбор работников", included: true },
      { name: "Подготовка выхода", included: true },
      { name: "Согласованные условия замены", included: true },
      { name: "Учёт смен", included: true },
      { name: "Контакт по объекту в согласованном режиме", included: true },
    ],
    comparison: [],
    casesLead: SERVICE_CASES_LEAD,
    finalCta: SERVICE_FINAL_CTA,
    faq: [
      {
        q: "Можно заказать только ночные смены?",
        a: "Обсудим отдельный ночной график и состав команды под ваши задачи.",
      },
      {
        q: "Как рассчитывается стоимость?",
        a: "Учитываем профессии, количество работников, график и условия объекта. Предварительный ориентир есть в калькуляторе; итог согласуем в расчёте.",
      },
      {
        q: "Как решаются вопросы ночью?",
        a: "Контакт и режим сопровождения определяем для объекта до начала работы.",
      },
      {
        q: "Что делать при невыходе?",
        a: "Обратиться по согласованному контакту. Порядок замены и условия резерва определяем заранее.",
      },
      {
        q: "Нужен ли транспорт?",
        a: "Это зависит от расположения склада и времени смен. Если транспорт требуется по условиям, обсудим его отдельно.",
      },
      {
        q: "Можно совместить дневные и ночные смены?",
        a: "Обсудим общий график, состав команды и условия для каждой смены.",
      },
      { q: SERVICE_COST_FAQ.q, a: SERVICE_COST_FAQ.a },
    ],
  },
  en: {
    h1: "Night shifts for warehouses — governed delivery",
    subtitle:
      "Briefings, first-shift mentoring, replacement discipline and attendance KPI reporting — because night windows cannot run on autopilot.",
    intro: [
      "Night windows raise incident risk and attendance drift: short reaction loops, clear escalations and an agreed reserve matter — without blurring accountability.",
      "We design nights as a separate shift rules: roster, training, week-one checkpoints and reporting for the daytime ops lead.",
      "Night coefficients and pricing sit in the commercial proposal; this page is an overview without bespoke promises.",
    ],
    segments: [
      { title: "Night inbound", text: "Unloading and receiving with limited daytime oversight." },
      { title: "Picking", text: "Line speed with lower-light ergonomics and error monitoring." },
      { title: "Morning-ready outbound", text: "Prepare batches for daytime gate slots without idle doors." },
      { title: "Support roles", text: "Zone cleaning, internal logistics and night back-office tasks." },
    ],
    howItWorks: [
      "Night risk map and shift profile.",
      "Briefing playbook, mentoring and reserves.",
      "Pilot in a bounded zone with night metrics.",
      "Stabilise and run weekly reviews with the customer.",
    ],
    includes: [
      { name: "Night operations contact", included: true },
      { name: "Replacement reserve", included: true },
      { name: "Extended night-shift reporting", included: true },
      { name: "On-site 24/7 medical room", included: false },
    ],
    comparison: [
      {
        label: "Risk control",
        us: "Dedicated night shift rules",
        staff: "Depends on discipline",
        agency: "Low",
      },
      {
        label: "Cost",
        us: "Night coefficient in proposal",
        staff: "Payroll + premiums",
        agency: "Fee + premiums",
      },
      { label: "Replacements", us: "Vendor reserve", staff: "Internal pool", agency: "Ad hoc" },
    ],
    faq: [
      {
        q: "How is night different from day supply?",
        a: "Separate playbooks, metrics and reserves; coefficients in the proposal.",
      },
      { q: "How is safety handled?", a: "Briefings and checkpoints align with the customer and site rules." },
      {
        q: "Can it combine with a day contract?",
        a: "Yes — one agreement with separate guarantees per window.",
      },
      { q: "How to start?", a: "Send a request describing the night loop — we reply with a pilot plan." },
      {
        q: "Why does the calculator show a night coefficient but the proposal number differs?",
        a: "The public benchmark smooths local risk; the proposal bakes in peak, yard mix and the contract pack, including H&S add-ons.",
      },
      {
        q: "Who runs night-to-night if one cluster is unstable?",
        a: "We name a single dispatch owner and a crew+reserve script, not 24/7 firefighting in chat; details in contract annexes.",
      },
    ],
  },
};

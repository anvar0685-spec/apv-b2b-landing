import type { ServicePageBilingual } from "./types";
import { SERVICE_CASES_LEAD, SERVICE_COST_FAQ, SERVICE_FINAL_CTA } from "./shared-service-copy";

export const postoyannyyPersonalPage: ServicePageBilingual = {
  slug: "postoyannyy-personal",
  ru: {
    h1: "Постоянная бригада для вашего склада",
    metaTitle: "Постоянная бригада для склада | АПВ — СИСТЕМА",
    subtitle:
      "Организуем работу команды по согласованному графику. Работники знакомятся с задачами и порядком работы на объекте, менеджер сопровождает выходы и замены. Если объём меняется по сезону, заранее обсуждаем усиление команды.",
    overviewTitle: "Команда для регулярной работы",
    segmentsTitle: "Когда подходит",
    intro: [
      "Согласуем состав работников и регулярный график. До выхода уточняем задачи участков, документы и порядок замены. Менеджер сопровождает смены и вопросы по работе команды. Если объём меняется, заранее обсуждаем численность и условия дальнейшей работы.",
    ],
    segments: [
      {
        title: "Регулярные смены",
        text: "Работники нужны по согласованному графику.",
      },
      {
        title: "Повторяющиеся операции",
        text: "Важно знакомство команды с задачами и порядком работы склада.",
      },
      {
        title: "Планирование бюджета",
        text: "Нужен расчёт по профессиям, численности и графику.",
      },
      {
        title: "Изменение нагрузки",
        text: "Состав команды требуется согласованно усиливать или сокращать.",
      },
    ],
    howItWorks: [
      "Уточняем задачи и график.",
      "Согласуем состав, стоимость и порядок замены.",
      "Организуем выход.",
      "Сопровождаем смены и учёт часов.",
    ],
    includes: [
      { name: "Подбор под задачи", included: true },
      { name: "Подготовка выхода", included: true },
      { name: "Согласованный порядок замены", included: true },
      { name: "Табели и отчёт о работе", included: true },
      { name: "Закреплённый менеджер", included: true },
    ],
    comparison: [],
    casesLead: SERVICE_CASES_LEAD,
    finalCta: SERVICE_FINAL_CTA,
    faq: [
      {
        q: "Будут ли работать одни и те же люди?",
        a: "Согласуем состав команды и условия замены. Потребность в новых работниках обсуждаем с учётом задач и графика.",
      },
      {
        q: "Можно увеличить команду в сезон?",
        a: "Обсудим дополнительную численность, доступность работников и стоимость до изменения графика.",
      },
      {
        q: "Можно начать с части склада?",
        a: "Да, если такой объём и порядок работы согласованы до выхода.",
      },
      {
        q: "Как подтверждаются часы?",
        a: "Формат табелей и порядок подтверждения согласуем до начала смен.",
      },
      {
        q: "Как заменить работника?",
        a: "Обратитесь к менеджеру. Действуем по согласованному порядку замены.",
      },
      {
        q: "Как изменить или завершить сотрудничество?",
        a: "Порядок изменения объёма и прекращения работы определяется договором.",
      },
      { q: SERVICE_COST_FAQ.q, a: SERVICE_COST_FAQ.a },
    ],
  },
  en: {
    h1: "Permanent warehouse staffing for long-term contracts",
    subtitle:
      "Stable shift crews, predictable attendance and one operations contact — when volume and cadence let you leave firefighting mode.",
    intro: [
      "Permanent staffing fits DCs with steady shift profiles: known peak windows, agreed reserves and training routines without weekly roster rebuilds.",
      "We align KPIs for attendance, replacement time and reporting; pricing and penalty mechanics belong in the proposal and contract, not marketing copy.",
      "Long horizons work when cost per shift, attendance and OEE/throughput reconcile in a weekly review grounded in WMS facts — not a 'how did the shift feel' standup.",
      "We do not supply outstaffing: we operate as a shift contractor accountable for line outcomes.",
    ],
    segments: [
      { title: "Even cadence", text: "Fewer headcount swings — easier training and quality control." },
      { title: "Site context", text: "Teams accumulate zone/SKU/risk context — faster deviation response." },
      {
        title: "Finance predictability",
        text: "Shift packages land cleaner in a P&L than recurring agency spikes.",
      },
      { title: "Scaling", text: "Add zones/shifts via an agreed roadmap without losing standards." },
    ],
    howItWorks: [
      "Shift profile and attendance risk diagnostic.",
      "Roster, reserve and KPI design.",
      "Pilot in a bounded zone.",
      "Stabilise and optimise on metrics.",
    ],
    includes: [
      { name: "Ops contact and shift reporting", included: true },
      { name: "Replacement reserve", included: true },
      { name: "Briefings and baseline training", included: true },
      { name: "Full executive search", included: false },
    ],
    comparison: [
      { label: "Predictability", us: "High at stable volumes", staff: "Depends on HR", agency: "Medium" },
      { label: "Scale-up speed", us: "Roadmap-driven", staff: "Slower", agency: "Faster without ops" },
      { label: "Accountability", us: "Vendor on shifts", staff: "Customer", agency: "Mixed" },
    ],
    faq: [
      {
        q: "How is this different from surge staffing?",
        a: "It targets stable crews and quarterly KPIs, not one-off injections.",
      },
      { q: "Can we exit the contract?", a: "Termination and transition terms live in the agreement." },
      { q: "Is a pilot required?", a: "Recommended to calibrate metrics and procedures." },
      { q: "How to start?", a: "Use the lead form or calculator — then a call with the ops manager." },
      {
        q: "Does 'permanent' mean everyone is outside the customer's headcount?",
        a: "No: it is contractual shift supply with a stable plan and a single point of contact; the legal shape is in the contract, not in a line on a landing page.",
      },
      {
        q: "How are peak waves and indexation handled?",
        a: "Scenarios, coefficients and escalation gates sit in the proposal/annexes; the public page does not lock individual numbers.",
      },
    ],
  },
};

/**
 * Галерея благодарственных писем на главной.
 * Сейчас — демо-макеты в `public/thank-you-letters/demo-*.svg`; замените на сканы и подписи.
 */
export type ThankYouLetterItem = {
  id: string;
  imageSrc: string;
  alt: string;
  caption: string;
};

export const THANK_YOU_LETTERS: ThankYouLetterItem[] = [
  {
    id: "demo-1",
    imageSrc: "/thank-you-letters/demo-01.svg",
    alt: "Демо: благодарственное письмо с реквизитами (макет для замены)",
    caption: "ООО «Демо Логистика» — за вывод бригады на пик отгрузки и отчётность по сменам.",
  },
  {
    id: "demo-2",
    imageSrc: "/thank-you-letters/demo-02.svg",
    alt: "Демо: служебная благодарность от торгового оператора (макет)",
    caption: "АО «Торговый Хаб МО» — за соблюдение SLA по явке и документам на объекте.",
  },
  {
    id: "demo-3",
    imageSrc: "/thank-you-letters/demo-03.svg",
    alt: "Демо: благодарность партнёру по складскому контракту (макет)",
    caption: "ООО «Региональный РЦ» — за стабильную работу линии комплектации в сезон.",
  },
  {
    id: "demo-4",
    imageSrc: "/thank-you-letters/demo-04.svg",
    alt: "Демо: рекомендательное письмо (макет)",
    caption: "ИП (демо) · Московская область — рекомендуем как подрядчика по персоналу склада.",
  },
];

/**
 * Галерея благодарственных писем на главной.
 * Замените файлы в `public/thank-you-letters/` и обновите записи ниже.
 */
export type ThankYouLetterItem = {
  id: string;
  imageSrc: string;
  alt: string;
  caption: string;
};

export const THANK_YOU_LETTERS: ThankYouLetterItem[] = [
  {
    id: "1",
    imageSrc: "/thank-you-letters/slot-01.svg",
    alt: "Место под скан благодарственного письма (карточка 1)",
    caption: "Слот 1 — после загрузки скана замените путь и подпись.",
  },
  {
    id: "2",
    imageSrc: "/thank-you-letters/slot-02.svg",
    alt: "Место под скан благодарственного письма (карточка 2)",
    caption: "Слот 2 — после загрузки скана замените путь и подпись.",
  },
  {
    id: "3",
    imageSrc: "/thank-you-letters/slot-03.svg",
    alt: "Место под скан благодарственного письма (карточка 3)",
    caption: "Слот 3 — после загрузки скана замените путь и подпись.",
  },
];

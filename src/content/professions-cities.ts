/** Профессии × 30 городов МО — канон URL (lowercase, дефисы). */

export const PROFESSIONS = [
  { slug: "gruzchiki", titleRu: "Грузчики", titleGenitiveRu: "грузчиков", titleEn: "Loaders" },
  {
    slug: "komplektovschiki",
    titleRu: "Комплектовщики",
    titleGenitiveRu: "комплектовщиков",
    titleEn: "Pickers",
  },
  {
    slug: "kladovschiki",
    titleRu: "Кладовщики",
    titleGenitiveRu: "кладовщиков",
    titleEn: "Warehouse clerks",
  },
  {
    slug: "voditeli-prt",
    titleRu: "Водители ПРТ и погрузчиков",
    titleGenitiveRu: "водителей ПРТ и погрузчиков",
    titleEn: "PRT & forklift operators",
  },
  { slug: "upakovschiki", titleRu: "Упаковщики", titleGenitiveRu: "упаковщиков", titleEn: "Packers" },
  {
    slug: "razdorabochie",
    titleRu: "Разнорабочие",
    titleGenitiveRu: "разнорабочих",
    titleEn: "General labor",
  },
  {
    slug: "klinery",
    titleRu: "Уборщики склада",
    titleGenitiveRu: "уборщиков склада",
    titleEn: "Warehouse cleaners",
  },
  {
    slug: "sborschiki-upakovschiki",
    titleRu: "Сборщики-упаковщики",
    titleGenitiveRu: "сборщиков-упаковщиков",
    titleEn: "Assembler-packers",
  },
] as const;

export const CITIES = [
  { slug: "moskva", nameRu: "Москва", namePrepositionalRu: "Москве", nameEn: "Moscow" },
  { slug: "podolsk", nameRu: "Подольск", namePrepositionalRu: "Подольске", nameEn: "Podolsk" },
  { slug: "chekhov", nameRu: "Чехов", namePrepositionalRu: "Чехове", nameEn: "Chekhov" },
  { slug: "elektrostal", nameRu: "Электросталь", namePrepositionalRu: "Электростали", nameEn: "Elektrostal" },
  { slug: "domodedovo", nameRu: "Домодедово", namePrepositionalRu: "Домодедове", nameEn: "Domodedovo" },
  { slug: "vidnoe", nameRu: "Видное", namePrepositionalRu: "Видном", nameEn: "Vidnoye" },
  { slug: "balashikha", nameRu: "Балашиха", namePrepositionalRu: "Балашихе", nameEn: "Balashikha" },
  { slug: "himki", nameRu: "Химки", namePrepositionalRu: "Химках", nameEn: "Khimki" },
  { slug: "mytischi", nameRu: "Мытищи", namePrepositionalRu: "Мытищах", nameEn: "Mytishchi" },
  { slug: "lyubertsy", nameRu: "Люберцы", namePrepositionalRu: "Люберцах", nameEn: "Lyubertsy" },
  { slug: "krasnogorsk", nameRu: "Красногорск", namePrepositionalRu: "Красногорске", nameEn: "Krasnogorsk" },
  { slug: "odincovo", nameRu: "Одинцово", namePrepositionalRu: "Одинцове", nameEn: "Odintsovo" },
  { slug: "shchyolkovo", nameRu: "Щёлково", namePrepositionalRu: "Щёлкове", nameEn: "Shchyolkovo" },
  { slug: "dzerzhinsky", nameRu: "Дзержинский", namePrepositionalRu: "Дзержинском", nameEn: "Dzerzhinsky" },
  { slug: "dolgoprudny", nameRu: "Долгопрудный", namePrepositionalRu: "Долгопрудном", nameEn: "Dolgoprudny" },
  { slug: "reutov", nameRu: "Реутов", namePrepositionalRu: "Реутове", nameEn: "Reutov" },
  { slug: "koteljniki", nameRu: "Котельники", namePrepositionalRu: "Котельниках", nameEn: "Kotelniki" },
  { slug: "bronnitsy", nameRu: "Бронницы", namePrepositionalRu: "Бронницах", nameEn: "Bronnitsy" },
  {
    slug: "zheleznodorozhny",
    nameRu: "Железнодорожный",
    namePrepositionalRu: "Железнодорожном",
    nameEn: "Zheleznodorozhny",
  },
  { slug: "korolyov", nameRu: "Королёв", namePrepositionalRu: "Королёве", nameEn: "Korolyov" },
  { slug: "pushkino", nameRu: "Пушкино", namePrepositionalRu: "Пушкине", nameEn: "Pushkino" },
  { slug: "ivanteevka", nameRu: "Ивантеевка", namePrepositionalRu: "Ивантеевке", nameEn: "Ivanteyevka" },
  { slug: "fryazino", nameRu: "Фрязино", namePrepositionalRu: "Фрязине", nameEn: "Fryazino" },
  { slug: "noginsk", nameRu: "Ногинск", namePrepositionalRu: "Ногинске", nameEn: "Noginsk" },
  { slug: "ramenskoe", nameRu: "Раменское", namePrepositionalRu: "Раменском", nameEn: "Ramenskoye" },
  { slug: "zhukovsky", nameRu: "Жуковский", namePrepositionalRu: "Жуковском", nameEn: "Zhukovsky" },
  { slug: "klimovsk", nameRu: "Климовск", namePrepositionalRu: "Климовске", nameEn: "Klimovsk" },
  {
    slug: "naro-fominsk",
    nameRu: "Наро-Фоминск",
    namePrepositionalRu: "Наро-Фоминске",
    nameEn: "Naro-Fominsk",
  },
  {
    slug: "solnechnogorsk",
    nameRu: "Солнечногорск",
    namePrepositionalRu: "Солнечногорске",
    nameEn: "Solnechnogorsk",
  },
  { slug: "zelenograd", nameRu: "Зеленоград", namePrepositionalRu: "Зеленограде", nameEn: "Zelenograd" },
] as const;

export type ProfessionSlug = (typeof PROFESSIONS)[number]["slug"];
export type CitySlug = (typeof CITIES)[number]["slug"];

export function getProfession(slug: string) {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function getCity(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}

/** Все пары «профессия × город» для sitemap и generateStaticParams (8 × 30 = 240). */
export function getAllProgrammaticPairs(): { profession: ProfessionSlug; city: CitySlug }[] {
  return PROFESSIONS.flatMap((p) => CITIES.map((c) => ({ profession: p.slug, city: c.slug })));
}

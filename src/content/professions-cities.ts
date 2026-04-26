/** Профессии × 30 городов МО — канон URL (lowercase, дефисы). */

export const PROFESSIONS = [
  { slug: "gruzchiki", titleRu: "Грузчики", titleEn: "Loaders" },
  {
    slug: "komplektovschiki",
    titleRu: "Комплектовщики",
    titleEn: "Pickers",
  },
  { slug: "kladovschiki", titleRu: "Кладовщики", titleEn: "Warehouse clerks" },
  { slug: "voditeli-prt", titleRu: "Водители ПРТ", titleEn: "PRT drivers" },
  {
    slug: "operatory-pogruzchika",
    titleRu: "Операторы погрузчика",
    titleEn: "Forklift operators",
  },
  { slug: "upakovschiki", titleRu: "Упаковщики", titleEn: "Packers" },
  {
    slug: "razdorabochie",
    titleRu: "Разнорабочие",
    titleEn: "General labor",
  },
  { slug: "klinery", titleRu: "Уборщики (склад)", titleEn: "Warehouse cleaners" },
  {
    slug: "voditeli-kategorii-b",
    titleRu: "Водители категории B",
    titleEn: "Category B drivers",
  },
  {
    slug: "sborschiki-upakovschiki",
    titleRu: "Сборщики-упаковщики",
    titleEn: "Assembler-packers",
  },
  { slug: "promoutery", titleRu: "Промоутеры", titleEn: "Promoters" },
] as const;

export const CITIES = [
  { slug: "moskva", nameRu: "Москва", nameEn: "Moscow" },
  { slug: "podolsk", nameRu: "Подольск", nameEn: "Podolsk" },
  { slug: "chekhov", nameRu: "Чехов", nameEn: "Chekhov" },
  { slug: "elektrostal", nameRu: "Электросталь", nameEn: "Elektrostal" },
  { slug: "domodedovo", nameRu: "Домодедово", nameEn: "Domodedovo" },
  { slug: "vidnoe", nameRu: "Видное", nameEn: "Vidnoye" },
  { slug: "balashikha", nameRu: "Балашиха", nameEn: "Balashikha" },
  { slug: "himki", nameRu: "Химки", nameEn: "Khimki" },
  { slug: "mytischi", nameRu: "Мытищи", nameEn: "Mytishchi" },
  { slug: "lyubertsy", nameRu: "Люберцы", nameEn: "Lyubertsy" },
  { slug: "krasnogorsk", nameRu: "Красногорск", nameEn: "Krasnogorsk" },
  { slug: "odincovo", nameRu: "Одинцово", nameEn: "Odintsovo" },
  { slug: "shchyolkovo", nameRu: "Щёлково", nameEn: "Shchyolkovo" },
  { slug: "dzerzhinsky", nameRu: "Дзержинский", nameEn: "Dzerzhinsky" },
  { slug: "dolgoprudny", nameRu: "Долгопрудный", nameEn: "Dolgoprudny" },
  { slug: "reutov", nameRu: "Реутов", nameEn: "Reutov" },
  { slug: "koteljniki", nameRu: "Котельники", nameEn: "Kotelniki" },
  { slug: "kotlova", nameRu: "Котлова", nameEn: "Kotlova" },
  { slug: "zheleznodorozhny", nameRu: "Железнодорожный", nameEn: "Zheleznodorozhny" },
  { slug: "korolyov", nameRu: "Королёв", nameEn: "Korolyov" },
  { slug: "pushkino", nameRu: "Пушкино", nameEn: "Pushkino" },
  { slug: "ivanteevka", nameRu: "Ивантеевка", nameEn: "Ivanteyevka" },
  { slug: "fryazino", nameRu: "Фрязино", nameEn: "Fryazino" },
  { slug: "noginsk", nameRu: "Ногинск", nameEn: "Noginsk" },
  { slug: "ramenskoe", nameRu: "Раменское", nameEn: "Ramenskoye" },
  { slug: "zhukovsky", nameRu: "Жуковский", nameEn: "Zhukovsky" },
  { slug: "klimovsk", nameRu: "Климовск", nameEn: "Klimovsk" },
  { slug: "naro-fominsk", nameRu: "Наро-Фоминск", nameEn: "Naro-Fominsk" },
  { slug: "solnechnogorsk", nameRu: "Солнечногорск", nameEn: "Solnechnogorsk" },
  { slug: "zelenograd", nameRu: "Зеленоград", nameEn: "Zelenograd" },
] as const;

export type ProfessionSlug = (typeof PROFESSIONS)[number]["slug"];
export type CitySlug = (typeof CITIES)[number]["slug"];

export function getProfession(slug: string) {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function getCity(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}

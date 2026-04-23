/** 10 профессий × 30 городов — канон брифа (URL — lowercase, дефисы). */

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
  { slug: "moskva", nameRu: "Москва" },
  { slug: "podolsk", nameRu: "Подольск" },
  { slug: "chekhov", nameRu: "Чехов" },
  { slug: "elektrostal", nameRu: "Электросталь" },
  { slug: "domodedovo", nameRu: "Домодедово" },
  { slug: "vidnoe", nameRu: "Видное" },
  { slug: "balashikha", nameRu: "Балашиха" },
  { slug: "himki", nameRu: "Химки" },
  { slug: "mytischi", nameRu: "Мытищи" },
  { slug: "lyubertsy", nameRu: "Люберцы" },
  { slug: "krasnogorsk", nameRu: "Красногорск" },
  { slug: "odincovo", nameRu: "Одинцово" },
  { slug: "shchyolkovo", nameRu: "Щёлково" },
  { slug: "dzerzhinsky", nameRu: "Дзержинский" },
  { slug: "dolgoprudny", nameRu: "Долгопрудный" },
  { slug: "reutov", nameRu: "Реутов" },
  { slug: "koteljniki", nameRu: "Котельники" },
  { slug: "kotlova", nameRu: "Котлова" },
  { slug: "zheleznodorozhny", nameRu: "Железнодорожный" },
  { slug: "korolyov", nameRu: "Королёв" },
  { slug: "pushkino", nameRu: "Пушкино" },
  { slug: "ivanteevka", nameRu: "Ивантеевка" },
  { slug: "fryazino", nameRu: "Фрязино" },
  { slug: "noginsk", nameRu: "Ногинск" },
  { slug: "ramenskoe", nameRu: "Раменское" },
  { slug: "zhukovsky", nameRu: "Жуковский" },
  { slug: "klimovsk", nameRu: "Климовск" },
  { slug: "naro-fominsk", nameRu: "Наро-Фоминск" },
  { slug: "solnechnogorsk", nameRu: "Солнечногорск" },
  { slug: "zelenograd", nameRu: "Зеленоград" },
] as const;

export type ProfessionSlug = (typeof PROFESSIONS)[number]["slug"];
export type CitySlug = (typeof CITIES)[number]["slug"];

export function getProfession(slug: string) {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function getCity(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}

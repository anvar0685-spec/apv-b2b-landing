/** 10 опубликованных материалов блога (неделя 6) — RU основной текст, EN в метаданных/заголовках где указано. */

export type BlogSection = { id: string; heading: string; paragraphs: string[] };

export type BlogArticle = {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  authorRu: string;
  authorEn: string;
  sections: BlogSection[];
};

function sec(id: string, heading: string, paragraphs: string[]): BlogSection {
  return { id, heading, paragraphs };
}

export const PUBLISHED_BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "blog-migracionnaya-matrica",
    title: "Миграционный учёт: контрольная матрица перед проверкой",
    titleEn: "Migration compliance: control matrix before an inspection",
    excerpt: "Как собрать документы, сроки уведомлений и ответственность без «серых зон» для внутреннего аудита.",
    excerptEn: "How to align documents, notification deadlines and ownership without grey zones for internal audit.",
    category: "migracionnyy-uchet",
    publishedAt: new Date(2026, 3, 2).toISOString(),
    readingTime: 9,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("zony", "Зоны ответственности", [
        "Разделите владельцев процесса: HR, служба безопасности, линейные руководители и подрядчик по сменам — у каждого должен быть понятный артефакт (реестр, SLA, журнал).",
        "Матрица помогает закупке задать вопросы подрядчику до подписания: кто готовит уведомления, кто контролирует дедлайны, где хранится версия документов.",
      ]),
      sec("dokumenty", "Документы и версии", [
        "Зафиксируйте единый номер версии и место хранения: почта и личные папки ломают аудит быстрее любой проверки.",
        "Для складского контура добавьте связку с графиком смен — миграционные события часто привязаны к фактическому выходу на объект.",
      ]),
      sec("cta", "Связка с коммерцией", [
        "Если проверка выявила пробелы — используйте калькулятор и заявку, чтобы оценить стоимость закрытия контура сменами подрядчика с документальной дисциплиной.",
      ]),
    ],
  },
  {
    slug: "blog-smennost-pik",
    title: "Сменность в пике сезона: throughput без переработок",
    titleEn: "Shift planning in peak season: throughput without runaway overtime",
    excerpt: "Практический разбор планирования смен, замен и отчётности для COO при росте объёма на 30–50%.",
    excerptEn: "Practical notes on shift design, replacements and COO reporting when volume jumps 30–50%.",
    category: "optimizaciya",
    publishedAt: new Date(2026, 3, 5).toISOString(),
    readingTime: 8,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("grafik", "График и буфер", [
        "Пик ломает линейку, если буфер смен рассчитан на средний день: заложите резерв на замену и время онбординга, иначе throughput просядет раньше ФОТ.",
        "Согласуйте единицу успеха: заказы в час, паллеты в смену или cost per shift — иначе финансы и операции будут спорить о методике.",
      ]),
      sec("zameny", "Замены", [
        "Введите тайминг реакции на замену в договор с подрядчиком; измеряйте фактическое время выхода подмены отдельно от «обещаний в чате».",
      ]),
    ],
  },
  {
    slug: "blog-hr-ops-yazyk",
    title: "HR и операции: один язык цифр по явке",
    titleEn: "HR and ops: one language for attendance numbers",
    excerpt: "Сводим HR-метрики и операционные KPI в одну плоскость, чтобы финмодель и линейка не расходились.",
    excerptEn: "Bringing HR metrics and operational KPIs into one plane so finance and the line stay aligned.",
    category: "hr",
    publishedAt: new Date(2026, 3, 8).toISOString(),
    readingTime: 7,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("metriki", "Метрики", [
        "Явка, доля переработок, время закрытия вакансии и cost per shift должны сходиться в одном отчёте для директора склада и CFO.",
        "Разделите «кадровую» и «операционную» ответственность в данных, но не в презентации для совета директоров.",
      ]),
    ],
  },
  {
    slug: "blog-sla-yavka",
    title: "Договор и SLA по явке: как избежать декларативных формулировок",
    titleEn: "Contracts and attendance SLA: avoiding declarative clauses",
    excerpt: "Как читать приложения к договору, чтобы метрики были измеримыми, а не «красивыми».",
    excerptEn: "How to read annexes so metrics are measurable, not just well-worded.",
    category: "compliance",
    publishedAt: new Date(2026, 3, 10).toISOString(),
    readingTime: 10,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("kpi", "KPI", [
        "Формулировки «высокая явка» бесполезны без числа, окна измерения и источника данных (WMS, турникеты, акты смены).",
        "Штрафные и бонусные схемы должны ссылаться на те же источники, иначе спор неизбежен.",
      ]),
      sec("rol", "Роль подрядчика", [
        "В модели поставки смен ответственность подрядчика шире, чем у классического агентства — это нужно явно проговорить в закупке.",
      ]),
    ],
  },
  {
    slug: "blog-compliance-dokumenty",
    title: "Compliance на складе: документы, которые реально проверяют",
    titleEn: "Warehouse compliance: documents auditors actually ask for",
    excerpt: "Список артефактов и контрольных точек для внутреннего аудита и инспекций.",
    excerptEn: "Artefacts and checkpoints for internal audits and inspections.",
    category: "compliance",
    publishedAt: new Date(2026, 3, 12).toISOString(),
    readingTime: 8,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("paket", "Пакет", [
        "Реестр договоров, приложения к SLA, журналы инструктажей, график смен и матрица ответственности — минимальный набор, который стоит держать в одном месте.",
      ]),
    ],
  },
  {
    slug: "blog-nochnye-reglamenty",
    title: "Ночные смены: регламенты без лишней бюрократии",
    titleEn: "Night shifts: lean safety routines",
    excerpt: "Как снизить риск инцидентов и не убить скорость выхода на линию.",
    excerptEn: "Reducing incident risk without killing line start-up speed.",
    category: "optimizaciya",
    publishedAt: new Date(2026, 3, 14).toISOString(),
    readingTime: 7,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("instruktazhi", "Инструктажи", [
        "Короткий чек-лист первой смены и наставник снижают травматизм сильнее, чем десятистраничная памятка, которую никто не читает.",
      ]),
    ],
  },
  {
    slug: "blog-marketplace-dc",
    title: "Маркетплейс и DC: закрытие пиков без кадрового хаоса",
    titleEn: "Marketplaces and DCs: peaks without staffing chaos",
    excerpt: "Пул под профиль комплектации и дисциплина онбординга при росте заказов.",
    excerptEn: "Bench design and onboarding discipline when orders spike.",
    category: "optimizaciya",
    publishedAt: new Date(2026, 3, 16).toISOString(),
    readingTime: 9,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("pul", "Пул", [
        "Пик требует заранее согласованного резерва и правил ротации, иначе ошибка комплектации вырастет быстрее headcount.",
      ]),
    ],
  },
  {
    slug: "blog-proizvodstvo-tekuchka",
    title: "Производство: текучка линейки и устойчивый график",
    titleEn: "Manufacturing: line churn vs stable schedules",
    excerpt: "Подбор, обучение и удержание: что измерять еженедельно.",
    excerptEn: "Hire, train, retain: what to measure weekly.",
    category: "hr",
    publishedAt: new Date(2026, 3, 18).toISOString(),
    readingTime: 8,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("nedelya", "Ритм недели", [
        "Еженедельно — явка и причины отвалов; ежемесячно — стоимость смены и ошибка; иначе вы не увидите тренд до кризиса.",
      ]),
    ],
  },
  {
    slug: "blog-farma-migracionnyy",
    title: "Фарм-логистика: миграционный контур без сюрпризов",
    titleEn: "Pharma logistics: migration compliance without surprises",
    excerpt: "Версии документов и сроки уведомлений как часть операционной дисциплины.",
    excerptEn: "Document versions and notification deadlines as operational discipline.",
    category: "migracionnyy-uchet",
    publishedAt: new Date(2026, 3, 20).toISOString(),
    readingTime: 8,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("versii", "Версии", [
        "Фарма не прощает рассинхрон версий приказов и фактических смен — заведите ответственного за публикацию версий.",
      ]),
    ],
  },
  {
    slug: "blog-programmatika-gorodov",
    title: "Программатика городов: зачем локальные страницы",
    titleEn: "City programmatic pages: why they matter",
    excerpt: "Как локальные URL помогают закрывать поиск и закупки в регионе.",
    excerptEn: "How local URLs help capture regional search and procurement intent.",
    category: "compliance",
    publishedAt: new Date(2026, 3, 22).toISOString(),
    readingTime: 6,
    authorRu: "Редакция АПВ — СИСТЕМА",
    authorEn: "APV editorial",
    sections: [
      sec("seo", "Поиск и закупка", [
        "Локальная страница объединяет профиль, город и CTA в калькулятор — пользователь не теряет контекст между SERP и заявкой.",
        "См. также разделы Услуги и Персонал для перекрёстных ссылок.",
      ]),
    ],
  },
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return PUBLISHED_BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, category: string, limit = 2): BlogArticle[] {
  return PUBLISHED_BLOG_ARTICLES.filter((a) => a.slug !== slug && a.category === category).slice(0, limit);
}

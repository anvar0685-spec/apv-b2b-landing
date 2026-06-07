import path from "node:path";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Упаковка для VPS без Docker: `deploy/copy-standalone-assets.sh` + PM2 → `server.js`. */
  output: "standalone",
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  /** Старые slug блога → актуальные 10 материалов (мастер-док, 2026-04). */
  async redirects() {
    return [
      {
        source: "/ru/geografiya",
        destination: "/ru/personal",
        permanent: true,
      },
      {
        source: "/ru/geografiya/:path*",
        destination: "/ru/personal",
        permanent: true,
      },
      /** Кириллический алиас кейсов → канонический /keysy (без лишнего рендера страницы). */
      { source: "/kejsy", destination: "/ru/keysy", permanent: true },
      { source: "/kejsy/:slug", destination: "/ru/keysy/:slug", permanent: true },
      { source: "/:locale/kejsy", destination: "/:locale/keysy", permanent: true },
      { source: "/:locale/kejsy/:slug", destination: "/:locale/keysy/:slug", permanent: true },
      /** Раздел «Площадки» с брендами маркетплейсов снят — 301 на честный профиль e-commerce без чужих ТЗ. */
      { source: "/ploshchadki", destination: "/ru/otrasli/sklady-e-commerce", permanent: true },
      { source: "/:locale/ploshchadki", destination: "/:locale/otrasli/sklady-e-commerce", permanent: true },
      { source: "/ploshchadki/:slug", destination: "/ru/otrasli/sklady-e-commerce", permanent: true },
      { source: "/:locale/ploshchadki/:slug", destination: "/:locale/otrasli/sklady-e-commerce", permanent: true },
      {
        source: "/:locale/keysy/sklad-avtozapchastej-mytishchi",
        destination: "/:locale/keysy/sklad-avtozapchastej-mo",
        permanent: true,
      },
      {
        source: "/keysy/sklad-avtozapchastej-krekshino",
        destination: "/ru/keysy/sklad-avtozapchastej-mo",
        permanent: true,
      },
      {
        source: "/:locale/keysy/sklad-avtozapchastej-krekshino",
        destination: "/:locale/keysy/sklad-avtozapchastej-mo",
        permanent: true,
      },
      {
        source: "/keysy/marketplace-multiprofil-zhukovsky",
        destination: "/ru/keysy/marketplace-multiprofil-mo",
        permanent: true,
      },
      {
        source: "/:locale/keysy/marketplace-multiprofil-zhukovsky",
        destination: "/:locale/keysy/marketplace-multiprofil-mo",
        permanent: true,
      },
      {
        source: "/keysy/tabachnyy-sklad-krekshino",
        destination: "/ru/keysy/tabachnyy-sklad-mo",
        permanent: true,
      },
      {
        source: "/:locale/keysy/tabachnyy-sklad-krekshino",
        destination: "/:locale/keysy/tabachnyy-sklad-mo",
        permanent: true,
      },
      {
        source: "/:locale/uslugi/migracionnyy-uchet",
        destination: "/:locale/uslugi/autsorsing",
        permanent: true,
      },
      {
        source: "/:locale/uslugi/upravlyaemyy-podryad",
        destination: "/:locale/uslugi/autsorsing",
        permanent: true,
      },
      {
        source: "/uslugi/autstaffing",
        destination: "/ru/blog/autsorsing-i-autstaffing-v-chem-raznitsa",
        permanent: true,
      },
      {
        source: "/:locale/uslugi/autstaffing",
        destination: "/:locale/blog/autsorsing-i-autstaffing-v-chem-raznitsa",
        permanent: true,
      },
      {
        source: "/blog/blog-migracionnaya-matrica",
        destination: "/ru/blog/migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom",
        permanent: true,
      },
      {
        source: "/:locale/blog/blog-migracionnaya-matrica",
        destination: "/:locale/blog/migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom",
        permanent: true,
      },
      { source: "/blog/blog-smennost-pik", destination: "/ru/blog/kak-rabotaet-autsorsing-smen-na-praktike", permanent: true },
      { source: "/:locale/blog/blog-smennost-pik", destination: "/:locale/blog/kak-rabotaet-autsorsing-smen-na-praktike", permanent: true },
      { source: "/blog/blog-hr-ops-yazyk", destination: "/ru/blog/raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti", permanent: true },
      { source: "/:locale/blog/blog-hr-ops-yazyk", destination: "/:locale/blog/raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti", permanent: true },
      { source: "/blog/blog-sla-yavka", destination: "/ru/blog/kak-vybrat-podryadchika-po-personalu-sklada", permanent: true },
      { source: "/:locale/blog/blog-sla-yavka", destination: "/:locale/blog/kak-vybrat-podryadchika-po-personalu-sklada", permanent: true },
      { source: "/blog/blog-compliance-dokumenty", destination: "/ru/blog/kak-vybrat-podryadchika-po-personalu-sklada", permanent: true },
      { source: "/:locale/blog/blog-compliance-dokumenty", destination: "/:locale/blog/kak-vybrat-podryadchika-po-personalu-sklada", permanent: true },
      { source: "/blog/blog-nochnye-reglamenty", destination: "/ru/blog/plyusy-i-minusy-autsorsinga-sklad", permanent: true },
      { source: "/:locale/blog/blog-nochnye-reglamenty", destination: "/:locale/blog/plyusy-i-minusy-autsorsinga-sklad", permanent: true },
      { source: "/blog/blog-marketplace-dc", destination: "/ru/blog/chto-takoe-autsorsing-personala-na-sklade", permanent: true },
      { source: "/:locale/blog/blog-marketplace-dc", destination: "/:locale/blog/chto-takoe-autsorsing-personala-na-sklade", permanent: true },
      { source: "/blog/blog-proizvodstvo-tekuchka", destination: "/ru/blog/raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti", permanent: true },
      { source: "/:locale/blog/blog-proizvodstvo-tekuchka", destination: "/:locale/blog/raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti", permanent: true },
      { source: "/blog/blog-farma-migracionnyy", destination: "/ru/blog/migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom", permanent: true },
      { source: "/:locale/blog/blog-farma-migracionnyy", destination: "/:locale/blog/migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom", permanent: true },
      { source: "/blog/blog-programmatika-gorodov", destination: "/ru/blog/chto-takoe-autsorsing-personala-na-sklade", permanent: true },
      { source: "/:locale/blog/blog-programmatika-gorodov", destination: "/:locale/blog/chto-takoe-autsorsing-personala-na-sklade", permanent: true },
      /** Удалённые «выдуманные» кейсы → ближайший по смыслу действующий или хаб /keysy. */
      { source: "/keysy/horeca-set", destination: "/ru/keysy", permanent: true },
      { source: "/keysy/stroitelstvo-obekt", destination: "/ru/keysy/stroitelnye-materialy-sklad-obrabotka", permanent: true },
      { source: "/keysy/marketplace-sklad-moskva", destination: "/ru/keysy/marketplace-multiprofil-mo", permanent: true },
      { source: "/:locale/keysy/marketplace-sklad-moskva", destination: "/:locale/keysy/marketplace-multiprofil-mo", permanent: true },
      { source: "/keysy/proizvodstvo-mo", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/proizvodstvo-mo", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/farma-sklad-himki", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/farma-sklad-himki", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/regionalnyj-rc-pik", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/regionalnyj-rc-pik", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/sklad-rasshirenie-mo", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/sklad-rasshirenie-mo", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/ritail-raspredelenie", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/ritail-raspredelenie", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/3pl-cross-dock-mo", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/3pl-cross-dock-mo", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/kholod-konturnyy-sklad-mytischi", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/kholod-konturnyy-sklad-mytischi", destination: "/:locale/keysy", permanent: true },
      { source: "/keysy/ecom-fulfilment-ramenskoe", destination: "/keysy", permanent: true },
      { source: "/:locale/keysy/ecom-fulfilment-ramenskoe", destination: "/:locale/keysy", permanent: true },
      {
        source: "/:locale/personal/operatory-pogruzchika",
        destination: "/:locale/personal/voditeli-prt",
        permanent: true,
      },
      {
        source: "/:locale/personal/operatory-pogruzchika/:city",
        destination: "/:locale/personal/voditeli-prt/:city",
        permanent: true,
      },
      {
        source: "/:locale/personal/voditeli-kategorii-b",
        destination: "/:locale/personal/voditeli-prt",
        permanent: true,
      },
      {
        source: "/:locale/personal/voditeli-kategorii-b/:city",
        destination: "/:locale/personal/voditeli-prt/:city",
        permanent: true,
      },
      {
        source: "/:locale/personal/promoutery",
        destination: "/:locale/personal",
        permanent: true,
      },
      {
        source: "/:locale/personal/promoutery/:city",
        destination: "/:locale/personal",
        permanent: true,
      },
    ];
  },
  /** В dev отключаем filesystem cache webpack: иначе после сбоев/EMFILE часто «Cannot find module './NNNN.js'». */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    /** Явный alias: на некоторых VPS `next-intl`/webpack теряют резолв `@/*` из tsconfig. */
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);

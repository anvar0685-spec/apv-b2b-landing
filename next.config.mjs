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
      {
        source: "/:locale/keysy/sklad-avtozapchastej-mytishchi",
        destination: "/:locale/keysy/sklad-avtozapchastej-mo",
        permanent: true,
      },
      {
        source: "/keysy/sklad-avtozapchastej-krekshino",
        destination: "/keysy/sklad-avtozapchastej-mo",
        permanent: true,
      },
      {
        source: "/:locale/keysy/sklad-avtozapchastej-krekshino",
        destination: "/:locale/keysy/sklad-avtozapchastej-mo",
        permanent: true,
      },
      {
        source: "/keysy/marketplace-multiprofil-zhukovsky",
        destination: "/keysy/marketplace-multiprofil-mo",
        permanent: true,
      },
      {
        source: "/:locale/keysy/marketplace-multiprofil-zhukovsky",
        destination: "/:locale/keysy/marketplace-multiprofil-mo",
        permanent: true,
      },
      {
        source: "/keysy/tabachnyy-sklad-krekshino",
        destination: "/keysy/tabachnyy-sklad-mo",
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
        destination: "/blog/autsorsing-i-autstaffing-v-chem-raznitsa",
        permanent: true,
      },
      {
        source: "/blog/blog-migracionnaya-matrica",
        destination: "/blog/migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom",
        permanent: true,
      },
      { source: "/blog/blog-smennost-pik", destination: "/blog/kak-rabotaet-autsorsing-smen-na-praktike", permanent: true },
      { source: "/blog/blog-hr-ops-yazyk", destination: "/blog/raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti", permanent: true },
      { source: "/blog/blog-sla-yavka", destination: "/blog/kak-vybrat-podryadchika-po-personalu-sklada", permanent: true },
      { source: "/blog/blog-compliance-dokumenty", destination: "/blog/kak-vybrat-podryadchika-po-personalu-sklada", permanent: true },
      { source: "/blog/blog-nochnye-reglamenty", destination: "/blog/plyusy-i-minusy-autsorsinga-sklad", permanent: true },
      { source: "/blog/blog-marketplace-dc", destination: "/blog/chto-takoe-autsorsing-personala-na-sklade", permanent: true },
      { source: "/blog/blog-proizvodstvo-tekuchka", destination: "/blog/raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti", permanent: true },
      { source: "/blog/blog-farma-migracionnyy", destination: "/blog/migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom", permanent: true },
      { source: "/blog/blog-programmatika-gorodov", destination: "/blog/chto-takoe-autsorsing-personala-na-sklade", permanent: true },
      /** Удалённые «выдуманные» кейсы → ближайший по смыслу действующий или хаб /keysy. */
      { source: "/keysy/horeca-set", destination: "/keysy", permanent: true },
      { source: "/keysy/stroitelstvo-obekt", destination: "/keysy/stroitelnye-materialy-sklad-obrabotka", permanent: true },
      { source: "/keysy/marketplace-sklad-moskva", destination: "/keysy/marketplace-multiprofil-mo", permanent: true },
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

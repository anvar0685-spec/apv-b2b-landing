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
        destination: "/:locale/keysy/sklad-avtozapchastej-krekshino",
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
      { source: "/keysy/horeca-set", destination: "/keysy/regionalnyj-rc-pik", permanent: true },
      { source: "/keysy/stroitelstvo-obekt", destination: "/keysy/sklad-rasshirenie-mo", permanent: true },
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

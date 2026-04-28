import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  /** Старые slug блога → актуальные 10 материалов (мастер-док, 2026-04). */
  async redirects() {
    return [
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
    ];
  },
  /** В dev отключаем filesystem cache webpack: иначе после сбоев/EMFILE часто «Cannot find module './NNNN.js'». */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default withNextIntl(nextConfig);

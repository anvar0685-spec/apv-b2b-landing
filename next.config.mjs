import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);

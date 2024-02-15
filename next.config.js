module.exports = {
  i18n: {
    // When using Contentful, make sure to add the locales you want to use here
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

import config from '@antfu/eslint-config';

export default config({
  stylistic: true,
  typescript: true,
  vue: true,
  ignores: [],
  formatters: {
    css: true,
    html: true,
    markdown: 'dprint',
  },
});

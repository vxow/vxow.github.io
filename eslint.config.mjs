import config from '@antfu/eslint-config'

export default config({
  stylistic: true,
  vue: true,
  ignores: [],
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})

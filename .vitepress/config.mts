import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import imagePlugin from './markdown/imagePlugin'

const navize = 10

export default defineConfig({
  title: '幺幺零玖',
  description: 'A VitePress Site',
  themeConfig: {
    outline: {
      label: '页面导航',
    },
    posts: await getPosts(navize),
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/nav/category' },
      { text: '标签', link: '/nav/tags' },
      {
        text: '基础知识',
        items: [
          { text: '设计', link: '/frontend/design' },
          { text: '浏览器', link: '/frontend/browser' },
          { text: 'html', link: '/frontend/html' },
          { text: 'css', link: '/frontend/css' },
          { text: 'javaScript', link: '/frontend/javaScript' },
          { text: 'vue', link: '/frontend/vue' },
        ],
      },
      { text: '历史', link: '/nav/archives' },
      { text: '关于', link: '/nav/about' },
    ],
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  } as DefaultTheme.Config,
  markdown: {
    config: (md) => {
      md.use(imagePlugin as any)
    },
  },
})

import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { getPosts } from './theme/serverUtils'

const navize = 10

export default defineConfig({
  title: '幺幺灵久',
  description: 'A VitePress Site',
  lastUpdated: true,
  themeConfig: {
    outline: {
      label: '页面导航',
      level: 'deep'
    },
    posts: await getPosts(navize),
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/nav/category' },
      { text: '标签', link: '/nav/tags' },
      {
        text: '基础知识',
        items: [
          { text: 'css', link: '/frontend/css' },
          { text: 'javascript', link: '/frontend/javascript' }
        ]
      },
      { text: '历史', link: '/nav/archives' },
      { text: '关于', link: '/nav/about' }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  } as DefaultTheme.Config
})

import type { DefaultTheme } from 'vitepress'
import { globby } from 'globby'
import { defineConfig } from 'vitepress'
import { generatePaginationPages } from './data/post.data.ts'
import imagePlugin from './markdown/imagePlugin'

export default async () => {
  const posts = await globby(['posts/**.md'])
  await generatePaginationPages(posts.length, 10)
  return defineConfig({
    title: '零玖',
    description: 'A VitePress Site',
    themeConfig: {
      outline: {
        label: '导航',
        // level: [2, 3],
      },
      nav: [
        { text: '首页', link: '/' },
        {
          text: '文章',
          items: [
            { text: '历史', link: '/nav/archives' },
            { text: '分类', link: '/nav/category' },
            { text: '标签', link: '/nav/tags' },
          ],
        },
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
        {
          text: '导航',
          items: [
            { text: '工具', link: '/frontend/nav/tool' },
            { text: '镜像', link: '/frontend/nav/mirrors' },
          ],
        },
        { text: '关于', link: '/nav/about' },
      ],
      search: {
        provider: 'local',
      },
      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/vuejs/vitepress',
        },
      ],
    } as DefaultTheme.Config,
    markdown: {
      config: (md) => {
        md.use(imagePlugin as any)
      },
    },
  })
}

import { resolve } from 'node:path'
import fs from 'fs-extra'
import matter from 'gray-matter'

interface Post {
  frontMatter: {
    date: string
    title: string
    category: string
    tags: string[]
    description: string
  }
  regularPath: string
}

export async function generatePaginationPages(total: number, pageSize: number) {
  //  pagesNum
  const pagesNum = total % pageSize === 0 ? total / pageSize : Number.parseInt(`${total / pageSize}`) + 1
  const paths = resolve('./')
  if (total > 0) {
    for (let i = 1; i < pagesNum + 1; i++) {
      const page = `
---
page: true
title: ${i === 1 ? 'home' : `page_${i}`}
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { data } from './.vitepress/data/post.data'
const posts = data.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim()
      const file = `${paths}/page_${i}.md`
      await fs.writeFile(file, page)
    }
  }
  // rename page_1 to index for homepage
  await fs.move(`${paths}/page_1.md`, `${paths}/index.md`, { overwrite: true })
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON()
  return json_date.split('T')[0]
}

function _compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

export const data = [] as Post[]

export default {
  watch: ['../../posts/**/*.md'],
  async load(paths: string[]) {
    const posts = await Promise.all(
      paths.map(async (item) => {
        const content = await fs.readFile(item, 'utf-8')
        const { data } = matter(content)
        data.date = _convertDate(data.date)
        return {
          frontMatter: data,
          regularPath: `/${item.replace('.md', '.html')}`,
        }
      }),
    )
    posts.sort(_compareDate)
    return posts
  },
}

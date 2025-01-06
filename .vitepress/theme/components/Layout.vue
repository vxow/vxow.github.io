<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="!frontmatter.page" class="post-info">
        {{ frontmatter.date?.substring(0, 10) }}
        <span v-for="item in frontmatter.tags" :key="item">
          <a :href="withBase(`/nav/tags.html?tag=${item}`)">
            {{ item }}
          </a>
        </span>
      </div>
    </template>
  </Layout>
  <Copyright />
</template>

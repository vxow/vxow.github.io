<script lang="ts" setup>
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { data } from '../../data/post.data'
import { initCategory } from '../functions'

const sortData = computed(() => initCategory(data))
</script>

<template>
  <div v-for="(posts, key) in sortData" :key="key">
    <div class="category">
      {{ key }}
    </div>
    <a v-for="(article, index) in posts" :key="index" :href="withBase(article.regularPath)" class="posts">
      <div class="post-container">
        <div class="post-dot" />
        {{ article.frontMatter.title }}
      </div>
      <div class="date">{{ article.frontMatter.date.slice(5) }}</div>
    </a>
  </div>
</template>

<style scoped>
.category {
  padding: 14px 0 8px 0;
  font-size: 1.25rem;
  font-weight: 500;
  font-family: var(--date-font-family);
}
</style>

<script lang="ts" setup>
import { withBase } from 'vitepress'

defineProps({
  posts: Object,
  pageCurrent: Number,
  pagesNum: Number,
})
</script>

<template>
  <div v-for="(article, index) in posts" :key="index" class="post-list">
    <div class="post-header">
      <div class="post-title">
        <a :href="withBase(article.regularPath)"> {{ article.frontMatter.title }}</a>
      </div>
    </div>
    <p class="describe" v-html="article.frontMatter.description" />
    <div class="post-info">
      {{ article.frontMatter.date }}
      <span v-for="item in article.frontMatter.tags" :key="item">
        <a
          :href="withBase(`/nav/tags.html?tag=${item}`)"
        >
          {{ item }}
        </a>
      </span>
    </div>
  </div>

  <div class="pagination">
    <a
      v-for="i in pagesNum" :key="i" class="link" :class="{ active: pageCurrent === i }"
      :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
    >{{ i }}</a>
  </div>
</template>

<style scoped>
.post-list {
  border-bottom: 1px dashed var(--vp-c-divider-light);
  padding: 14px 0 14px 0;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0.1rem 0;
}

.describe {
  font-size: 0.9375rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: var(--vp-c-text-2);
  margin: 10px 0;
  line-height: 1.5rem;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 4px;
}

.link {
  display: inline-block;
  text-align: center;
  border: 1px var(--vp-c-divider) solid;
  color: var(--vp-c-text-2);
  font-weight: 400;
  border-radius: 2px;
  padding: 0 8px;
  transition: 0.3s all;
}

.link:hover,
.link.active {
  color: var(--vp-c-brand-1) !important;
  border: 1px solid var(--vp-c-brand-1) !important;
}

@media screen and (max-width: 768px) {
  .post-list {
    padding: 14px 0 14px 0;
  }

  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-title {
    font-size: 1.0625rem;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 17rem;
  }

  .describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin: 0.5rem 0 1rem;
  }
}
</style>

---
page: true
title: home
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { data } from './.vitepress/data/post.data'
const posts = data.slice(0,10)
</script>
<Page :posts="posts" :pageCurrent="1" :pagesNum="1" />
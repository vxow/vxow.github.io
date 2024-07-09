import { Image } from 'ant-design-vue';
import DefaultTheme from 'vitepress/theme';
import Archives from './components/Archives.vue';
import Category from './components/Category.vue';
import Comment from './components/Comment.vue';
import Layout from './components/Layout.vue';
import Page from './components/Page.vue';
import Tags from './components/Tags.vue';

import './style.scss';

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // register global component
    app.component('Tags', Tags);
    app.component('Category', Category);
    app.component('Archives', Archives);
    app.component('Page', Page);
    app.component('Comment', Comment);
    // antd component
    app.component('Image', Image);
  },
};

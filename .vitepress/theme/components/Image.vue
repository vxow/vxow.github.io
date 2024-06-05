<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Image } from 'ant-design-vue'

const attrs = useAttrs()
</script>

<template>
  <Image v-bind="attrs" />
</template>

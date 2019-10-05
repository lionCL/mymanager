<template>
  <div>
    <!-- 面包屑 -->
    <bread></bread>
  </div>
</template>

<script>
//导入面包屑组件
import bread from '@/components/breadcrumb.vue'

export default {
  name: 'users',
  components: {
    bread
  }
}
</script>

<style>
</style>
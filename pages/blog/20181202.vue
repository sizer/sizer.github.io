<template>
  <section
    class="markdown-body container"
    v-html="c20181202"
  />
</template>

<script>
import c20181202 from '../../contents/20181202.md'

export default {
  components: {},
  computed: {
    c20181202() {
      return c20181202
    }
  }
}
</script>

<style>
@import './github-markdown.css';

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: 30px;
}

.container section {
  width: 100%;
}
</style>

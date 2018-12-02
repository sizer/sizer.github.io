<template>
  <section class="container">
    <div v-html="c20181202" />
  </section>
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
.container {
  min-height: 100vh;
  display: flex;
  margin: 30px;
}
</style>

<template>
  <div class="app">
    <the-header/>
    <main>
      <nuxt/>
    </main>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style scoped>
/*
* Sticky footer rules
*/
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
</style>

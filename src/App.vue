<template>
  <div id="app">
    <MainPage/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  name: 'app',
  components: {
    MainPage
  }
}
</script>

<style>
html {
  height: 100%
}

body {
  height: 100%;;
}

#app {
  height: 100%;
}
</style>

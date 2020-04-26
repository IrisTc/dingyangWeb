<template>
  <div class="app">
    <nav-header></nav-header>
    <main>
      <router-view></router-view>
    </main> 
    <nav-footer></nav-footer>
  </div>
</template>
<style scoped>
main {
  background-color: white;
  margin: 10px 128px;
}
.app {
  font-size: 16px;
}
</style>
<script>
import NavFooter from "./components/NavFooter"
import NavHeader from "./components/NavHeader"
export default {
  name: 'App',
  components:{
        NavHeader,
        NavFooter
    }
}
</script>
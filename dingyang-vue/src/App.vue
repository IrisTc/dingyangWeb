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
.app {
  background-color: white;
  padding-top: 136px;
}
@media screen and (min-width: 992px) {
  main {
    margin: 0 36px;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  main {
    margin: 0 24px;
  }
}
@media screen and (max-width: 768px) {
  main {
    margin: 0 15px;
  }
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


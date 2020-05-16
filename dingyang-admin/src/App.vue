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
@media screen and (min-width: 1200px) {
  main {
    margin: 10px 128px;
  }
}
@media screen and (max-width: 1200px) {
  main {
    margin: 10px 64px;
  }
}
main {
  background-color: white;
}
.app {
  font-size: 16px;
}
</style>
<script>
import NavFooter from "./components/NavFooter";
import NavHeader from "./components/NavHeader";
export default {
  name: "App",
  components: {
    NavHeader,
    NavFooter
  }
};
</script>
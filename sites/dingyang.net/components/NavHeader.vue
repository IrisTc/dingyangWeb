<template>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button @click="closeList()" @touchstart="closeList()" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand logo">
            <img src="../assets/logo.svg" height="64">
            <p>丁洋</p>
          </router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li class="c"><nuxt-link to="/article/prediction/1">今日预测</nuxt-link></li>
            <li class="c"><router-link to="/article/stock/1">股市人生</router-link></li>
            <li class="c"><router-link to="/article/report/1">月度报告</router-link></li>
            <li class="c"><router-link to="/article/investment/1">投资哲学</router-link></li>
            <li class="c"><router-link to="/article/research/1">实地调研</router-link></li> 
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">关于丁洋<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="c"><router-link to="/intro">丁洋简介</router-link></li>
                <li class="c"><router-link to="/video">精彩视频</router-link></li>
                <li class="c"><router-link to="/book">实战手筋</router-link></li>
                <li class="c"><router-link to="/duty">信念使命</router-link></li> 
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
</template>
<style lang="sass" scoped>
@import '~/assets/style/header.scss';
</style>
<script>

export default {
  methods: {
      closeList(){
        var a = document.querySelector(".navbar-toggle");
          $(".close").on("click",function () {
            a.click();
        });
      }
  }
}
</script>
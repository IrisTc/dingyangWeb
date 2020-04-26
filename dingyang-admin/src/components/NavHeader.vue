<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button
          @click="closeList()"
          @touchstart="closeList()"
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link
          to="/"
          class="navbar-brand logo"
        >
          <img
            src="../assets/logo.svg"
            height="64"
          >
          <p>内容管理</p>
        </router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div
        class="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <ul class="nav navbar-nav navbar-right">
          <li class="c">
            <router-link to="/article">文章</router-link>
          </li>
          <li class="c">
            <router-link to="/video">视频</router-link>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<style lang="sass" scoped>
@import '../assets/style/header.scss';
</style>
<script>

export default {};
</script>
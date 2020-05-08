<template>
  <div class="page">
    <div class="header">
      <h1>内容管理后台</h1>
    </div>
    <div
      class="alert"
      v-show="isFailed"
    >
      <p> Invalid Login or password.</p>
    </div>
    <div class="container">
      <div class="nav">
        <a
          class="nav-link active"
          href="#login-pane"
        >Sign in</a>
      </div>
      <form class="login-form">
        <div class="group">
          <label for="user_login">Username or email</label>
          <input
            autofocus="autofocus"
            autocapitalize="off"
            autocorrect="off"
            required="required"
            title="This field is required."
            type="text"
            id="user_login"
            v-model="username"
          >
        </div>
        <div class="group">
          <label for="user_password">Password</label>
          <input
            required="required"
            title="This field is required."
            type="password"
            id="user_password"
            v-model="userpwd"
          >
        </div>
        <div class="submit-container">
          <input
            type="submit"
            class="btn"
            @click.prevent="login"
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isFailed: false,
      username: "",
      userpwd: ""
    };
  },
  methods: {
    async login() {
      if (this.username.length != 0 && this.userpwd.length != 0) {
       await axios({
          url: "/api/user/login",
          // url: "http://127.0.0.1:3004/user/login",
          method: 'post',
          data: {
            name: this.username,
            password: this.userpwd
          }
        }).then(res => {
          console.log(res);
          let result = res.data.status
          if (result != 200) {
            this.isFailed = true;
          } else {
            console.log("ok");
            this.$router.push({ path: "/article" });
          }
        });
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import '../assets/style/login.scss'
</style>
<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;background: #505458;border: none"
          v-on:click="login"
          @keyup.13.native="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import { loginForm } from "@/utils/login";

export default {
  created() {
    var _this = this;
    document.onkeydown = function() {
      let key = window.event.keyCode;
      if (key == 13) {
        _this.login();
      }
    };
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      responseResult: [],
    };
  },
  methods: {
    login() {
      loginForm(this.loginForm.username, this.loginForm.password).then(
        (res) => {
          if (res.code == "FAILURE") {
            this.$message.warning(res.message);
          } else {
            // 将数据存入缓存
            var storage = localStorage;
            storage.setItem("token", res.data.token);
            storage.setItem("user", JSON.stringify(res.data.user));
            this.$router.push("/home");
          }
        }
      );
    },
  },
};
</script>

<style scoped>
#poster {
  background: url("../assets/background.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  margin: 0px;
  padding: 0px;
}
body {
  /* margin: 0px;
    padding: 0px; */
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

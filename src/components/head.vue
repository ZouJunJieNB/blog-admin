<template>
  <el-col :span="24">
    <el-menu
      :router="true"
      default-active="1"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" route="/home">首页</el-menu-item>
      <el-menu-item index="2" route="pushArticle">发布文章</el-menu-item>
      <el-menu-item index="3" route="personal">个人资料</el-menu-item>
      <el-menu-item index="4" route="blogClassify">分类管理</el-menu-item>
      <el-menu-item index="5" route="blogLabel">标签管理</el-menu-item>
      <el-menu-item index="6" @click="exit">退出</el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
import { logout } from "@/utils/login";

export default {
  methods: {
    exit() {
      var storage = localStorage;
      logout(storage.getItem("token")).then(() => {
        storage.clear();
        this.$router.replace("/");
      });
    },
  },
};
</script>
<style scoped></style>

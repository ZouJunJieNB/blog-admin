<template>
  <el-col :span="20" :offset="2" style="margin-top:20px">
    <el-row>
      <!-- 搜索框 -->
      <el-col :span="18" :offset="6">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input
              v-model="articleData.articleTitle"
              placeholder="请输入内容"
            />
          </el-form-item>

          <el-form-item label="标签">
            <el-select
              v-model="articleData.labels"
              multiple
              placeholder="请选择标签"
            >
              <el-option
                v-for="item in labels"
                :key="item.labelId"
                :label="item.labelName"
                :value="item.labelId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="articleData.classify" placeholder="请选择分类">
              <el-option
                v-for="item in classifys"
                :key="item.classifyId"
                :label="item.classifyName"
                :value="item.classifyId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配图">
            <!-- 
                :limit="1" 只能上传一张图片
                 :http-request="uploadSectionFile" 覆盖自动上传方法,自定义axios上传
              -->
            <el-upload
              action="123"
              accept="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1"
              :http-request="uploadSectionFile"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 图片上传 -->
      <el-col :span="10" :offset="10"> </el-col>

      <el-col :span="24">
        <mavon-editor v-model="articleData.content" />
      </el-col>

      <el-col style="margin-top:20px" :span="2" :offset="18">
        <el-button type="primary" @click="onSubmit(0)">提交</el-button>
      </el-col>
      <el-col style="margin-top:20px" :span="2">
        <el-button type="primary" @click="onSubmit(1)">草稿</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import { findClassify } from "@/utils/BlogClassify";

import { findLabel } from "@/utils/BlogLabel";

import { deletePhoto, addArticle } from "@/utils/BlogArticles";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      labels: [],
      classifys: [],
      articleData: {
        articleTitlePhoto: "",
        labels: [],
        classify: "",
        content: "",
        articleTitle: "",
        draft: "",
      },
    };
  },
  methods: {
    onSubmit(draft) {
      this.articleData.draft = draft;
      addArticle(this.articleData).then((res) => {
        if (res.code == "SUCCESS") {
          this.$message.success("成功！");
          this.$router.push({ path: "blogIndex" });
        }
      });
    },
    handleRemove() {
      if (this.articleData.articleTitlePhoto != "") {
        deletePhoto(this.articleData.articleTitlePhoto);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSectionFile(val) {
      var formdata = new FormData();
      formdata.append("file", val.file);
      const token = window.localStorage.getItem("token");
      this.$axios
        .post("http://localhost:8090/blog-articles/uploadImg", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token
          },
        })
        .then((result) => {
          if (result.data.code == "401") {
            alert(JSON.stringify(result));
          }

          this.articleData.articleTitlePhoto = result.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    findLabel(1, 100).then((res) => {
      this.labels = res.data.list;
    });
    findClassify(1, 100).then((res) => {
      this.classifys = res.data.list;
    });
  },
};
</script>

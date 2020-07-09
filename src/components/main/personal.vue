<template>
  <div>
    <br /><br /><br /><br />
    <el-col :span="16" :offset="4">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <div>
            <el-form label-width="80px" size="small" label-position="right">
              <el-form-item label="用户昵称" prop="nickName">
                <el-input
                  auto-complete="off"
                  v-model="dataForm.nickName"
                ></el-input>
              </el-form-item>
              <el-form-item label="旧密码" prop="phone">
                <el-input
                  type="password"
                  auto-complete="off"
                  v-model="oldUserPassword"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="phone">
                <el-input
                  type="password"
                  auto-complete="off"
                  v-model="dataForm.userPassword"
                ></el-input>
              </el-form-item>
              <el-form-item label="头像" prop="homeUrl">
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
            <div slot="footer" class="dialog-footer">
              <el-button size="mini" @click="submit" type="primary"
                >提交</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </div>
</template>

<script>

var storage = localStorage;
const json = storage.getItem("user");
const user = JSON.parse(json);
import { deletePhoto } from "@/utils/BlogArticles";
import { updateUser } from "@/utils/BlogUser";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      oldUserPassword: "",
      dataForm: {
        nickName: "",
        userPassword: "",
        userPhoto: "",
        userId:""
      },
    };
  },
  mounted() {
    this.dataForm.nickName = user.nickName;
    this.dataForm.userPhoto = user.userPhoto;
    this.dataForm.userId = user.userId;
  },
  methods: {
    uploadSectionFile(val) {
      var formdata = new FormData();
      formdata.append("file", val.file);
      const token = window.localStorage.getItem("token");
      this.$axios
        .post("http://localhost:8090/blog-articles/uploadImg", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        })
        .then((result) => {
          this.dataForm.userPhoto = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submit() {
        updateUser(this.dataForm).then((res)=>{
            if(res.code == "SUCCESS"){
                this.$message.success("修改成功");
                location.href = "/"
                window.localStorage.removeItem("token")
            }
        })
    },
    handleRemove() {
      if (this.dataForm.userPhoto != "") {
        deletePhoto(this.dataForm.userPhoto);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

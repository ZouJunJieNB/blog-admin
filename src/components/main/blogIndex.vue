<template>
  <div>
    <el-col :span="20" :offset="2" style="margin-top:20px">
      <el-row>
        <!-- 表格 -->
        <el-col :span="24">
          <el-table :data="resultData.list" style="width: 100%">
            <el-table-column label="标题" prop="articleTitle">
            </el-table-column>
            <el-table-column label="分类" prop="classify"> </el-table-column>
            <el-table-column label="标签" prop="labels"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 分页按钮 -->
      <el-row>
        <el-col :span="24">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resultData.total"
          ></el-pagination>
        </el-col>
      </el-row>

      <!-- 修改文章内容 -->
      <el-dialog width="80%" title="文章内容" :visible.sync="dialogFormVisible">
        <mavon-editor v-model="editData.articleContent" />

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editContent">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
import {
  findPart,
  findContent,
  updateArticle,
  deleteArticle,
} from "@/utils/BlogArticles";

export default {
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 5, //页大小
      resultData: {},
      editData: {
        articleContentId: "",
        articleContent: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    editContent() {
      let data = {
        articleContentId: this.editData.articleContentId,
        articleContent: this.editData.articleContent,
      };
      updateArticle(data).then((res) => {
        if (res.code == "FAILURE") {
          this.$message.warning(res.data);
        }
        this.$message.success("成功");
        this.dialogFormVisible = false;
      });
    },
    onSubmit() {},
    handleSizeChange(val) {
      this.pagesize = val;
      this.findPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findPage();
    },

    handleEdit(index, row) {
      this.editData.articleContentId = row.articleContentId;
      findContent(row.articleContentId).then((res) => {
        this.editData.articleContent = res.data;
        this.dialogFormVisible = true;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(row.articleId,row.articleContentId).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.findPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    findPage() {
      findPart(this.currentPage, this.pagesize).then((res) => {
        this.resultData = res.data;
      });
    },
  },
  mounted() {
    this.findPage();
  },
};
</script>

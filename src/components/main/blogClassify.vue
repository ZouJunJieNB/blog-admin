<template>
  <div>
    <!-- 表格 -->
    <el-col :span="24">
      <el-table :data="resultData.list" style="width: 100%">
        <el-table-column label="ID" prop="classifyId"> </el-table-column>
        <el-table-column label="名称" prop="classifyName"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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

    <!-- 分页按钮 -->
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

    <el-col :span="4" :offset="18">
      <el-input
        round
        v-model="classifyName"
        placeholder="请输入分类"
      ></el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="addClassifyBtn">新增分类</el-button>
    </el-col>
  </div>
</template>

<script>
import {
  findClassify,
  addClassify,
  deleteClassify,
} from "@/utils/BlogClassify";

export default {
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 5, //页大小
      resultData: {},
      classifyName: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.findPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findPage();
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteClassify(row.classifyId).then(() => {
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
    addClassifyBtn() {
      addClassify(this.classifyName).then((res) => {
        if (res.code == "SUCCESS") {
          this.$message.success("插入成功");
          this.findPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    findPage() {
      findClassify(this.currentPage, this.pagesize).then((res) => {
        this.resultData = res.data;
      });
    },
  },
  mounted() {
    this.findPage();
  },
};
</script>



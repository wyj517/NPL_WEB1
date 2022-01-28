<template>
  <div class="result_main">
    <div class="result_header">
      <span style="color: skyblue;margin-bottom: 10px">任务结果名称1</span>
       <el-row>
         <el-col :sm="6">
           <span>数据集:dataset1</span>
         </el-col>
         <el-col :sm="6">
           <span>数据源:dataset1</span>
         </el-col>
         <el-col :sm="6">
           <span>数据类型:mysql</span>
         </el-col>
         <el-col :sm="6">
           <span>数据类型:mysql</span>
         </el-col>
       </el-row>
      <el-row>
        <el-col :sm="6">
          <span>schena名称:dataset1</span>
        </el-col>
        <el-col :sm="6">
          <span>业务描述:dataset1</span>
        </el-col>
        <el-col :sm="6">
          <span>创建人:mysql</span>
        </el-col>
        <el-col :sm="6">
          <span>创建时间:mysql</span>
        </el-col>
      </el-row>
    </div>
    <div>
      <span>分析结果:</span>
      <ListHeader title="关键字" :showCreate="false"/>
    </div>
  </div>
</template>

<script>
import ListHeader from "@/components/ListHeader";

export default {
  name: "index",
  components: {
    ListHeader,
  },
}
</script>

<style scoped>
.result_header{
  padding:10px;
  height: 100px;
  background: #f3f3f3;
  border: 1px solid black;
}
</style>

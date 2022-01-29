<template>
  <div class="result_main">
    <div class="result_header">
      <span style="color: #146ba6;">任务结果名称1</span>
      <div class="row-bg">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6" >
            <span>数据集:dataset1</span>
          </el-col>
          <el-col :span="6">
            <span>数据源:dataset1</span>
          </el-col>
          <el-col :span="6">
            <span>数据类型:mysql</span>
          </el-col>
          <el-col :span="6">
            <span>数据类型:mysql</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around" >
          <el-col :sm="6" >
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
    </div>
    <div class="excel">
      <span class="title_excel">分析结果:</span>
      <ListHeader title="关键字" :showCreate="false"/>
      <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"/>
    </div>
  </div>
</template>

<script>
import ListHeader from "@/components/ListHeader";
import BaseTable from "@/components/BaseTable";
import {parseTime} from "@/utils";

export default {
  name: "index",
  components: {
    ListHeader,
    BaseTable
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        {label: '任务名称', key: 'task_name', width: '150'},
        {label: '创建人', key: 'creator'},
        {
          label: '执行状态',
          render: (h, params) => <el-link>●{params.row.state}</el-link>
        },
        {
          label: '开始执行时间',
          width: '180px',
          render: (h, params) => <span>{parseTime(params.row.createDate)}</span>
        },
        {
          label: '结束执行时间',
          width: '180px',
          render: (h, params) => <span>{parseTime(params.row.finishDate)}</span>
        },
        {label: '执行时长', key: 'time'},
        {
          label: '操作',
          width: '160',
          fixed: 'right',
          render: (h, {row}) => {
            return h(
              'div',
              [
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  },
                  '统计'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  },
                  '保存'
                ),
              ]
            )
          }
        }
      ]
      return arr
    }
  },
  data(){
    return{
      loading: false,
      height: null,
      tableData: [
        {
          task_name: '任务名称1',
          creator: '张三',
          state: '执行成功',
          createDate: '1350052653',
          finishDate: '1350052653',
          time: '200'
        }
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.result_main{
  padding: 20px;
}
.result_header {
  padding: 20px;
  height: 120px;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
}
.row-bg{
  margin-top: 15px;
}
.excel{
  margin-top: 20px;
  .title_excel{
    font-weight: 600;
  }
}

</style>

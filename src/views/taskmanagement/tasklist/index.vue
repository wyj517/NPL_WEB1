<template>
  <div>
    <div class="task_header">
      <div class="left_header">
        <span>总任务数:{{taskNum}}</span>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
      </div>
      <el-divider direction="vertical" />
      <div class="right_header">
        <span>正在执行数:{{executionNum}}</span>
        <span>执行成功数:{{successNum}}</span>
        <span>执行失败:{{errorNum}}</span>
      </div>
    </div>
    <ListHeader title="任务名称"/>
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"/>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import {parseTime} from "@/utils";
import ListHeader from "@/components/ListHeader";

export default {
  name: "index",
  components: {
    BaseTable,
    ListHeader,
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
                  '执行日志'
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
                  '查询结果'
                ),
              ]
            )
          }
        }
      ]
      return arr
    }
  },
  data() {
    return {
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

      taskNum:'258',
      executionNum:'20',
      successNum:'180',
      errorNum:'18'

    }
  }
}
</script>

<style scoped lang="scss">
.task_header{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
  height: 100px;
  background: #f3f3f3;
  border: 1px solid black;
  .el-divider--vertical{
    height: 4em;
  }
  .right_header{
    span:nth-child(1){
      margin-left: 10px;
    }
    span:nth-child(2),
    span:nth-child(3){
      margin-left: 50px;
    }
  }
}
</style>

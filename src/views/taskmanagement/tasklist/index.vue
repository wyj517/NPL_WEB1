<template>
  <div class="task_main">
    <div class="task_header">
      <div class="left_header">
        <div class="left_number">
          <span class="font">总任务数 </span>
          <span style="font-size: 30px">{{ taskNum }}</span>
        </div>
        <el-progress :text-inside="true" :stroke-width="15" :percentage="70" color="#13ce66"></el-progress>
      </div>
      <el-divider direction="vertical"/>
      <div class="right_header">
        <div class="right_title">
          <div style="display: flex;align-items: center">
            <div class="icon_title" style="background: #0d85fc"></div>
            <span style="">正在执行数</span>
          </div>
          <span>{{ executionNum }}</span>
        </div>
        <div class="right_title">
          <div style="display: flex;align-items: center">
            <div class="icon_title" style="background: #13ce66"></div>
            <span>执行成功数</span>
          </div>
          <span>{{ successNum }}</span>
        </div>
        <div class="right_title">
          <div style="display: flex;align-items: center">
            <div class="icon_title" style="background: #ff4949"></div>
            <span>执行失败</span>
          </div>
          <span>{{ errorNum }}</span>
        </div>
      </div>
    </div>
    <ListHeader title="任务名称" :showCreate="false"/>
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"/>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import {parseTime} from "@/utils";
import ListHeader from "@/components/ListHeader";
import router from "@/router";

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
          render: (h, params) => {
            return h(
              'el-link',
              {
                props: {
                  underline:false,
                  type:'success'
                },
              },
              '●执行状态'
            )
          }
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
                        this.$router.push("tasklist/taskresult")
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
                        this.$router.push("tasklist/taskstate")
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

      taskNum: '258',
      executionNum: '20',
      successNum: '180',
      errorNum: '18'

    }
  }
}
</script>

<style scoped lang="scss">
.task_main {
  padding: 20px;
}

.task_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
  height: 100px;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;

  .el-divider--vertical {
    height: 4em;
  }

  .right_header {
    display: flex;

    .right_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      margin-left: 50px;
      color: #929fb2;

      .icon_title {
        width: 10px;
        height: 10px;
        position: relative;
        left: -10px;
      }
    }
  }

  .left_header {
    ::v-deep .el-progress-bar__outer {
      border-radius: 0;
      background-color: #ff4949;
    }

    ::v-deep .el-progress-bar__inner {
      border-radius: 0;
    }

    .left_number {
      .font {
        position: relative;
        top: -10px;
        color: #929fb2;
        font-size: 13px;
      }
    }

    margin-right: 70px;
  }
}
</style>

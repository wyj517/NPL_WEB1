<template>
  <div class="task_main">
    <div class="task_header">
      <div class="left_header">
        <div class="left_number">
          <span class="font">总任务数 </span>
          <span style="font-size: 30px">{{ taskNum }}</span>
        </div>
        <el-progress :text-inside="true" :stroke-width="15" :percentage="70" color="#13ce66" />
      </div>
      <el-divider direction="vertical" />
      <div class="right_header">
        <div class="right_title">
          <div style="display: flex;align-items: center">
            <div class="icon_title" style="background: #0d85fc" />
            <span style="">正在执行数</span>
          </div>
          <span>{{ executionNum }}</span>
        </div>
        <div class="right_title">
          <div style="display: flex;align-items: center">
            <div class="icon_title" style="background: #13ce66" />
            <span>执行成功数</span>
          </div>
          <span>{{ successNum }}</span>
        </div>
        <div class="right_title">
          <div style="display: flex;align-items: center">
            <div class="icon_title" style="background: #ff4949" />
            <span>执行失败</span>
          </div>
          <span>{{ errorNum }}</span>
        </div>
      </div>
    </div>
    <ListHeader title="任务名称" :show-create="false" :search="search" @handle-search="getList" />
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"  />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { formatDates } from '@/utils'
import ListHeader from '@/components/ListHeader'
import { taskList } from '@/api/task'

export default {
  name: 'Index',
  components: {
    BaseTable,
    ListHeader
  },
  data() {
    return {
      search: '',
      loading: false,
      height: null,
      tableData: [],

      taskNum: '',
      executionNum: '',
      successNum: '',
      errorNum: ''

    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: '任务名称', key: 'task_name', width: '150' },
        { label: '创建人', key: 'create_user' },
        { label: '数据集名称', key: 'datas_name'},
        {
          label: '执行状态',
          render: (h, params) => {
            return h(
              'el-link',
              {
                props: {
                  underline: false,
                  type: params.row.sts === '0' ? 'success' : params.row.sts === '1' ? 'danger' : 'primary'
                }
              },
              '●' + (params.row.sts === '0' ? '执行成功' : params.row.sts === '1' ? '执行失败' : '正在执行')
            )
          }
        },
        {
          label: '开始执行时间',
          width: '180px',
          render: (h, params) => <span>{formatDates(params.row.create_time)}</span>
        },
        {
          label: '结束执行时间',
          width: '180px',
          render: (h, params) => <span>{formatDates(params.row.update_time)}</span>
        },
        { label: '执行时长', key: 'use_time' },
        {
          label: '操作',
          width: '160',
          fixed: 'right',
          render: (h, { row }) => {
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
                        this.$router.push('taskstate')
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
                        this.$router.push({ path: 'taskresult', query: { id: row.id, dataset_id: row.dataset_id, task_type:row.task_type, task_name:row.task_name,params_json:row.params_json } })
                      }
                    }
                  },
                  '执行结果'
                )
              ]
            )
          }
        }
      ]
      return arr
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(str) {
      const params = {
        page: 1,
        page_size: 10,
        total_flg: true,
        task_name: str || "",
        dataset_id: this.$route.query.dataset_id || ''
      }
      taskList(params).then(res => {
        this.tableData = res.data
        this.taskNum = res.counts
        this.successNum = res.cntSuccess
        this.errorNum = res.cntError
        this.executionNum = res.cntRun
      })
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

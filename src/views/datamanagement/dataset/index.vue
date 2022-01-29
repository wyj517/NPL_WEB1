<template>
  <div class="set_main">
    <ListHeader title="数据源名称" @handle-create="openDialog" />
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData" />

    <Details
      ref="dialogRef"
      :info="info"
    />
    <Task
      ref="taskDialogRef"
    />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import ListHeader from '@/components/ListHeader'
import Details from './edit-page/Detail.vue'
import Task from './perform-task/task.vue'
import { parseTime } from '@/utils'

export default {
  name: 'Index',
  components: {
    BaseTable,
    ListHeader,
    Details,
    Task
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: true,
      loading: false,
      height: null,
      tableData: [
        { set_name: '热词数据', data_source: '数据源名称', describe: '热词数据npl', creator: '李四', createDate: '2022-1-2' }
      ]
    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: '数据集名称', key: 'set_name', width: '200' },
        { label: '数据源', key: 'data_source' },
        { label: '描述', key: 'describe' },
        { label: '创建者', key: 'creator', width: '120' },
        {
          label: '创建时间',
          width: '180px',
          render: (h, params) => <span>{parseTime(params.row.createDate)}</span>
        },
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
                        this.openDialog()
                      }
                    }
                  },
                  '编写'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.CopyTask(row.id)
                      }
                    }
                  },
                  '删除'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.openTask()
                      }
                    }
                  },
                  '执行'
                )
              ]
            )
          }
        }
      ]
      return arr
    }
  },
  methods: {
    openDialog() {
      this.$refs.dialogRef.opendialog()
    },
    openTask(){
      this.$refs.taskDialogRef.opendialog()
    }
  }
}
</script>

<style scoped>
.set_main{
  padding: 20px;
}
/deep/.el-form-item__label{
  font-weight: normal;
}
</style>

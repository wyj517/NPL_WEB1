<template>
  <div class="set_main">
    <ListHeader :search="search" title="数据源名称" @handle-create="openAddDialog" />
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
import { formatDates } from '@/utils'
import { setList } from '@/api/dataset'
import { sourceRemove } from '@/api/database'

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
      search: '',
      dialogVisible: true,
      loading: false,
      height: null,
      tableData: []
    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: '数据集名称', key: 'datas_name', width: '200' },
        { label: '数据源', key: 'ds_name' },
        { label: '描述', key: 'des' },
        { label: '创建者', key: 'create_user_name', width: '120' },
        {
          label: '创建时间',
          width: '180px',
          render: (h, params) => <span>{formatDates(params.row.create_time)}</span>
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
                        this.handleDelete(row.id)
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
  mounted() {
    this.getSet()
  },
  methods: {
    openDialog() {
      this.$refs.dialogRef.opendialog()
    },
    openAddDialog() {
      this.$refs.dialogRef.openAddDialog()
    },
    openTask() {
      this.$refs.taskDialogRef.opendialog()
    },
    getSet() {
      const data = {
        page: 1,
        page_size: 10,
        total_flg: false,
        query_str: ''
      }
      setList(data).then(res => {
        this.tableData = res.data.data
      })
    },
    handleDelete(id) {
      this.$confirm('确实删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ds_id: id
        }
        sourceRemove(data).then(res => {
          this.$message({
            type: 'success',
            message: `删除成功`
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.set_main {
  padding: 20px;
}

/deep/ .el-form-item__label {
  font-weight: normal;
}
</style>

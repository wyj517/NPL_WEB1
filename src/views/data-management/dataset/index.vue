<template>
  <div class="set_main">
    <ListHeader title="数据集名称" @handle-create="openAddDialog" @handle-search="getSet" buttonTitle="数据集" />
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData" />
    <el-pagination
      align="right"
      style="padding: 20px"
      :current-page.sync="page.currentPage"
      :page-sizes="[10, 20, 100, 200]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <Details
      ref="dialogRef"
      :info="info"
      @refresh="getSet"
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
import { setList, setRemove } from '@/api/dataset'

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
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 20,
        query_str: '',
        total: 0
      }
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
          width: '',
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
                        this.openDialog(row.id)
                      }
                    }
                  },
                  '编辑'
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
                        this.openTask(row.id)
                      }
                    }
                  },
                  '创建任务'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.$router.push({ path: 'task/tasklist', query: { dataset_id: row.id } })
                      }
                    }
                  },
                  '任务列表'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {

                        this.$router.push({ path: 'task/taskresult', query: { dataset_id: row.id, task_name:row.last_task_name,last_task_id:row.last_task_id} })
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
    this.getSet()
    this.height = document.body.offsetHeight - 317
  },
  methods: {
    openDialog(id) {
      this.$refs.dialogRef.opendialog(id, 1)
    },
    openAddDialog() {
      this.$refs.dialogRef.opendialog(null, 0)
    },
    openTask(id) {
      this.$refs.taskDialogRef.opendialog(id)
    },
    getSet(str) {
      const data = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        query_str: str || ''
      }
      setList(data).then(res => {
        this.tableData = res.data || []
        this.page.total = res.counts
      })
    },
    handleDelete(id) {
      this.$confirm('确实删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          datas_id: id
        }
        setRemove(data).then(res => {
          if (res.success) {
               this.$message.success("删除成功")
          }
          this.getSet()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getList(this.page)
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.set_main {
  padding: 20px;
}

.el-form-item__label {
  font-weight: normal;
}
</style>

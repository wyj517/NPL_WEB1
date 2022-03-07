<template>
  <div class="source_main">
    <ListHeader :search="search" title="数据集名称" @handle-create="addSource" />
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData" />
    <!--    <div class="block" style="margin-top:15px;">-->
    <!--      <el-pagination align='right' @size-change="" @current-change=""-->
    <!--                     :current-page="page"-->

    <!--                     :page-size="pageSize"-->

    <!--                     :total="total">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogtitle"
      width="700px"
      top="5vh"
      class="detail"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rule">
        <el-form-item label="数据库类型" label-width="150px" prop="ds_type">
          <el-select v-model="ruleForm.ds_type" placeholder="请选择数据库类型" style="width: 100%" size="small">
            <el-option
              v-for="item in TypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源名称" label-width="150px" size="small" prop="ds_name">
          <el-input v-model="ruleForm.ds_name" placeholder="请输入数据源名称" />
        </el-form-item>
        <el-form-item label="描述" label-width="150px" size="small">
          <el-input v-model="ruleForm.des" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="连接串" label-width="150px" size="small" prop="conn_str">
          <el-input v-model="ruleForm.conn_str" placeholder="请输入连接串" />
        </el-form-item>
        <el-form-item label="用户名" label-width="150px" size="small" prop="user_name">
          <el-input v-model="ruleForm.user_name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" label-width="150px" size="small" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="conn" @click="startSource(ruleForm.id)">测试连接</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import ListHeader from '@/components/ListHeader'
import { sourceList, sourceRemove, sourceTest, sourceDetail, sourceUpdate, sourceCreate } from '@/api/database'

export default {
  name: 'Index',
  components: {
    BaseTable,
    ListHeader
  },
  data() {
    return {
      // page:'',
      // pageSize:'',
      // total:'',
      search: '',
      dialogVisible: false,
      dialogtitle: '',
      loading: false,
      height: null,
      tableData: [],
      TypeOption: [
        {
          value: 'MYSQL',
          label: 'MYSQL'
        },
        {
          value: 'ORACLE',
          label: 'ORACLE'
        },
        {
          value: 'SQLServer',
          label: 'SQLServer'
        }
      ],

      ruleForm: {},

      rule: {
        ds_type: [
          { required: true, message: '请选择数据库类型', trigger: 'blur' }
        ],
        ds_name: [
          { required: true, message: '数据源名称不能为空', trigger: 'blur' }
        ],
        conn_str: [
          { required: true, message: '连接串不能为空', trigger: 'blur' }
        ],
        user_name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: '数据源名称', key: 'ds_name', width: '150' },
        { label: '描述', key: 'des' },
        { label: '数据源类型', key: 'ds_type', width: '150' },
        { label: '连接串', key: 'conn_str' },
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
                        this.openAddDialog(row.id)
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
                        this.openDialog(row.id)
                      }
                    }
                  },
                  '删除'
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
    openAddDialog(id) {
      // 编辑
      this.dialogtitle = '编辑数据源'
      this.dialogVisible = true
      const data = {
        ds_id: id
      }
      sourceDetail(data).then(res => {
        this.ruleForm = res.data.data
      })
    },
    addSource() {
      // 新增
      this.dialogtitle = '新增数据源'
      this.ruleForm = {}
      this.dialogVisible = true
    },
    handleAdd() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogtitle === '新增数据源') {
            this.ruleForm.id=''
            sourceCreate(this.ruleForm).then(res => {
              this.$message({
                type: res.data.success === true ? 'success' : 'error',
                message: res.data.success === true ? `新增成功` : `新增失败`
              })
              this.getList()
            })
          } else {
            console.log(this.ruleForm)
            sourceUpdate(this.ruleForm).then(res => {
              this.$message({
                type: res.data.success === true ? 'success' : 'error',
                message: res.data.success === true ? `编辑成功` : `编辑失败`
              })
              this.getList()
            })
          }
          this.dialogVisible = false
        }
      })
    },
    getList() {
      const data = {
        page: 1,
        page_size: 10,
        total_flg: false,
        query_str: ''
      }
      sourceList(data).then(res => {
        this.tableData = res.data.data
      })
    },
    deleteSource(id) {

    },
    openDialog(id) {
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
            type: res.data.success === true ? 'success' : 'error',
            message: res.data.success === true ? `删除成功` : `删除失败`
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    startSource(id) {
      const data = {
        ds_id: id
      }
      sourceTest(data).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: `测试连接`
        })
      })
    }
  }
}
</script>

<style scoped>
/deep/ .el-form-item__label {
  font-weight: normal;
}

.source_main {
  padding: 20px;
}

.conn {
  float: left;
  margin-left: 60px;
}
</style>

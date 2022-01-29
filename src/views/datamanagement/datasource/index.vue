<template>
  <div class="source_main">
    <ListHeader title="数据集名称" @handle-create="openAddDialog"/>
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"/>

    <el-dialog
      :visible.sync="dialogVisible"
      title="新增数据源"
      width="700px"
      top="5vh"
      class="detail"
    >
      <el-form :model="ruleForm" :rules="rule" ref="ruleForm">
        <el-form-item label="数据库类型" label-width="150px" prop="database_type">
          <el-select v-model="ruleForm.database_type" placeholder="请选择" style="width: 100%" size="small">
            <el-option
              v-for="item in TypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源名称" label-width="150px" size="small" prop="source_name">
          <el-input v-model="ruleForm.source_name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="描述" label-width="150px" size="small" prop="describe">
          <el-input v-model="ruleForm.describe" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="连接串" label-width="150px" size="small" prop="connect">
          <el-input v-model="ruleForm.connect" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户名" label-width="150px" size="small" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码" label-width="150px" size="small" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="conn">测试连接</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import ListHeader from '@/components/ListHeader'

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
        {label: '数据源名称', key: 'source_name', width: '150'},
        {label: '中文名', key: 'name'},
        {label: '数据源类型', key: 'source_type', width: '150'},
        {label: '数据源URL', key: 'source_url'},
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
                        this.openAddDialog()
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
      dialogVisible: false,
      loading: false,
      height: null,
      tableData: [
        {source_name: '热词数据', name: '数据源名称1', source_type: 'MYSQL', source_url: '192.168.0.123:8088'}
      ],
      TypeOption: [
        {
          value: 'MySQL',
          label: 'MySQL'
        },
        {
          value: 'Oracle',
          label: 'Oracle'
        },
        {
          value: 'SQLServer',
          label: 'SQLServer'
        }
      ],

      ruleForm:{
        database_type:'',
        source_name:'',
        describe:'',
        connect:'',
        username:'',
        password:''
      },

      rule:{
        database_type: [
          { required: true, message: '请选择数据库类型', trigger: 'blur' },
        ],
        source_name: [
          { required: true, message: '数据源名称不能为空', trigger: 'blur' },
        ],
        describe: [
          { required: true, message: '描述不能为空', trigger: 'blur' },
        ],
        connect: [
          { required: true, message: '连接串不能为空', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    openAddDialog() {
      this.dialogVisible = true
    },
    handleAdd() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible=false
        }
      });
    },
  }
}
</script>

<style scoped>
.source_main{
  padding: 20px;
}
.conn{
  float: left;
  margin-left: 60px;
}
</style>

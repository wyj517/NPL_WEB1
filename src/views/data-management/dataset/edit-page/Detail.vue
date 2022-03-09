<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="基本信息"
    width="700px"
    top="5vh"
    class="detail"
  >
    <main>
      <div>
        <el-form ref="ruleForm" label-position="right" label-width="100px" :model="ruleForm" :rules="rule">
          <el-form-item label="数据集名称" class="item" prop="set_name">
            <el-input v-model="ruleForm.datas_name" placeholder="请输入数据集名称" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="ruleForm.des" placeholder="请输入描述" style="width: 200px" />
          </el-form-item>
          <el-form-item label="数据源名称" prop="ds_name">
            <el-select v-model="ruleForm.ds_name" placeholder="请选择数据源名称" @change="getSchemaName">
              <el-option
                v-for="item in SourceOption"
                :key="item.id"
                :label="item.label"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="schema名称" prop="schema_name">
            <el-select v-model="ruleForm.schema_name" placeholder="请选择schema名称" @change="getTableName">
              <el-option
                v-for="item in SchemaOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="表名称" prop="table_name">
            <el-select v-model="ruleForm.table_name" placeholder="请选择表名称" filterable @change="getFiledInfo">
              <el-option
                v-for="item in tableOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="field_main">
          <div class="field_head">
            <span>字段信息</span>
            <el-divider />
          </div>
          <el-tabs type="border-card">
            <el-tab-pane label="选择模式">
              <div>
                <el-form ref="ruleForms" label-position="right" label-width="100px" :model="ruleForm" :rules="rule">
                  <el-form-item label="id" prop="doc_field">
                    <el-select v-model="ruleForm.id_field" placeholder="请选择" filterable>
                      <el-option
                        v-for="item in FirstOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="doc" prop="doc_field">
                    <el-select v-model="ruleForm.doc_field" placeholder="请选择" filterable>
                      <el-option
                        v-for="item in SecondOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="其他">
                    <el-checkbox-group v-model="ruleForm.other_field">
                      <el-checkbox v-for="(lb,i) in ruleForm.other_field " :label="lb" :key="i" />
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="代码模式">
              <div>
                <div>
                  <el-input
                    v-model="ruleForm.sql_str"
                    type="textarea"
                    placeholder="请输入内容"
                    limit="10"
                    show-word-limit
                    :autosize="{ minRows: 8.5, maxRows: 20 }"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setDetail, setField, setSchema, setTable, setDsList, setCreate, setEditor } from '@/api/dataset'

export default {
  name: 'Detail',
  components: {},
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
      dialogVisible: false,
      SourceOption: [],
      SchemaOption: [],
      tableOption: [],

      FirstOption: [],
      SecondOption: [],
      checkList: [],

      active: true,

      ruleForm: {
        datas_name: '',
        des: '',
        ds_name:'',
        source_name: '',
        schema_name: '',
        table_name: '',
        id_field: '',
        doc_field: '',
        sql_str: '',
        other_field: [
          "des",
          "ds_type"
        ]
      },
      rule: {
        datas_name: [
          { required: true, message: '请输入数据集名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        ds_name: [
          { required: true, message: '选择不能为空', trigger: 'blur' }
        ],
        schema_name: [
          { required: true, message: '选择不能为空', trigger: 'blur' }
        ],
        table_name: [
          { required: true, message: '选择不能为空', trigger: 'blur' }
        ],
        id_field: [
          { required: true, message: '请选择id', trigger: 'blur' }
        ],
        doc_field: [
          { required: true, message: '请选择doc', trigger: 'blur' }
        ]
      },
      type: 0,
      datas_id: ''
    }
  },
  computed: {},
  mounted() {
    this.getDsName()
  },
  methods: {
    opendialog(id) {
      this.type = 1
      this.dialogVisible = true
      const data = {
        datas_id: id
      }
      setDetail(data).then(res => {
        console.log(res.data.data)
        this.ruleForm.datas_name = res.data.data.datas_name
        this.ruleForm.des = res.data.data.des
        this.ruleForm.other_field=res.data.data.other_field
      })
      this.datas_id = id
    },
    openAddDialog(res) {
      this.type = 0
      this.ruleForm = {}
      this.dialogVisible = true
    },
    handleAdd() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$refs['ruleForms'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([p1, p2]).then(() => {
        this.dialogVisible = false
        if (this.type === 0) {
          const data = {
            datas_name: this.ruleForm.datas_name,
            des: this.ruleForm.des,
            ds_id: this.ruleForm.ds_name.id,
            ds_name: this.ruleForm.ds_name.value,
            schema_name: this.ruleForm.schema_name,
            table_name: this.ruleForm.table_name,
            id_field: this.ruleForm.id_field,
            doc_field: this.ruleForm.doc_field,
            other_field: this.ruleForm.other_field,
            sql_str: this.ruleForm.sql_str,
            create_user_id: 1,
            create_user_name: this.$store.getters.name
          }
          setCreate(data).then(res => {
            this.$message({
              type: res.data.success === true ? 'success' : 'error',
              message: res.data.msg
            })
            this.$emit('refresh')
          })
        } else {
          const data = {
            datas_name: this.ruleForm.datas_name,
            des: this.ruleForm.des,
            ds_id: this.ruleForm.ds_name.id,
            ds_name: this.ruleForm.ds_name.value,
            schema_name: this.ruleForm.schema_name,
            table_name: this.ruleForm.table_name,
            id_field: this.ruleForm.id_field,
            doc_field: this.ruleForm.doc_field,
            // other_field: this.ruleForm.other_field,
            other_field: [
              "des"
            ],
            sql_str: this.ruleForm.sql_str,
            create_user_id: 1,
            create_user_name: this.$store.getters.name,
            id: this.datas_id
          }
          setEditor(data).then(res => {
            this.$message({
              type: res.data.success === true ? 'success' : 'error',
              message: res.data.msg
            })
            this.$emit('refresh')
          })
        }
      })
    },
    getDsName() {
      setDsList().then(res => {
        this.SourceOption = this.getOption(res.data.data)
      })
    },
    getSchemaName(item) {
      console.log('item', item)
      const data = {
        ds_id: item.id
      }
      setSchema(data).then(res => {
        if (res.data.success) {
          for (let i = 0; i < res.data.data.schema_name.length; i++) {
            this.SchemaOption.push({ value: res.data.data.schema_name[i] })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    getTableName(item) {
      const data = {
        ds_id: this.ruleForm.ds_name.id,
        schema_name: item
      }
      setTable(data).then(res => {
        if (res.data.success) {
          for (let i = 0; i < res.data.data.table_name.length; i++) {
            this.tableOption.push({ value: res.data.data.table_name[i].table_name })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    getFiledInfo(item) {
      const data = {
        ds_id: this.ruleForm.ds_name.id,
        schema_name: this.ruleForm.schema_name,
        table_name: item
      }
      setField(data).then(res => {
        for (let i = 0; i < res.data.data.fields.length; i++) {
          this.FirstOption.push({ value: res.data.data.fields[i].comments || res.data.data.fields[i].column_name })
          this.SecondOption.push({ value: res.data.data.fields[i].comments || res.data.data.fields[i].column_name })
        }
      })
    },
    getOption(data) {
      const option = []
      for (let i = 0; i < data.length; i++) {
        option.push({ value: data[i].ds_name, label: data[i].ds_name, id: data[i].id })
      }
      return option
    }
  }
}
</script>

<style scoped lang="scss">
.field_main {
  .field_head {
    font-weight: bold;
    color: black;
  }

}
</style>

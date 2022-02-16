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
          <el-form-item label="数据源名称" prop="source_name">
            <el-select v-model="ruleForm.ds_name" placeholder="请选择数据源名称">
              <el-option
                v-for="item in SourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="schema名称" prop="schema_name">
            <el-select v-model="ruleForm.schema_name" placeholder="请选择schema名称">
              <el-option
                v-for="item in SchemaOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="表名称" prop="table_name">
            <el-select v-model="ruleForm.table_name" placeholder="请选择表名称">
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
                  <el-form-item label="id" prop="id">
                    <el-select v-model="ruleForm.id_filed" placeholder="请选择">
                      <el-option
                        v-for="item in FirstOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="doc" prop="doc">
                    <el-select v-model="ruleForm.doc_field" placeholder="请选择">
                      <el-option
                        v-for="item in SecondOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="其他">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="pid" />
                      <el-checkbox label="name" />
                      <el-checkbox label="age" />
                      <el-checkbox label="desc" />
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="代码模式">
              <div>
                <div>
                  <el-input
                    v-model="ruleForm.code"
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
import { setDetail } from '@/api/dataset'

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
      SourceOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      SchemaOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      tableOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],

      FirstOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      SecondOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      checkList: [],

      active: true,

      ruleForm: {
        set_name: '',
        describe: '',
        source_name: '',
        schema_name: '',
        table_name: '',
        id: '',
        doc: '',
        code: ''
      },
      rule: {
        set_name: [
          { required: true, message: '请输入数据集名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        source_name: [
          { required: true, message: '选择不能为空', trigger: 'blur' }
        ],
        schema_name: [
          { required: true, message: '选择不能为空', trigger: 'blur' }
        ],
        table_name: [
          { required: true, message: '选择不能为空', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请选择id', trigger: 'blur' }
        ],
        doc: [
          { required: true, message: '请选择doc', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    opendialog(res) {
      // this.props.info.value = res
      // console.log(props.info.value)
      this.dialogVisible = true
      setDetail().then(res => {
        this.ruleForm = res.data[0]
      })
    },
    openAddDialog(res) {
      // this.props.info.value = res
      // console.log(props.info.value)
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
      })
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

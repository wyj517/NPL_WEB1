<template>
  <el-drawer
    :title="this.type?'编辑':'新增'"
    v-drawerDrag
    :visible.sync="dialogVisible"
    :direction="direction"
  >
    <el-scrollbar class="page-scroll">
    <main>
      <div>
        <el-form
          ref="ruleForm"
          label-width="150px"
          :model="ruleForm"
          :rules="rule"
          label-position="top"
          class="w100"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据集名称" class="w90" prop="datas_name" >
                <el-input
                  v-model="ruleForm.datas_name"
                  placeholder="请输入数据集名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据源名称" prop="ds_id"  class="w90" >
                <el-select
                  v-model="ruleForm.ds_id"
                  placeholder="请选择数据源名称"
                  @change="getSchemaName(ruleForm.ds_id,'edit')"
                  clearable
                  class="w100"
                >
                  <el-option
                    v-for="item in sourceOption"
                    :key="item.id"
                    :label="item.ds_name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="schema名称" prop="schema_name"  class="w90" >
                <el-select
                  v-model="ruleForm.schema_name"
                  placeholder="请选择schema名称"
                  @change="getTableName"
                  clearable
                  class="w100"
                >
                  <el-option
                    v-for="(item, index) in schemaOption"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表名称" prop="table_name"  class="w90" >
                <el-select
                  v-model="ruleForm.table_name"
                  placeholder="请选择表名称"
                  filterable
                  @change="getFiledInfo"
                  clearable
                  class="w100"
                >
                  <el-option
                    v-for="(item, index) in tableOption"
                    :key="index"
                    :label="item.table_name + '\t' + item.comments"
                    :value="item.table_name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input
                  v-model="ruleForm.des"
                  placeholder="请输入描述"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="field_main">
            <div class="field_head">
              <h3>where语句</h3>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="主键" prop="doc_field" >
                    <el-select
                      v-model="ruleForm.id_field"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in fieldList"
                        :key="index"
                        :label="item.column_name + '\t' + item.comments"
                        :value="item.column_name"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="待分析列" prop="doc_field">
                    <el-select
                      v-model="ruleForm.doc_field"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in fieldList"
                        :key="index"
                        :label="item.column_name + '\t' + item.comments"
                        :value="item.column_name"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <div>
                <el-input
                  v-model="ruleForm.where_clause"
                  type="textarea"
                  placeholder="exp：where field = xxx"
                  limit="10"
                  show-word-limit
                  :autosize="{ minRows: 4, maxRows: 20 }"
                />
              </div>
            </div>
            <div>
              <el-button type="primary" class="conn" @click="testLink"
              >返回样例</el-button
              >
            </div>
          </div>
        </el-form>

        <!-- 测试返回数据 -->
        <div class="test-res-data">
          <el-table :data="testResData" border style="width: 100%">
            <el-table-column prop="id" label="主键" width="" />
            <el-table-column
              prop="doc"
              label="待分析"
              width="300"
              :show-overflow-tooltip="true"
            />
          </el-table>
        </div>
      </div>
    </main>
    <div class="demo-drawer__footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import {
  setDetail,
  setField,
  setSchema,
  setTable,
  setDsList,
  setAddEditor,
  testConn,
} from "@/api/dataset";

export default {
  name: "Detail",
  components: {},
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      sourceOption: [],
      schemaOption: [],
      tableOption: [],
      fieldList: [],
      active: true,
      testResData: [],
      ruleForm: {
        datas_name: "",
        des: "",
        ds_id: "",
        source_name: "",
        schema_name: "",
        table_name: "",
        id_field: "",
        doc_field: "",
        where_clause: "",
      },
      rule: {
        datas_name: [
          { required: true, message: "请输入数据集名称", trigger: "blur" },
        ],
        describe: [{ required: true, message: "请输入描述", trigger: "blur" }],
        ds_id: [
          { required: true, message: "选择数据源不能为空", trigger: "blur" },
        ],
        schema_name: [
          { required: true, message: "选择不能为空", trigger: "blur" },
        ],
        table_name: [
          { required: true, message: "选择不能为空", trigger: "blur" },
        ],
        id_field: [{ required: true, message: "请选择id", trigger: "blur" }],
        doc_field: [{ required: true, message: "请选择doc", trigger: "blur" }],
      },
      type: 0,
      datas_id: "",

      direction: 'rtl',
    };
  },
  computed: {},
  mounted() {
    // 返回数据库列表
    this.getDsName();
  },
  methods: {
    opendialog(id, type) {
      this.dialogVisible = true;
      this.type = type;
      if (type) {
        const data = {
          datas_id: id,
        };
        setDetail(data).then((res) => {
          this.ruleForm = res.data;
          setTimeout(() => {
            this.getSchemaName(this.ruleForm.ds_id);
          }, 500);
          setTimeout(() => {
            this.getTableName(this.ruleForm.schema_name);
          }, 1000);
        });
        this.datas_id = id;
      } else {
        this.ruleForm = {};
      }
    },
    // 编辑新增
    handleAdd() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let res = await setAddEditor(this.ruleForm, this.type);
          if (res.success) {
            this.$message.success(res.msg);
            this.dialogVisible = false;
            this.$emit("refresh");
          }
        }
      });
    },
    // 返回数据库列表
    async getDsName() {
      let res = await setDsList();
      this.sourceOption = res.data;
    },
    // 获取schemeName
    async getSchemaName(ds_id,type) {
      let res = await setSchema({ ds_id });
      this.schemaOption = res?.data?.schema_name || [];
        if (type == "edit") {
        this.ruleForm.schema_name = "";
        this.ruleForm.table_name = "";
      }
    },
    // 获取表格name
    async getTableName(schemaName) {
      const data = {
        ds_id: this.ruleForm.ds_id,
        schema_name: schemaName,
      };
      let res = await setTable(data);
      this.tableOption = res?.data?.table_name || [];
    },
    // 获取字段列表
    async getFiledInfo(talbeName) {
      const pamars = {
        ds_id: this.ruleForm.ds_id,
        schema_name: this.ruleForm.schema_name,
        table_name: talbeName,
      };
      let res = await setField(pamars);
      this.fieldList = res?.data?.fields || [];
    },

    testLink() {
      let params = {
        page: 1,
        page_size: 5,
        total_flg: true,
        ds_id: this.ruleForm.ds_id,
        where_clause: this.ruleForm.where_clause,
        id_field: this.ruleForm.id_field,
        doc_field: this.ruleForm.doc_field,
        schema_name: this.ruleForm.schema_name,
        table_name: this.ruleForm.table_name,
      };
      testConn(params).then((res) => {
        if (res.success) {
          this.testResData = res.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.field_main {
  .field_head {
    font-weight: bold;
    color: black;
  }
}

.conn {
  float: right;
  margin: 15px 0;
  background: #19BC9C;
  border-radius: 4px;
  color: #fff;
  border: 1px solid rgba(25, 188, 156, 0.6);
}
::v-deep .rtl{
  padding: 20px;
}
::v-deep .el-drawer__body {
  overflow: auto;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
.page-scroll{
  height: 100%;
  width: 100%;
}
::v-deep .demo-drawer__footer{
   float: right;
   margin: 16px 0;
  .el-button--primary{
    background: #19BC9C;
    border-radius: 4px;
    border-color: #19BC9C;
    color: #FFFFFF;
  }
  .el-button--default{
    background: rgba(25, 188, 156, 0.2);
    border-radius: 4px;
    border: 1px solid rgba(25, 188, 156, 0.6);
    color: #00C5A5;
  }
}
::v-deep .el-drawer {
  background-color: rgba(255, 255, 255, 1);
  .el-drawer__header{
    padding: 0 20px 0 0;
  }
}
</style>

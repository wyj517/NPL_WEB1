<template>
  <div class="source_main">
    <ListHeader
      title="数据源名称"
      @handle-create="addSource"
      @handle-search="getList"
      @handle-inputSearch="getList"
      buttonTitle="数据源"
    />
    <BaseTable
      v-loading="loading"
      :height="height"
      :columns="columns"
      :data="tableData"
    />
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
    <el-drawer
      :title="dialogtitle"
      :visible.sync="drawer"
      :direction="direction"
      :modal="true"
      :wrapper-closable="false"
      custom-class="demo-drawer"
      class="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rule" :inline="true" label-position="top" class="">
          <el-form-item label="数据源类型" size="small" label-width="150px" prop="data_source_type">
            <el-select
              v-model="ruleForm.data_source_type"
              placeholder="请选择数据源类型"
              size="small"
              style="width: 182px"
            >
              <el-option
                v-for="(item, index) in SourceTypeOption"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据库类型" size="small" label-width="150px" prop="ds_type" v-if="ruleForm.data_source_type!=='EXCEL'">
            <el-select
              v-model="ruleForm.ds_type"
              placeholder="请选择数据库类型"
              size="small"
              style="width: 182px"
            >
              <el-option
                v-for="(item, index) in TypeOption"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="数据源名称"
            label-width="150px"
            size="small"
            prop="ds_name"
          >
            <el-input v-model="ruleForm.ds_name" placeholder="请输入数据源名称" />
          </el-form-item>
          <el-form-item label="描述" label-width="150px" size="small">
            <el-input v-model="ruleForm.des" placeholder="请输入描述" />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.data_source_type!=='EXCEL'"
            label="连接串"
            label-width="150px"
            size="small"
            prop="conn_str"
          >
            <el-input v-model="ruleForm.conn_str" placeholder="请输入连接串" />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.data_source_type!=='EXCEL'"
            label="用户名"
            label-width="150px"
            size="small"
            prop="user_name"
          >
            <el-input v-model="ruleForm.user_name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item
            v-if="ruleForm.data_source_type!=='EXCEL'"
            label="密码"
            label-width="150px"
            size="small"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
        <span>
        <el-button type="primary" class="conn" @click="startSource(ruleForm.id)"  v-if="ruleForm.data_source_type!=='EXCEL'" >测试连接</el-button></span>
        <div style="text-align: center;margin-top: 20px" v-if="ruleForm.data_source_type==='EXCEL'">
          <el-upload
            class="upload-demo"
            drag
            :action="`${BASEURL}/ds/upload_excel_file`"
            accept=".xls,.xlsx"
            :headers="headers"
            :on-success="onSuccess"
            :on-error="onError"
            :multiple="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          </el-upload>
        </div>
        <div v-if="ruleForm.data_source_type==='EXCEL'">
          <el-link type="primary" style="position: absolute;right: 50px" @click="downloadExcel">模板下载</el-link>
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTable";
import ListHeader from "@/components/ListHeader";
import request from '@/utils/request'
import { getToken } from "@/utils/auth";
import {
  sourceList,
  sourceRemove,
  sourceTest,
  sourceDetail,
  sourceUpdate,
  sourceCreate, excelDs
} from '@/api/database'

export default {
  name: "Index",
  components: {
    BaseTable,
    ListHeader,
  },
  data() {
    return {
      excel_table:'',
      BASEURL:'',
      headers:'',
      drawer: false,
      direction: 'rtl',
      page: {
        currentPage: 1,
        pageSize: 20,
        query_str: "",
        total: 0,
      },
      // filters:[{ text: 'MYSQL', value: 'MYSQL' }, { text: 'ORACLE', value: 'ORACLE' }, { text: 'SQLServer', value: 'SQLServer' }],
      // total:'',
      search: "",
      dialogtitle: "",
      loading: false,
      height: null,
      tableData: [],
      TypeOption: ["MYSQL", "ORACLE", "SQLServer"],
      SourceTypeOption: ["DB", "EXCEL"],
      ruleForm: {
        password: "",
      },
      rule: {
        data_source_type: [
          { required: true, message: "请选择数据源类型", trigger: "blur" },
        ],
        ds_type: [
          { required: true, message: "请选择数据库类型", trigger: "blur" },
        ],
        ds_name: [
          { required: true, message: "数据源名称不能为空", trigger: "blur" },
        ],
        conn_str: [
          { required: true, message: "连接串不能为空", trigger: "blur" },
        ],
        user_name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ]
      },
    };
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: "数据源名称", key: "ds_name", width: "150" },
        { label: "描述", key: "des" },
        { label: "数据源类型", key: "data_source_type", width: "150" },
        {
          label: "数据库类型",
          key: "ds_type",
          width: "150",
          // type:'dropDown',
          // filters:this.filters
        },
        { label: "连接串", key: "conn_str" },
        {
          label: "操作",
          width: "160",
          fixed: "right",
          render: (h, { row, index }) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                  },
                  on: {
                    click: () => {
                      this.openAddDialog(row.id, index);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                  },
                  on: {
                    click: () => {
                      this.openDialog(row.id);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ];
      return arr;
    },
  },
  mounted() {
    this.getList();
    this.height = document.body.offsetHeight - 257;
    this.BASEURL=request.defaults.baseURL
    this.headers={
      Authorization:getToken()
    }
    console.log(this.headers)
  },
  methods: {
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getList(this.page);
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    openAddDialog(id, index) {
      // 编辑
      this.dialogtitle = "编辑数据源";
      this.drawer = true;
      const data = {
        ds_id: id,
      };
      this.ruleForm = Object.assign({}, this.tableData[index - 1])
    },
    addSource() {
      // 新增
      this.dialogtitle = "新增数据源";
      this.ruleForm = {};
      this.drawer = true
    },
    handleAdd() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.dialogtitle === "新增数据源") {
            this.ruleForm.id = "";
            if (this.ruleForm.data_source_type==='DB'){
              sourceCreate(this.ruleForm).then((res) => {
                if (res.success) {
                  this.$message.success("新增成功");
                }
                this.getList();
              });
            }else {
              let params={
                ds_name:this.ruleForm.ds_name,
                des:this.ruleForm.des,
                data_source_type:this.ruleForm.data_source_type,
                excel_table:this.excel_table
              }
              console.log(params)
              excelDs(params).then((res)=>{
                if (res.success) {
                  this.$message.success("新增成功");
                }
                this.getList();
              })
            }
          }else {
            sourceUpdate(this.ruleForm).then((res) => {
              if (res.success) {
                this.$message.success("编辑成功");
              }
              this.getList();
            });
          }
          this.drawer = false;
        }
      });
    },
    getList(str) {
      const params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        query_str: str || "",
      };
      sourceList(params).then((res) => {
        this.tableData = res.data || [];
        this.page.total = res.counts;
      });
    },
    deleteSource(id) {},
    openDialog(id) {
      this.$confirm("确实删除吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = {
            ds_id: id,
          };
          sourceRemove(data).then((res) => {
            if (res.success) {
              this.$message.success("删除成功");
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    startSource(id) {
      let dataObj = this.ruleForm;
      const data = {
        ds_id: dataObj.id,
        ds_type: dataObj.ds_type,
        conn_str: dataObj.conn_str,
        user_name: dataObj.user_name,
        password: dataObj.password,
      };
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      sourceTest(data).then((res) => {
        loading.close();
        if (res.success) {
          this.$message.success(res.msg);
        }
      }).catch((err=>{
        loading.close();
      }));
    },

    onSuccess(res,file,fileList) {
      // message 弹出消息
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.$message.success("导入成功！");
      this.excel_table=res.data.file_name
      console.log(this.excel_table)
    },
    onError(res) {
      // message 弹出消息
      this.$message.warning("导入失败！");
      console.log(res)
    },
    downloadExcel () {
      import('@/utils/ExportExcelUtil').then(excel => {
        const filterVal = ['id', 'doc']
        const tHeader = ['id', 'doc']
        const errList = [{id:1,doc:'text1'},{id:2,doc:'text2'}]
        const data = this.formatModelJson(filterVal, errList)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template'
        })
      })
    },
    formatModelJson (filterVal, list) {
      console.log(list)
      return list.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
  },
};
</script>

<style lang="scss" scoped>
.source_main {
  padding: 20px;
}

.conn {
  width: 85%;
  height: 32px;
  background: #19BC9C;
  border-color: #19BC9C;
  border-radius: 2px;
  margin-left: 20px;
}
.drawer{
  ::v-deep .el-form-item{
    margin-left: 20px;
  }

  ::v-deep .demo-drawer__footer{
    position: absolute;
    bottom: 20px;
    right: 16px;
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
}
::v-deep .rtl{
  padding: 0 10px;
}
</style>

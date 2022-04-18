<template>
  <div class="result_main">
    <div class="header">
      <div class="left">
        <div class="content">
          <span style="margin-right: 15px">内容</span>
          <el-input
            v-model="findContent"
            placeholder="输入内容"
            style="width: 150px"
            @change="getResult"
            size="small"
          />
        </div>
        <div>
          <span style="margin-right: 15px">类型编号</span>
          <el-select
            v-model="Typevalue"
            placeholder="请选择"
            @change="getResult"
            clearable
            size="small"
             style="width: 150px"
          >
            <el-option
              v-for="(item, index) in TypeOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="tag">
          <span style="margin-right: 15px">最终标签</span>
          <el-input
            v-model="manual_tag"
            placeholder="输入内容"
            style="width: 150px"
            @change="getResult"
            size="small"
          />
        </div>
        <div>
          <el-button type="primary" @click="getResult" size="small" class="screen" >筛选</el-button>
        </div>
      </div>
      <div class="right">
        <div>
          <el-popover
            placement="top"
            width="200"
            trigger="click">
            <el-input
              placeholder="请输入任务名称"
              v-model="searchName">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <el-scrollbar>
                <li v-for="(item, index) in TagOptions" class="list_item" @click="updateClassTag(1,'',item)">
                  <span>{{item}}</span>
                </li>
              </el-scrollbar>
            </ul>
            <el-button slot="reference" type="primary" size="small" class="tags"
            >批量标签 ˇ</el-button>
          </el-popover>
          <el-button type="success" plain @click="dialogAnalysis = true" size="small" class="rethink" style="margin-left: 12px"
            >重新分析</el-button
          >
          <el-button
            type="primary"
            plain
            size="small"
            @click="exportExcel"
            :loading="exportLoading"
            >导出</el-button
          >
            <el-button
            type="primary"
            plain
            size="small"
            @click="toAnalysis"
            >统计</el-button
          >
        </div>
      </div>
    </div>
    <div class="main" style="margin-top: 50px">
      <el-table
        ref="multipleTable"
        v-loading="isLoading"
        :data="tableData"
        tooltip-effect="dark"

        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="数据ID" width="120" />
        <el-table-column prop="doc" label="内容" />
        <el-table-column prop="class_id" label="类型编号" width="100" />
        <el-table-column prop="predict_tag" label="自动标签" width="100" />
        <el-table-column prop="manual_tag" label="最终标签" width="150">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.manual_tag"
              placeholder="请选择"
              filterable
              allow-create
              @change="updateClassTag(0, scope.row.id, scope.row.manual_tag)"
            >
              <el-option
                v-for="(item, index) in TagOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-page">
        <div class="select-all">
          <el-checkbox
            size="large"
            style="margin-right: 10px"
            v-model="is_total"
            @change="toggleSelection(tableData)"
            label="搜索结果全部选择"
          />
        </div>
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
      </div>
    </div>
    <el-dialog
      title="批量标签"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-select
        v-model="Tagvalue"
        placeholder="请选择"
        filterable
        allow-create
      >
        <el-option
          v-for="(item, index) in TagOptions"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClassTag(1)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogAnalysis"
      title="基本信息"
      width="400px"
      top="20vh"
      class="detail"
      :modal="false"
      :close-on-click-modal="false"
    >
      <main>
        <el-form label-position="right" label-width="100px">
          <el-form-item label="任务类型">
            <el-select v-model="DataValue" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="(item, index) in DataOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="任务参数" class="taskpara">
            <div>
              <span class="taskdes">({{ this.params_json[0].des }})</span>
              <el-input v-model="para.num" placeholer="请输入参数值" />
            </div>
          </el-form-item>
        </el-form>
      </main>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAnalysis = false" size="small" class="cancel">取 消</el-button>
        <el-button type="primary" @click="reAnalyze" size="small" class="rethink">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskResult, getClassID, updateLabel, manualTags } from "@/api/task";
import { createTask, getType } from "@/api/dataset";
import excel from "@/utils/excel";
let staticSel = false;
export default {
  name: "Index",
  components: {},
  data() {
    return {
      searchName:'',
      exportLoading: false,
      isLoading: true,
      dialogVisible: false,
      dialogAnalysis: false,
      multipleSelection: [],
      Typevalue: null,
      Tagvalue: null,
      findContent: "",
      TypeOptions: [],
      TagOptions: [],
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        query_str: "",
        total: 0,
      },
      selectedIDs: [],
      manual_tag: "",
      is_total: false,
      DataValue: "",
      DataOption: [],
      params_json: [
        {
          des: "",
          field: "",
          type: "",
        },
      ],
      para: {
        num: null,
      },
    };
  },
  computed: {},
  mounted() {
    this.getResult();
    this.getClass();
    this.getManual();
    this.getTaskType();
    // console.log(this.$route.query.params_json)
  },
  methods: {
    // 分析
    toAnalysis(){
      this.$router.push({name:"Analysis",query:{id:this.$route.query.dataset_id}})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let ids = [];
      this.multipleSelection.map((item) => {
        ids.push(item.id);
      });
      this.selectedIDs = ids;
    },
    addTag(val) {
      let flag = true;
      for (let i = 0; i < this.TagOptions.length; i++) {
        if (this.TagOptions[i] === val) {
          flag = false;
        }
        // console.log(this.TagOptions[i])
      }
      if (flag) {
        this.TagOptions.unshift(val);
      }
    },
    toggleSelection(rows) {
      staticSel = !staticSel;
      for (let i = 0; i < rows.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(rows[i], staticSel);
      }
      this.is_total = staticSel;
    },
    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getResult();
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getResult();
    },
    //获取参数类型
    getTaskType() {
      getType().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.DataOption.push({
            value: res.data[i].task_type,
            label: res.data[i].task_type_name,
          });
          this.params_json = res.data[i].params_json;
        }
        // console.log('json', this.params_json[0])
      });
    },

    //获取任务执行结果列表
    getResult() {
      let params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        task_id: this.$route.query.id,
        dataset_id: this.$route.query.dataset_id,
        class_id: this.Typevalue,
        manual_tag: this.manual_tag,
        doc: this.findContent,
      };
      this.isLoading = true;
      getTaskResult(params).then((res) => {
        this.tableData = res.counts ? res.data : [];
        this.isLoading = false;
        this.page.total = res.counts;
        this.is_total = false;
      });
    },

    // 导出
    async exportExcel() {
      this.exportLoading = true;
      let params = {
        page: 1,
        page_size: 999999,
        total_flg: true,
        task_id: this.$route.query.id,
        dataset_id: this.$route.query.dataset_id,
        class_id: this.Typevalue,
        manual_tag: this.manual_tag,
        doc: this.findContent,
      };
      let res = await getTaskResult(params);
      this.exportExcelFu(res.data);
    },
    // 导出参数
    exportExcelFu(tableData) {
      if (tableData) {
        const params = {
          title: ["数据ID", "内容", "类型编号", "自动标签", "最终标签"],
          key: ["id", "doc", "class_id", "predict_tag", "manual_tag"],
          data: tableData,
          autoWidth: true,
          filename: "分类列表",
        };
        console.log(params);
        excel.export_array_to_excel(params);
        this.exportLoading = false;
      } else {
        console.error("表格数据不能为空！");
        // this.$Message.success('表格数据不能为空！')
      }
    },

    //获取下拉classid列表
    getClass() {
      let params = {
        dataset_id: this.$route.query.dataset_id,
      };
      getClassID(params).then((res) => {
        for (let i = 0; i < res.data.class_ids.length; i++) {
          this.TypeOptions.push(res.data.class_ids[i]);
        }
      });
    },

    //获取最终标签列表
    getManual() {
      let params = {
        dataset_id: this.$route.query.dataset_id,
      };
      manualTags(params).then((res) => {
        this.TagOptions = res.data.manual_tags;
      });
    },

    //批量更新数据标签
    updateClassTag(flg, id, tag) {
      //flg 1批量 0单改
      if (tag || this.Tagvalue) {
        let params = {
          dataset_id: this.$route.query.dataset_id,
          label_ids: flg ? this.selectedIDs : [id],
          manual_tag: tag,
          is_total: this.is_total,
          tag: "",
          class_id: this.Typevalue,
          doc: "",
        };
        updateLabel(params).then((res) => {
          if (res.success) {
            this.$message.success(res.msg);
            this.addTag(tag);
            this.dialogVisible = false;
            this.getResult();
          }
        });
      } else {
        this.$message.error("请先选择标签");
      }
    },
    //重新分析
    reAnalyze() {
      if (this.is_total) {
        this.selectedIDs = [];
      }
      let params = {
        dataset_id: this.$route.query.dataset_id,
        task_name: this.$route.query.task_name,
        task_type: this.$route.query.task_type || this.DataValue,
        params_json: this.$route.query.params_json || this.para,
        label_ids: this.selectedIDs || [],
        class_id: this.Typevalue,
        doc: this.findContent,
        last_task_id: this.$route.query.last_task_id,
        is_total: this.is_total,
      };
      createTask(params).then((res) => {
        if (res.success) {
          this.$message.success(res.msg);
          this.dialogAnalysis = false;
          this.$router.push({
            path: "tasklist",
            query: { dataset_id: this.$route.query.dataset_id },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.result_main {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;

    .content {
      margin: 0 20px;
    }

    .tag {
      margin: 0 20px;
    }
  }
}

.bottom-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.select-all {
  margin-top: 20px;
  border: solid 1px #53a8ff;
  background: #ecf5ff;
  height: 40px;
  padding: 10px;
  border-radius: 3px;
}
.screen{
  background: #19BC9C;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 1px;
  border-color: #19BC9C;
}
.tags{
  background: rgba(25, 188, 156, 0.2);
  border: 1px solid rgba(25, 188, 156, 0.6);
  color: #00BF9B;
  ::v-deep .el-input__inner{
    background: rgba(25, 188, 156, 0.2);
    color: #00BF9B;
    width: 96px;
    height: 32px;
  }
  ::v-deep .el-input__inner::placeholder{
    color: #00BF9B !important;
  }
}
.rethink{
  background: #19BC9C;
  border-color: #19BC9C;
  color: #fff;
}
.cancel{
  background: rgba(25, 188, 156, 0.2);
  border: 1px solid rgba(25, 188, 156, 0.6);
  color: #00BF9B;
}
.taskpara{
  .taskdes{
    position: absolute;
    left: -73px;
    top: 15px;
  }
}
.list_item{
  box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  color: #333333;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  font-weight: 400;
}
.list_item:hover{
  background: #F0F5F8;
  cursor:pointer;
}
::v-deep.el-scrollbar .el-scrollbar__view{
   height: 260px;
}

</style>

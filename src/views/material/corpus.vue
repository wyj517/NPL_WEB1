<template>
  <div class="result_main">
    <div class="header">
      <div class="left">
        <div class="content">
          <span style="margin-right: 15px">关键字搜索</span>
          <el-input v-model="findContent" placeholder="输入关键字" style="width: 150px" @input="getResult" size="small" />
        </div>
        <div class="tag">
          <span style="margin-right: 15px">标签</span>
          <el-autocomplete
            class="inline-input"
            v-model="manual_tag"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="getResult"
            @input="getResult"
            style="width: 150px;height: 32px"

          ></el-autocomplete>

        </div>
        <div>
          <el-button type="primary" @click="getResult" size="small" class="screen">搜索</el-button>
        </div>
      </div>
      <div class="right">
        <div>
          <el-popover placement="top" width="200" trigger="click">
            <el-input placeholder="请输入标签" v-model="searchName" @keyup.enter.native="addTag(searchName)">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <el-scrollbar>
                <li v-for="(item, index) in TagOptions" :key="index" class="list_item"
                  @click="updateClassTag(1, '', item)">
                  <span>{{ item }}</span>
                </li>
              </el-scrollbar>
            </ul>
            <el-button slot="reference" type="primary" size="small" class="tags batchTags">批量标签</el-button>
          </el-popover>
<!--          <el-button type="primary" size="small" @click="toAnalysis" class="screen" >统计</el-button>-->
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
        :header-cell-style="{background:'#f6f6f6'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="id" label="数据ID" width="120" />
        <el-table-column prop="doc" label="内容描述" />
        <el-table-column prop="manual_tag" label="标签" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.tag" placeholder="请选择" filterable allow-create
              @change="updateClassTag(0, scope.row.id, scope.row.tag)">
              <el-option v-for="(item, index) in TagOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-page">
        <el-pagination align="right" style="padding: 20px" :current-page.sync="page.currentPage"
          :page-sizes="[10, 20, 100, 200]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next"
          :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <el-dialog title="批量标签" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-select v-model="Tagvalue" placeholder="请选择" filterable allow-create>
        <el-option v-for="(item, index) in TagOptions" :key="index" :label="item" :value="item" />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClassTag(1)">确 定</el-button>
      </span>
    </el-dialog>

<!--    <el-dialog :visible.sync="dialogAnalysis" title="基本信息" width="400px" top="20vh" class="detail" :modal="false"-->
<!--      :close-on-click-modal="false">-->
<!--      <main>-->
<!--        <el-form label-position="right" label-width="100px">-->
<!--          <el-form-item label="任务类型">-->
<!--            <el-select v-model="DataValue" placeholder="请选择" style="width: 100%">-->
<!--              <el-option v-for="(item, index) in DataOption" :key="index" :label="item.label" :value="item.value" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="任务参数" class="taskpara">-->
<!--            <div>-->
<!--              <span class="taskdes">({{ this.params_json[0].des }})</span>-->
<!--              <el-input v-model="para.num" placeholer="请输入参数值" />-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </main>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogAnalysis = false" size="small" class="cancel">取 消</el-button>-->
<!--        <el-button type="primary" @click="reAnalyze" size="small" class="rethink">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { getData,getManual,update } from "@/api/corpus";

import excel from "@/utils/excel";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      searchName: "",
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
    this.getTag();
  },
  methods: {
    // 分析
    // toAnalysis() {
    //   this.$router.push({
    //     name: "Analysis",
    //     query: { id: this.$route.query.dataset_id },
    //   });
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let ids = [];
      this.multipleSelection.map((item) => {
        ids.push(item.id);
      });
      this.selectedIDs = ids;
      console.log(this.selectedIDs)
    },
    addTag(val) {
      let flag = true;
      for (let i = 0; i < this.TagOptions.length; i++) {
        if (this.TagOptions[i] === val) {
          flag = false;
        }
      }
      if (flag) {
        this.TagOptions.unshift(val);
        this.searchName = ''
        this.$message.success('标签添加成功')
      }
    },

    // toggleSelection(rows) {
    //   staticSel = !staticSel;
    //   for (let i = 0; i < rows.length; i++) {
    //     this.$refs.multipleTable.toggleRowSelection(rows[i], staticSel);
    //   }
    //   this.is_total = staticSel;
    // },

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


    //获取任务执行结果列表
    getResult() {
      let params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        manual_tag: this.manual_tag,
        doc: this.findContent,
      };
      this.isLoading = true;
      getData(params).then((res) => {
        this.tableData = res.counts ? res.data : [];
        this.isLoading = false;
        this.page.total = res.counts;
        this.is_total = false;
      });
    },

    // 导出
    // async exportExcel() {
    //   this.exportLoading = true;
    //   let params = {
    //     page: 1,
    //     page_size: 999999,
    //     total_flg: true,
    //     task_id: this.$route.query.id,
    //     dataset_id: this.$route.query.dataset_id,
    //     class_id: this.Typevalue,
    //     manual_tag: this.manual_tag,
    //     doc: this.findContent,
    //   };
    //   let res = await getTaskResult(params);
    //   this.exportExcelFu(res.data);
    // },
    // // 导出参数
    // exportExcelFu(tableData) {
    //   if (tableData) {
    //     const params = {
    //       title: ["数据ID", "内容", "类型编号", "自动标签", "最终标签"],
    //       key: ["id", "doc", "class_id", "predict_tag", "manual_tag"],
    //       data: tableData,
    //       autoWidth: true,
    //       filename: "分类列表",
    //     };
    //     excel.export_array_to_excel(params);
    //     this.exportLoading = false;
    //   } else {
    //     console.error("表格数据不能为空！");
    //     // this.$Message.success('表格数据不能为空！')
    //   }
    // },



    //获取最终标签列表
    getTag() {
      getManual().then((res) => {
        this.TagOptions = res.data.manual_tags;
      });
    },

    //批量更新数据标签
    updateClassTag(flg, id, tag) {
      //flg 1批量 0单改

      if (flg){
        if (this.selectedIDs.length){
            let params = {
              label_ids: flg ? this.selectedIDs : [id],
              manual_tag: tag,
              is_total: this.is_total,
              tag: "",
              doc: "",
            };
            console.log('params',params)
            update(params).then((res) => {
              if (res.success) {
                this.$message.success(res.msg);
                // this.addTag(tag);
                this.dialogVisible = false;
                this.getResult();
              }
            });
        }else {
          this.$message.error("请先选择标签");
        }
      }else {
        if (tag || this.Tagvalue) {
          let params = {
            label_ids: flg ? this.selectedIDs : [id],
            manual_tag: tag,
            is_total: this.is_total,
            tag: "",
            doc: "",
          };
          console.log('params',params)
          update(params).then((res) => {
            if (res.success) {
              this.$message.success(res.msg);
              // this.addTag(tag);
              this.dialogVisible = false;
              this.getResult();
            }
          });
        } else {
          this.$message.error("请先选择标签");
        }
      }
    },
    //重新分析
    // reAnalyze() {
    //   if (this.is_total) {
    //     this.selectedIDs = [];
    //   }
    //   let params = {
    //     dataset_id: this.$route.query.dataset_id,
    //     task_name: this.$route.query.task_name,
    //     task_type: this.$route.query.task_type || this.DataValue,
    //     params_json: this.$route.query.params_json || this.para,
    //     label_ids: this.selectedIDs || [],
    //     class_id: this.Typevalue,
    //     doc: this.findContent,
    //     last_task_id: this.$route.query.last_task_id,
    //     is_total: this.is_total,
    //   };
    //   createTask(params).then((res) => {
    //     if (res.success) {
    //       this.$message.success(res.msg);
    //       this.dialogAnalysis = false;
    //       this.$router.push({
    //         path: "tasklist",
    //         query: { dataset_id: this.$route.query.dataset_id },
    //       });
    //     }
    //   });
    // },
    querySearch(queryString, cb) {
      let allInfos= this.TagOptions.map((terminal) => {
        return {
          value: terminal
        };
      });
      cb(allInfos);
    },
  },
};
</script>

<style lang="scss" scoped>
.result_main {
  padding: 20px;
  font-size: 14px;
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
      ::v-deep.el-input__inner{
        height: 32px !important;
      }
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

.screen {
  background: #19bc9c;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 1px;
  border-color: #19bc9c;
}

.tags {
  background: rgba(25, 188, 156, 0.2);
  border: 1px solid rgba(25, 188, 156, 0.6);
  color: #00bf9b;

  ::v-deep .el-input__inner {
    background: rgba(25, 188, 156, 0.2);
    color: #00bf9b;
    width: 96px;
    height: 32px;
  }

  ::v-deep .el-input__inner::placeholder {
    color: #00bf9b !important;
  }
}

.rethink {
  background: #19bc9c;
  border-color: #19bc9c;
  color: #fff;
}

.cancel {
  background: rgba(25, 188, 156, 0.2);
  border: 1px solid rgba(25, 188, 156, 0.6);
  color: #00bf9b;
}

.taskpara {
  .taskdes {
    position: absolute;
    left: -73px;
    top: 15px;
  }
}

.list_item {
  box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  color: #333333;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  font-weight: 400;
}

.list_item:hover {
  background: #f0f5f8;
  cursor: pointer;
}

::v-deep.el-scrollbar .el-scrollbar__view {
  height: 260px;
}
.batchTags{
  margin-right: 20px;
}
::v-deep thead.has-gutter .el-checkbox{
  display: flex;
}
</style>

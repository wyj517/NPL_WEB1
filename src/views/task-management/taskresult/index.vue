<template>
  <div class="result_main">
    <div class="header">
      <div class="left">
        <div class="content">
          <span style="margin-right: 15px">内容</span>
          <el-input
            v-model="findContent"
            placeholder="输入内容"
            style="width: 200px"
            @change="getResult"
          />
        </div>
        <div>
          <span style="margin-right: 15px">类型编号</span>
          <el-select v-model="Typevalue" placeholder="请选择" @change="getResult" clearable>
            <el-option
              v-for="(item,index) in TypeOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="tag">
          <span style="margin-right: 15px">最终标签:</span>
          <el-input
            v-model="manual_tag"
            placeholder="输入内容"
            style="width: 200px"
            @keydown.enter.native="addTag(manual_tag)"
            @change="getResult"
          />
        </div>
        <div>
          <el-button type="primary" @click="getResult">筛选</el-button>
        </div>
      </div>
      <div class="right">
        <div>
          <el-button type="primary" @click="dialogVisible = true">批量标签</el-button>
          <el-button type="success" plain @click="reAnalyze()">重新分析</el-button>
        </div>
      </div>
    </div>
    <div class="main" style="margin-top: 50px">
      <el-table
        ref="multipleTable"
        v-loading="isLoading"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="数据ID"
          width="120"
        />
        <el-table-column
          prop="doc"
          label="内容"
        />
        <el-table-column
          prop="class_id"
          label="类型编号"
          width="100"
        />
        <el-table-column
          prop="predict_tag"
          label="自动标签"
          width="100"
        />
        <el-table-column
          prop="manual_tag"
          label="最终标签"
          width="150"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.manual_tag" placeholder="请选择"
                       @change="updateClassTag(0,scope.row.id,scope.row.manual_tag)"
            >
              <el-option
                v-for="(item,index) in TagOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-page">
        <div style="margin-top: 20px">
          <el-button type="primary" @click="toggleSelection(tableData)">搜索结果全部选择
          </el-button>
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
    >
      <el-select v-model="Tagvalue" placeholder="请选择">
        <el-option
          v-for="(item,index) in TagOptions"
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
  </div>
</template>

<script>
import { getTaskResult, getClassID, updateLabel } from '@/api/task'
import { createTask } from '@/api/dataset'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      isLoading: true,
      dialogVisible: false,
      multipleSelection: [],
      Typevalue: null,
      Tagvalue: null,
      findContent: '',
      TypeOptions: [],
      TagOptions: ['疫情1', '疫情2', '疫情3'],
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        query_str: '',
        total: 0
      },
      selectedIDs: [],
      manual_tag: ''
    }
  },
  computed: {},
  mounted() {
    this.getResult()
    this.getClass()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.selectedIDs = ids
    },
    addTag(val) {
      this.TagOptions.push(val)
      this.manual_tag = ''
    },
    toggleSelection(rows) {
      for (let i = 0; i < rows.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(rows[i], true)
      }
    },
    handleSizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getResult()
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getResult()
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
        doc: this.findContent
      }
      this.isLoading = true
      getTaskResult(params).then(res => {
        this.tableData = res.counts ? res.data : []
        this.isLoading = false
        this.page.total = res.counts
      })
    },

    //获取下拉classid列表
    getClass() {
      let params = {
        dataset_id: this.$route.query.dataset_id
      }
      getClassID(params).then(res => {
        for (let i = 0; i < res.data.class_ids.length; i++) {
          this.TypeOptions.push(res.data.class_ids[i])
        }
      })
    },

    //批量更新数据标签
    updateClassTag(flg, id, tag) {
      //flg 1批量 0单改
      let params = {
        dataset_id: this.$route.query.dataset_id,
        label_ids: flg ? this.selectedIDs : [id],
        manual_tag: flg ? this.Tagvalue : tag,
        is_total: false,
        tag: '',
        class_id: '',
        doc: ''
      }
      updateLabel(params).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getResult()
        }
      })
    },
    //重新分析
    reAnalyze() {
      this.$confirm('数据重新分析需要占用较多时间', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          dataset_id: this.$route.query.dataset_id,
          task_name: this.$route.query.task_name,
          task_type: this.$route.query.task_type,
          params_json: this.$route.query.params_json,
          label_ids:[],
          class_id: this.Typevalue,
          doc: this.findContent,
          last_task_id:this.$route.query.id
        }
        console.log(params)
        createTask(params).then(res => {
            console.log(res)
        })
      }).catch(() => {

      })
    }
  }
}
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

</style>

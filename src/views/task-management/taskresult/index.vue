<template>
  <div class="result_main">
    <div class="header">
      <div class="left">
        <div class="content">
          <span style="margin-right: 15px">内容</span>
          <el-input
            placeholder="输入内容"
            style="width: 200px"
            v-model="findContent"
          ></el-input>
        </div>
        <div>
          <span style="margin-right: 15px">类型编号</span>
          <el-select v-model="Typevalue" placeholder="请选择">
            <el-option
              v-for="item in TypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="tag">
          <span style="margin-right: 15px">最终标签:</span>
          <el-input
            placeholder="输入内容"
            style="width: 200px"
            v-model="newTag"
            @keydown.enter.native="addTag(newTag)"
          ></el-input>
        </div>
      </div>
      <div class="right">
        <div>
          <el-button type="primary" @click="dialogVisible = true">批量标签</el-button>
          <el-button type="primary">重新分析</el-button>
        </div>
      </div>
    </div>
    <div class="main" style="margin-top: 50px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="数据ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型编号">
        </el-table-column>
        <el-table-column
          prop="AutoTag"
          label="自动标签">
        </el-table-column>
        <el-table-column
          prop="LastTag"
          label="最终标签">
          <template slot-scope="scope">
            <el-select v-model="scope.row.LastTag" placeholder="请选择">
              <el-option
                v-for="item in TagOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[0], tableData[1], tableData[2]])">搜索结果全部选择</el-button>
      </div>
    </div>
    <el-dialog
      title="批量标签"
      :visible.sync="dialogVisible"
      width="30%">
      <el-select v-model="Tagvalue" placeholder="请选择">
        <el-option
          v-for="item in TagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      dialogVisible: false,
      multipleSelection: [],
      Typevalue: null,
      Tagvalue: null,
      newTag: '',
      findContent: '',
      TypeOptions: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        }
      ],
      TagOptions: [
        {
          value: '疫情',
          label: '疫情'
        },
        {
          value: '社保',
          label: '社保'
        },
        {
          value: '污染',
          label: '污染'
        }
      ],
      tableData: [
        {
          id: '1',
          content: '事情描述内容1',
          type: '1',
          AutoTag: '疫情',
          LastTag: '疫情'
        },
        {
          id: '2',
          content: '事情描述内容2',
          type: '2',
          AutoTag: '社保',
          LastTag: '社保'
        },
        {
          id: '3',
          content: '事情描述内容3',
          type: '3',
          AutoTag: '污染',
          LastTag: '污染'
        }
      ]
    }
  },
  computed: {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    batchTag() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.tableData[this.multipleSelection[i].id - 1].LastTag = this.Tagvalue
      }
      this.dialogVisible = false
    },
    addTag(val) {
      this.TagOptions.push({ value: val, label: val })
      console.log(this.TagOptions)
      this.newTag = ''
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
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

</style>

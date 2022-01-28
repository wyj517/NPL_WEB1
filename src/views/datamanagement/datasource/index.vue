<template>
  <div>
    <ListHeader title="数据集名称" @handle-create="openAddDialog"/>
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"/>

    <el-dialog
      :visible.sync="dialogVisible"
      title="新增数据源"
      width="700px"
      top="5vh"
      class="detail"
    >
      <el-form>
        <el-form-item label="数据库类型" label-width="150px">
          <el-select v-model="TypeValue" placeholder="请选择" style="width: 100%" size="small">
            <el-option
              v-for="item in TypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源名称" label-width="150px" size="small">
          <el-input placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="描述" label-width="150px" size="small">
          <el-input placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="连接串" label-width="150px" size="small">
          <el-input placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户名" label-width="150px" size="small">
          <el-input placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码" label-width="150px" size="small">
          <el-input placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="conn">测试连接</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
                        this.openDialog()
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
      TypeValue: '',
    }
  },
  methods: {
    openAddDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.conn{
  float: left;
  margin-left: 60px;
}
</style>

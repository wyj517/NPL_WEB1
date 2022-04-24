<template>
  <el-drawer
    title="任务列表"
    :visible.sync="drawer"
    :direction="direction"
  >
    <el-scrollbar class="page-scroll">
      <div class="selects">
        <el-select v-model="value" placeholder="请选择" style="width: 150px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          placeholder="请输入任务名称"
          v-model="searchName"
          style="width: 150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" size="mini">删除</el-button>
      </div>
      <div>
        <div v-for="(item,index) in tableData" @click="openTaskInfo(item.id,item.task_name)">
          <el-container>
            <el-header class="list_header" style="height: 40px">
              <el-checkbox class="title">测试数据集任务1-1-1</el-checkbox>
              <el-link class="status" :underline="false"
                       :type="item.task_status === 2 ? 'success' : item.task_status === 1 ? 'primary' : 'danger'"
              >●{{ item.task_status === 2 ? '执行成功' : item.task_status === 1 ? '正在执行' : '执行失败' }}
              </el-link>
              <!--            <el-switch-->
              <!--              v-model="switchValue"-->
              <!--              active-color="#13ce66"-->
              <!--              inactive-color="#ff4949">-->
              <!--            </el-switch>-->
            </el-header>
            <el-main class="main">
              <el-form
                ref="ruleForm"
                label-position="left"
                label-width=""
                class="w100"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="数据集名称：" class="w90" prop="task_name">
                      <span>{{ item.task_name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="数据源名称：" class="w90" prop="datas_name">
                      <span>{{ item.datas_name }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="数据集类型：" class="w90" prop="task_type">
                      <span>{{ item.task_type }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="数据源类型：" class="w90" prop="datas_name">
                      <span></span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="创建人：" class="w90" prop="full_name">
                      <span>{{ item.full_name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="创建时间：" class="w90" prop="datas_name">
                      <span>{{ formatDate(item.create_time) }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import { setDetail } from '@/api/dataset'
import { taskList } from '@/api/task'
import { formatDates } from '@/utils'

export default {
  name: 'tasklist',
  props: {

  },
  data() {
    return {
      switchValue: 'true',
      options: [{
        value: '1',
        label: '正在执行'
      },{
        value: '2',
        label: '执行成功'
      },{
        value: '3',
        label: '执行失败'
      }],
      value: '',
      drawer: false,
      direction: 'rtl',
      searchName: '',
      task_name: '',
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        query_str: '',
        total: 0
      }
    }
  },
  methods: {
    opendialog(dataset_id) {
      this.drawer = true
      this.getTask(dataset_id)
    },
    getTask(dataset_id) {
      const params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        task_name: this.task_name,
        dataset_id: dataset_id || ''
      }
      taskList(params).then(res => {
        this.tableData = res.data
        this.taskNum = res.counts
        this.page.total = res.counts
      })
    },
    formatDate(time){
      return formatDates(time)
    },
    openTaskInfo(id,name){
      this.$router.push({name:"Taskstate",query:{id,name}})
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__body {
  overflow: auto;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.page-scroll {
  height: 100%;
  width: 100%;
}
.selects{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  .el-button--primary{
    color: #FFF;
    background-color: #19BC9C;
    border-color: #19BC9C;
  }
}
.list_header {
  display: flex;
  align-items: center;
  background: #F0F5F8;
  border-radius: 1px;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }

  .status {
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
  }
}
.main{
  ::v-deep.el-form-item,
  ::v-deep.el-form-item.el-form-item__label
  {
    color: #666666;
  }
}
</style>

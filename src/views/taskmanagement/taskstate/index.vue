<template>
  <div class="main">
    <div class="title">
      <div style="width: 3px; height: 20px;background: skyblue;margin-right: 10px"></div>
      <span>任务名称</span>
    </div>
    <div class="task_log">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="运行日志" name="first">
          <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"/>
        </el-tab-pane>
        <el-tab-pane label="任务时间轴" name="second">
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <h4>步骤一</h4>
                  <p>任务 执行于 2018/4/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>步骤一</h4>
                  <p>任务 执行于 2018/4/3 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>步骤一</h4>
                  <p>任务 执行于 2018/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
export default {
  name: "index",
  computed: {
    columns() {
      const arr = [
        // 表格列项
        {label: '日志采集时间', key: 'log_time', width: '150'},
        {label: '状态', key: 'state',width: '150'},
        {label: '日志内容', key: 'log_content'},
        // {
        //   label: '操作',
        //   width: '160',
        //   fixed: 'right',
        //   render: (h, {row}) => {
        //     return h(
        //       'div',
        //       [
        //         h(
        //           'el-button',
        //           {
        //             props: {
        //               type: 'text'
        //             },
        //             on: {
        //               click: () => {
        //                 this.openAddDialog()
        //               }
        //             }
        //           },
        //           '编写'
        //         ),
        //         h(
        //           'el-button',
        //           {
        //             props: {
        //               type: 'text'
        //             },
        //             on: {
        //               click: () => {
        //                 this.CopyTask(row.id)
        //               }
        //             }
        //           },
        //           '删除'
        //         ),
        //       ]
        //     )
        //   }
        // }
      ]
      return arr
    }
  },
  data(){
    return{
      activeName: 'first',
      loading: false,
      height: null,
      tableData: [
        {log_time: '2022/01/01', state: 'NORMAL', log_content: '123'}
      ],
    }
  },
  components:{
    BaseTable
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.main{
  padding: 20px;
  .title{
    display: flex;
  }
  .task_log{
    margin-top: 50px;
  }
}
</style>

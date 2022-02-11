<template>
  <div class="main">
    <div class="title">
      <div style="width: 3px; height: 20px;background: skyblue;margin-right: 10px" />
      <span>任务名称</span>
    </div>
    <div class="task_log">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="运行日志" name="first">
          <codemirror v-model="code" :options="cmOptions" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/python/python.js'
import 'codemirror/theme/base16-light.css'
export default {
  name: 'Index',
  components: {
    codemirror
  },
  data() {
    return {
      activeName: 'first',
      loading: false,
      height: null,
      tableData: [
        { log_time: '2022/01/01', state: 'NORMAL', log_content: '123' }
      ],
      code: '2022-01-07 16:44:32   任务taskname1 开始执行 message:xxxxx',
      cmOptions: {
        // codemirror options
        tabSize: 2, // 缩进
        mode: 'python', // 语言
        theme: 'base16-light', // 主题
        lineNumbers: true,
        line: true,
        readOnly: true, // 只读
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets: true,
        hintOptions: { // 自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        },
        extraKeys: { 'Ctrl': 'autocomplete' }// 自定义快捷键
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: '日志采集时间', key: 'log_time', width: '150' },
        { label: '状态', key: 'state', width: '150' },
        { label: '日志内容', key: 'log_content' }
      ]
      return arr
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.main {
  padding: 20px;

  .title {
    display: flex;
  }

  .task_log {
    margin-top: 50px;
  }
}
</style>

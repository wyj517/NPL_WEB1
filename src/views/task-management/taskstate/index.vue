<template>
  <div class="main">
    <div class="title">
      <div
        style="
          width: 3px;
          height: 20px;
          background: skyblue;
          margin-right: 10px;
        "
      />
      <span>任务名称 — {{ name }}</span>
    </div>
    <div class="task_log">
      <el-button type="primary" class="refresh" size="small" @click="getLogInfo">刷新</el-button>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="运行日志" name="first">
          <codemirror v-model="code" :options="cmOptions" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/mode/python/python.js";
import "codemirror/theme/base16-light.css";
import { getTaskLog } from "@/api/task.js";
export default {
  name: "Index",
  components: {
    codemirror,
  },
  data() {
    return {
      name: this.$route.query.name,
      activeName: "first",
      loading: false,
      height: null,
      code: "",
      cmOptions: {
        // codemirror options
        tabSize: 2, // 缩进
        mode: "python", // 语言
        theme: "base16-light", // 主题
        lineNumbers: true,
        line: true,
        readOnly: true, // 只读
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets: true,
        hintOptions: {
          // 自定义提示选项
          tables: {
            users: ["name", "score", "birthDate"],
            countries: ["name", "population", "size"],
          },
        },
        extraKeys: { Ctrl: "autocomplete" }, // 自定义快捷键
        // more codemirror options, 更多 codemirror 的高级配置...
      },
    };
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: "日志采集时间", key: "log_time", width: "150" },
        { label: "状态", key: "state", width: "150" },
        { label: "日志内容", key: "log_content" },
      ];
      return arr;
    },
  },
  mounted() {
    this.getLogInfo();
  },
  methods: {
    async getLogInfo() {
      this.code = ""
      let data = { task_id: this.$route.query.id };
      let res = await getTaskLog(data);
      this.code = res.data.content;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  padding: 20px;

  .title {
    display: flex;
  }

  .task_log {
    margin-top: 50px;
    position: relative;
    .refresh{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;
    }
  }
}
</style>

<style>
.cm-s-base16-light span.cm-error {
  background: none;
  color: #aa759f;
}
.CodeMirror {
  height: 500px;
}
</style>

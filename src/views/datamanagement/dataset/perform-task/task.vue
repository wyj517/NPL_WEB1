<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="基本信息"
    width="700px"
    top="5vh"
    class="detail"
    @opened="initE()"
  >
    <main>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="任务名称">
          <el-input placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="数据算法">
          <el-select v-model="DataValue" placeholder="请选择">
            <el-option
              v-for="item in DataOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="算法内容">
          <codemirror v-model="code" :options="cmOptions"></codemirror>
        </el-form-item>
      </el-form>
    </main>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import E from "wangeditor";
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/hint/xml-hint.js';
export default {
  name: 'task',
  components: {
    codemirror
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      DataOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      DataValue: '',
      editorText: '',
      code: 'select * from',
      cmOptions: {
        // codemirror options
        tabSize: 2, //缩进
        mode: 'sql', //语言
        theme: 'base16-light', //主题
        lineNumbers: true,
        line: true,
        readOnly: true, //只读
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets: true,
        hintOptions: {//自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        },
        extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  watch: {
    demo(newDemo, oldDemo) {
      document.querySelectorAll('div.code').forEach(block => {
        // then highlight each
        hljs.highlightBlock(block);
      });
    }
  },
  computed: {},
  methods: {
    opendialog(res) {
      this.dialogVisible = true
    },
    initE() {
      // this.editor = new E('#e')
      // //这里各位小伙伴可以查询官网，根据自己的需求进行菜单栏调整
      //
      // this.editor.create()
    },
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
.detail {

}
</style>

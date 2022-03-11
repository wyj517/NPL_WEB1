<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="基本信息"
    width="700px"
    top="5vh"
    class="detail"
  >
    <main>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="任务名称">
          <el-input placeholder="请输入" />
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
        <el-form-item label="算法参数">
<!--          <codemirror v-model="code" :options="cmOptions" />-->
          <div>
            参数名1
            <el-input
              placeholer="请输入参数名"
              v-model="parameter.paraOne">
            </el-input>
          </div>
          <div>
            参数名3
            <el-input
              placeholer="请输入参数名"
              v-model="parameter.paraTwo">
            </el-input>
          </div>
          <div>
            参数名4
            <el-input
              placeholer="请输入参数名"
              v-model="parameter.paraThree">
            </el-input>
          </div>
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
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/xml-hint.js'

export default {
  name: 'Task',
  components: {

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
      parameter: {
        paraOne: '',
        paraTwo:'',
        paraThree:''
      }
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    opendialog(res) {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.detail {

}
</style>

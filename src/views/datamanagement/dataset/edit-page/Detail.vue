<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="基本信息"
    width="700px"
    top="5vh"
    class="detail"
  >
    <main>
      <div>
        <el-form label-position="right" label-width="100px">
          <el-form-item label="数据集名称">
            <el-input placeholder="请输入" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="请输入" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="数据源名称">
            <el-select v-model="SourceValue" placeholder="请选择">
              <el-option
                v-for="item in SourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="schema名称">
            <el-select v-model="SchemaValue" placeholder="请选择">
              <el-option
                v-for="item in SchemaOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="表名称">
            <el-select v-model="tableValue" placeholder="请选择">
              <el-option
                v-for="item in tableOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <Fieldinfo />
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Fieldinfo from './components/Fieldinfo.vue'

export default {
  name: 'Detail',
  components: {
    Fieldinfo
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      SourceOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      SourceValue: '',
      SchemaOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      SchemaValue: '',
      tableOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      tableValue: ''
    }
  },
  computed: {},
  methods: {
    opendialog(res) {
      // this.props.info.value = res
      // console.log(props.info.value)
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.detail{

}
</style>

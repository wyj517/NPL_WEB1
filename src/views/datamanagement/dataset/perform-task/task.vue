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

export default {
  name: 'task',
  components: {
  },
  props: {

  },
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
    }
  },
  computed: {},
  methods: {
    opendialog(res) {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.detail{

}
</style>

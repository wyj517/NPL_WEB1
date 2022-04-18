<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="添加任务"
    width="400px"
    top="20vh"
    class="detail"
    :close-on-click-modal="false"
    :modal="false"
  >
    <main>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="任务名称">
          <el-input placeholder="请输入" v-model="TaskName" />
        </el-form-item>
        <el-form-item label="任务类型">
          <el-select v-model="DataValue" placeholder="请选择" >
            <el-option
              v-for="(item,index) in DataOption"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务参数">
          <!--          <codemirror v-model="code" :options="cmOptions" />-->
          <span class="des"> {{ this.params_json[0].des }}</span>
          <div>
            <el-input
              v-model="para.num"
              placeholer="请输入参数名"
            />
          </div>
        </el-form-item>
      </el-form>
    </main>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addTask">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getType, createTask } from '@/api/dataset'

export default {
  name: 'Task',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      DataOption: [],
      TaskName: '',
      DataValue: '',
      editorText: '',
      params_json: [
        {
          des: "",
          field: "",
          type: ""
        }
      ],
      dataset_id: '',
      para:{
        num:null,
      }
    }
  },
  computed: {},
  mounted() {
    this.getTaskType()
  },
  methods: {
    opendialog(id) {
      this.dialogVisible = true
      this.dataset_id = id
    },
    //获取任务类型 参数
    getTaskType() {
      getType().then(res => {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          this.DataOption.push({ value: res.data[i].task_type, label: res.data[i].task_type_name })
          this.params_json = res.data[i].params_json
        }
        console.log('json', this.params_json[0])
      })
    },
    //创建任务
    addTask() {
      let params = {
        dataset_id: this.dataset_id,
        task_name: this.TaskName,
        task_type: this.DataValue,
        params_json: this.para
        // label_ids: [],
        // tag: '',
        // is_total: true,
        // class_id: '',
        // doc: '',
        // last_task_id: ''
      }
      createTask(params).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
        }
        this.dialogVisible = false
        this.$router.push({ path: 'task/tasklist', query: { dataset_id: this.dataset_id } })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.detail {

}
::v-deep .el-select{
  display: inline;
}
</style>


<template>
  <div class="operation-area">
    <el-row>
      <el-col :xs="24" :sm="10" >
        <div class="title">
          <span>
            {{ title === "" ? $route.meta.title : title }}
          </span>
          <el-input size="small" placeholder="输入关键字" style="margin-left: 5px"/>
          <el-button v-if="showSearch" type="primary" style="margin-left: 20px" @click="createSearch">搜索</el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="14">
        <div class="button-area">
          <el-button
            v-if="showCreate"
            type="primary"
            @click="createData"
          >新增{{ buttonTitle }}</el-button>
          <slot name="button" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * createby ts at 2021.11
 *
 * slot：
 *    button：右侧插槽
 * props：
 *    title： 左侧标题内容（如果为空显示路由title）
 *    showCreate： 是否显示新增按钮
 *    showBack： 是否显示返回按钮
 *    buttonTitle： 新增按钮文字
 */
export default {
  name: 'ListHeader',
  props: {
    showSearch: {
      type: Boolean,
      default: true
    },
    showCreate: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    buttonTitle: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    createData() {
      this.$emit('handle-create', null)
    },
    createSearch() {
      this.$emit('handle-search', null)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
}
.operation-area {
  margin: 20px 0;
  margin-top: 0;
  padding:  16px 0;
  padding-top: 0;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.operation-area .el-button--primary {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  background: #3285ff;
  border-radius: 4px;
}

.operation-area.operation-area .el-button--primary {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  background: #3285ff;
  border-radius: 4px;
}
.operation-area .el-button--success {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
}

.operation-area .el-button--warning {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  background: #f7b500;
  border-color: #f7b500;
  border-radius: 4px;
}
.operation-area .el-button--warning.is-disabled {
  background: rgba(247, 181, 0, 0.6);
  border-color: rgba(247, 181, 0, 0.6);
}

.operation-area h4 {
  margin: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 800;
  color: #333333;
  font-size: 20px;
  text-align: left;
  line-height: 36px;
  height: 32px;
}

.operation-area .query-area {
  line-height: 2.5em;
}

.operation-area .button-area {

  line-height: 2em;
  text-align: right;
}
</style>

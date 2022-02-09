<template>
  <div class="operation-area">
    <div class="title">
      <div>
         <span style="font-size: 14px">
            {{ title === "" ? $route.meta.title : title }}:
         </span>
        <el-input placeholder="输入关键字" size="small" style="width: 200px"/>
        <el-button v-if="showSearch" type="primary" @click="createSearch" size="small" style="margin-left: 20px" plain>搜索</el-button>
      </div>
      <div>
        <el-button
          v-if="showCreate"
          type="primary"
          @click="createData"
          size="small"
        >新增{{ buttonTitle }}
        </el-button>
      </div>
      <slot name="button"/>
    </div>
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
.operation-area {
  margin: 20px 0 0 0px;
}
.title{
  display: flex;
  justify-content: space-between;
}
</style>

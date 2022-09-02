<template>
  <div class="operation-area">
    <div class="title">
      <div>
        <span style="font-size: 14px" v-show="showTitle">
          {{ title === '' ? $route.meta.title : title }}：
        </span>
        <el-input v-model="find" v-show="showTitle" placeholder="输入关键字" size="small" style="width: 200px" @input="createInputSearch" />
        <el-button v-if="showSearch" v-show="showTitle" type="primary" size="small" style="margin-left: 20px" plain @click="createSearch">
          搜索
        </el-button>
      </div>
      <div>
        <el-button
          v-if="showCreate"
          type="success"
          size="small"
          @click="createData"
        >新增{{ buttonTitle }}
        </el-button>
      </div>
      <slot name="button" />
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
    showTitle:{
      type: Boolean,
      default: true
    },
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
  data() {
    return {
      find: ''
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
      this.$emit('handle-search', this.find)
    },
    createInputSearch() {
      this.$emit('handle-inputSearch', this.find)
    }
  }
}
</script>

<style scoped>
.operation-area {
  margin: 20px 0 0 0px;
}

.title {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-button--success{
  color: #fff;
  background-color: #19BC9C;
  border-color: #19BC9C;
}
::v-deep .el-button--primary.is-plain{
  color: #fff;
  background-color: #19BC9C;
  border-color: #19BC9C;
}
</style>

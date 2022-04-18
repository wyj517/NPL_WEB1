<template>
  <div class="main">
    <ListHeader title="角色名称" buttonTitle="角色" />
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tree :data="data" :props="defaultProps" style="background: #f6f9ff;margin-top: 20px" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData"  />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { getRole } from '@/api/user'
import ListHeader from '@/components/ListHeader'
export default {
  name: 'index',
  components: { BaseTable, ListHeader },
  data(){
    return{
      loading: false,
      height: null,
      tableData: [],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods:{
    handleNodeClick(data) {
      console.log(data);
    }
  },
  computed:{
    columns() {
      const arr = [
        // 表格列项
        { label: 'id', key: 'id', width: '150' },
        { label: '角色名称', key: 'role_name' },
        { label: '权限等级', key: 'lvl'},
      ]
      return arr
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.main{
  /*display: flex;*/
  /*flex-direction: row;*/
}
</style>

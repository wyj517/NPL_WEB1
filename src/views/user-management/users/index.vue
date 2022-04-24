<template>
  <div class="main">
<!--    <ListHeader title="角色名称" buttonTitle="角色" />-->
    <el-row :gutter="20" type="flex" style="height: 100%;">
      <el-col :span="4">
        <div class="organ">
          <el-input placeholder="请输入内容" v-model="name" style="margin-bottom: 20px">
            <template slot="append">查询</template>
          </el-input>
          <svg-icon icon-class="tree"></svg-icon>
          <span class="organ_text" style="margin-left: 8px">组织架构</span>
          <el-tree :data="data" :props="defaultProps" style="background: #f6f9ff;margin-top: 20px" @node-click="handleNodeClick"></el-tree>
        </div>
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
      name:'',
      loading: false,
      height: null,
      tableData: [],
      data: [{
        label: '温州市大数据局',
        children: [{
          label: '鹿城区大数据局',
          children: [{
            label: '三级 1-1-1'
          }]
        },
          {
            label: '瓯海区大数据局',
            children: [{
              label: '三级 1-1-1'
            }]
          },
          {
            label: '龙湾区大数据局',
            children: [{
              label: '三级 1-1-1'
            }]
          }
        ],
      }, {
        label: '温州市大数据局',
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
        label: '温州市大数据局',
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

<style lang="scss" scoped>
.main{
  /*display: flex;*/
  /*flex-direction: row;*/
  height: 100%;
  position: fixed;
}
.organ{
  padding: 20px 20px 0 20px;
  height: 100%;
  background: #ffffff;
  .organ_text{
    margin-left: 8px;
  }
}
</style>

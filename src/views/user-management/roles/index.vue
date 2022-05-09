<template>
  <div style="padding: 20px">
    <ListHeader title="角色名称" @handle-create="openDialog()" buttonTitle="角色" />
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData" />

    <el-dialog
      title="角色信息"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <main>
        <div>
          <el-form
            ref="ruleForm"
            label-position="right"
            label-width="100px"
            :model="ruleForm"
            :rules="rule"
          >
<!--            <el-form-item label="id" prop="id">-->
<!--              <el-input-->
<!--                v-model="ruleForm.id"-->
<!--                placeholder="请输入id"-->
<!--              />-->
<!--            </el-form-item>-->
            <el-form-item label="角色名称" prop="role_name">
              <el-input
                v-model="ruleForm.role_name"
                placeholder="请输入角色名称"
              />
            </el-form-item>
            <el-form-item label="父级角色" prop="parent_id">
              <el-input
                v-model="ruleForm.parent_id"
                placeholder="请输入父级角色id"
              />
            </el-form-item>
            <el-form-item label="角色层级" prop="lvl">
              <el-input
                v-model="ruleForm.lvl"
                placeholder="请输入角色层级"
              />
            </el-form-item>
            <el-form-item label="角色备注" prop="remarks">
              <el-input
                v-model="ruleForm.remarks"
                placeholder="请输入角色备注"
              />
            </el-form-item>
          </el-form>
        </div>
      </main>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole()">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { formatDates, interval } from '@/utils'
import { deleteRole, getRole, updateRole } from '@/api/user'
import ListHeader from '@/components/ListHeader'
import { setRemove } from '@/api/dataset'

export default {
  name: 'index',
  components: { BaseTable, ListHeader },
  data() {
    return {
      loading: false,
      height: null,
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        id: '',
        role_name: '',
        parent_id: '',
        lvl: '',
        remarks: ''
      },
      value: {
        id: '',
        role_name: '',
        parent_id: '',
        lvl: '',
        remarks: ''
      },
      rule: {
        role_name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        lvl: [{ required: true, message: '角色等级不能为空', trigger: 'blur' }],
      }
    }
  },
  methods: {
    getList() {
      this.loading = true
      getRole().then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    delRole(id) {
      this.$confirm('确实删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          record_id: id
        }
        deleteRole(params).then(res => {
          if (res.success){
            this.$message.success(res.msg)
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addRole() {
      let params = {
        id: this.ruleForm.id,
        role_name: this.ruleForm.role_name,
        parent_id: this.ruleForm.parent_id,
        lvl: this.ruleForm.lvl,
        remarks: this.ruleForm.remarks
      }
      updateRole(params).then(res => {
        if (res.success){
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    openDialog(data) {
      this.dialogVisible = true
      if (data){
        this.ruleForm=data
      }else {
        this.ruleForm=this.value
      }
    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: 'id', key: 'id', width: '150' },
        { label: '角色名称', key: 'role_name' },
        { label: '角色等级', key: 'lvl' },
        { label: '备注', key: 'remarks' },
        // { label: '权限管理', key: '' },
        // {
        //   label: '使用状态',
        //   key: true,
        //   render: (h, { row }) => {
        //     return h(
        //       'div',
        //       [
        //         h(
        //           'el-switch',
        //           {
        //             props: {
        //               value: 1,
        //               "active-color":"#00BF9B",
        //               "inactive-color":"#F7F7F7",
        //               "active-value": 1,
        //               "inactive-value": 0,
        //             },
        //             on: {
        //               change: (value) => {
        //                 value = value == 1 ? 0 : 1;
        //               },
        //             },
        //           }
        //         )
        //       ]
        //     )
        //   }
        // },
        {
          label: '操作',
          width: '160',
          fixed: 'right',
          render: (h, { row }) => {
            return h(
              'div',
              [
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.openDialog(row)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.delRole(row.id)
                      }
                    }
                  },
                  '删除'
                )
              ]
            )
          }
        }
      ]
      return arr
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>

</style>

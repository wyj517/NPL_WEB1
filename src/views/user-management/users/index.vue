<template>
  <div class="main">
    <!--    <ListHeader title="角色名称" buttonTitle="角色" />-->
    <el-row :gutter="20" type="flex" style="height: 100%;background: #f0f2f8">
      <el-col :span="4">
        <div class="organ">
          <el-input placeholder="请输入内容" v-model="departName" style="margin-bottom: 20px">
            <template slot="append">查询</template>
          </el-input>
          <svg-icon icon-class="tree"></svg-icon>
          <span class="organ_text" style="margin-left: 8px">组织架构</span>
          <el-tree :data="data" :props="defaultProps" style="margin-top: 20px" @node-click="handleNodeClick"
                   :highlight-current="true"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="20" style="background: #fff;padding: 20px 20px 0 20px">
        <div class="title_header">
          <el-input placeholder="请输入关键字" v-model="username" class="search">
            <template slot="append">查询</template>
          </el-input>
          <el-button class="addButton" @click="openDrawer()">新增用户</el-button>
        </div>
        <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData" />
        <el-pagination
          align="right"
          style="padding: 20px"
          :current-page.sync="page.currentPage"
          :page-sizes="[10, 20, 100, 200]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>

    <el-drawer
      title="新增用户"
      :visible.sync="drawer"
      :modal="false"
      :direction="direction"
    >
      <el-scrollbar class="page-scroll">
        <el-form
          label-position="top"
          label-width="80px"
          :model="users"
        >
          <el-form-item label="用户账号">
            <el-input placeholder="请输入" v-model="users.username">

            </el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input placeholder="请输入" v-model="users.phone_number">

            </el-input>
          </el-form-item>
          <el-form-item label="所属组织">
            <el-select v-model="users.org_name" placeholder="请选择" :popper-append-to-body="false" style="width: 100%">
              <el-option
                v-for="item in organOptions"
                :key="item.id"
                :label="item.org_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!--          <el-form-item label="所属部门">-->
          <!--            <el-select v-model="DepartValue" placeholder="请选择" class="select" :popper-append-to-body="false">-->
          <!--              <el-option-->
          <!--                v-for="item in DepartOptions"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              >-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="所属角色">-->
          <!--            <el-select v-model="RoleValue" placeholder="请选择" :popper-append-to-body="false">-->
          <!--              <el-option-->
          <!--                v-for="item in RoleOptions"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              >-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item label="电子邮箱" prop="full_name">
            <el-input placeholder="请输入" v-model="users.email">

            </el-input>
          </el-form-item>
          <el-form-item label="可以ip地址" prop="full_name">
            <el-input placeholder="请输入" v-model="users.access_ip">

            </el-input>
          </el-form-item>
          <el-form-item label="名称" prop="full_name">
            <el-input placeholder="请输入" v-model="users.full_name">

            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入" v-model="users.password">

            </el-input>
          </el-form-item>
          <el-form-item label="使用状态">
            <template>
              <el-radio v-model="users.is_active" :label="true">开启</el-radio>
              <el-radio v-model="users.is_active" :label="false">关闭</el-radio>
            </template>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="insertUser">确 定</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { addUser, getOrg, getOrgTree, getUser, changePassword, register } from '@/api/user'
import ListHeader from '@/components/ListHeader'

export default {
  name: 'index',
  components: { BaseTable, ListHeader },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 20,
        query_str: '',
        total: 0
      },
      direction: 'rtl',
      drawer: false,
      departName: '',
      username: '',
      loading: false,
      height: null,
      tableData: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'org_name'
      },
      organOptions: [],

      DepartOptions: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }],
      DepartValue: '',

      RoleOptions: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }],
      RoleValue: '',

      users: {
        id: '',
        username: '',
        phone_number: '',
        password: '',
        full_name: '',
        is_active: true,
        org_name: '',
        email: '',
        access_ip: ''
      },

      values: {
        id: '',
        username: '',
        phone_number: '',
        password: '',
        full_name: '',
        is_active: true,
        org_name: '',
        email: '',
        access_ip: ''
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      this.loading = true
      let params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        query_str: '',
        org_id: data.id
      }
      getUser(params).then(res => {
        this.tableData = res.data
        this.page.total = res.counts
        this.loading = false
        console.log(res)
      })
    },
    openDrawer(data) {
      this.drawer = true
      this.getOrgList()
      if (data) {
        this.users = data
      } else {
        this.users = Object.assign({}, this.values)
      }
      console.log(this.users)
    },
    //获取组织树
    getList() {
      let params = {
        org_id: ''
      }
      getOrgTree(params).then(res => {
        this.data = res.data
      })
    },
    //获取组织列表
    getOrgList() {
      let params = {
        org_id: ''
      }
      getOrg(params).then(res => {
        this.organOptions = res.data
        console.log('列表', this.organOptions)
      })
    },
    //获取角色列表
    getUserList() {
      let params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        query_str: '',
        org_id: ''
      }
      getUser(params).then(res => {
        this.tableData = res.data
        this.page.total = res.counts
        console.log(res)
      })
    },
    //添加角色 或者 编辑角色
    insertUser() {
      let params = {
        id: this.users.id,
        username: this.users.username,
        full_name: this.users.full_name,
        phone_number: this.users.phone_number,
        org_id: this.users.org_id,
        email: this.users.email,
        is_active: this.users.is_active,
        access_ip: this.users.access_ip,
        password:this.users.password
      }
      if (this.users.id === ''){
        this.users.password ? register(params).then(res=>{if(res.success){this.$message.success(res.msg)}}) : addUser(params).then(res=>{if(res.success){this.$message.success(res.msg)}})
        this.drawer = false
        this.getUserList()
      }else {
        addUser(params).then(res => {
          console.log(res)
          if (res.success) {
            this.users.password ? this.changeWord(this.users.id,this.users.password) : this.$message.success(res.msg)
            this.drawer = false
            this.getUserList()
          }
        })
      }
    },
    //修改角色状态
    changeState(data) {
      console.log(data)
      let params = {
        id: data.id,
        is_active: data.is_active,
        username: data.username,
        full_name: data.full_name,
        phone_number: data.phone_number,
        org_id: data.org_id
      }
      addUser(params).then(res => {
        this.getUserList()
      })
    },
    //删除角色配置
    // deleteUser(data){
    //   let params={
    //     record_id:''
    //   }
    //   deleteRole(params).then(res=>{
    //
    //   })
    // },
    //修改密码
    changeWord(id,password) {
      let params = {
        record_id: id,
        password: password
      }
      changePassword(params).then(res => {
        if (res.success) {
          this.$message.success("更新成功")
        }
      })

    },
    //换页
    handleSizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getList(this.page)
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
    }
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: '序号', key: '', width: '150' },
        { label: '用户账号', key: 'username' },
        { label: '所属组织', key: 'org_name' },
        { label: '用户名称', key: 'full_name' },
        { label: '手机号', key: 'phone_number' },
        {
          label: '使用状态',
          key: 'is_active',
          render: (h, { row }) => {
            return h(
              'div',
              [
                h(
                  'el-switch',
                  {
                    props: {
                      value: row.is_active,
                      'active-color': '#00BF9B',
                      'inactive-color': '#F7F7F7',
                      'active-value': true,
                      'inactive-value': false
                    },
                    on: {
                      change: (value) => {
                        row.is_active = row.is_active !== true
                        this.changeState(row)
                      }
                    }
                  }
                )
              ]
            )
          }
        },
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
                        // this.deleteRole(row.id)
                      }
                    }
                  },
                  '查看'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.openDrawer(row)
                      }
                    }
                  },
                  '编辑'
                ),
                // h(
                //   'el-button',
                //   {
                //     props: {
                //       type: 'text'
                //     },
                //     on: {
                //       click: () => {
                //
                //       }
                //     }
                //   },
                //   '修改密码'
                // )
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
    this.getUserList()
    this.height = document.body.offsetHeight - 317
  }
}
</script>

<style lang="scss" scoped>
.main {
  /*display: flex;*/
  /*flex-direction: row;*/
  height: 100%;
  position: fixed;
}

.organ {
  padding: 20px 20px 0 20px;
  height: 100%;
  background: #ffffff;

  .organ_text {
    margin-left: 8px;
  }

  ::v-deep.el-input-group__append,
  .el-input-group__prepend {
    background-color: #00BF9B;
    color: #fff;
  }
}

.title_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .search {
    width: 250px;

    ::v-deep.el-input-group__append,
    .el-input-group__prepend {
      background-color: #00BF9B;
      color: #fff;
    }
  }

  .addButton {
    background: #00BF9B;
    color: #fff;
  }
}

::v-deep .rtl {
  padding: 20px;
}

::v-deep .el-drawer__body {
  overflow: auto;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.page-scroll {
  height: 100%;
  width: 100%;
}


::v-deep .el-select-dropdown__list {
  margin: 16px 0;
}

::v-deep .demo-drawer__footer {
  float: right;
  margin: 16px 0;

  .el-button--primary {
    background: #19BC9C;
    border-radius: 4px;
    border-color: #19BC9C;
    color: #FFFFFF;
  }

  .el-button--default {
    background: rgba(25, 188, 156, 0.2);
    border-radius: 4px;
    border: 1px solid rgba(25, 188, 156, 0.6);
    color: #00C5A5;
  }
}

::v-deep .el-drawer {
  background-color: rgba(255, 255, 255, 0.9);
}

::v-deep .el-tree-node__content {
  font-weight: 500;
  color: #333333;
}

</style>

<template>
  <div class="User_main">
    <el-row
      :gutter="20"
      type="flex"
      style="height: 100%;background: #f0f2f8"
    >
      <el-col :span="4">
        <div class="organ">
<!--          <el-input-->
<!--            v-model="departName"-->
<!--            placeholder="请输入内容"-->
<!--            style="margin-bottom: 20px"-->
<!--          >-->
<!--            <template slot="append">-->
<!--              <el-button-->
<!--                @click="getOrgList"-->
<!--              >-->
<!--                查询-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-input>-->
          <svg-icon icon-class="tree" />
          <span
            class="organ_text"
            style="margin-left: 8px"
          >
            组织架构
          </span>
          <el-tree
            :data="data"
            :props="defaultProps"
            :highlight-current="true"
            style="margin-top: 20px"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col
        :span="20"
        style="background: #fff;padding: 20px 20px 0 20px"
      >
        <div class="title_header">
          <el-input
            v-model="username"
            class="search"
            placeholder="请输入关键字"
            @input="getUserList()"
          >
            <template slot="append">
              <el-button
                class="addButton"
                @click="getUserList()"
              >
                查询
              </el-button>
            </template>
          </el-input>
          <el-button
            class="addButton"
            @click="openDrawer()"
          >
            新增用户
          </el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          :max-height="height"
          style="width: 100%"
          @expand-change="expandChange"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="top"
                inline
                class="demo-table-expand"
              >
                <el-form-item label="所属角色">
                  <div
                    v-for="(item,i) in props.row.role"
                    :key="i"
                  >
                    <span>{{ item.role_name || '暂无角色' }}</span>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            :index="count"
            label="序号"
            width="50"
          />
          <el-table-column
            label="用户账号"
            prop="username"
          />
          <el-table-column
            label="所属组织"
            prop="org_name"
          />
          <el-table-column
            label="用户名称"
            prop="full_name"
          />
          <el-table-column
            label="手机号"
            prop="phone_number"
          />
          <el-table-column
            label="账户使用状态"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_active"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeState(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="openDrawer(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                @click="openPassword(scope.row.id)"
              >
                修改密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>

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
      v-drawer-drag
      :title="users.id?'编辑用户':'新增用户'"
      :visible.sync="drawer"
      :modal="true"
      :modal-append-to-body="false"
      :wrapper-closable="false"
      :direction="direction"
    >
        <el-scrollbar class="page-scroll">
          <el-form
            ref="Form"
            label-position="top"
            label-width="80px"
            :model="users"
            :rules="rule"
          >
            <el-form-item
              label="用户名称"
              prop="username"
            >
              <el-input
                v-model="users.username"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="full_name"
            >
              <el-input
                v-model="users.full_name"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              v-if="this.users.id===''"
            >
              <el-input
                v-model="users.password"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="手机号码"
              prop="phone_number"
            >
              <el-input
                v-model="users.phone_number"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="所属组织"
              prop="org_id"
            >
              <el-select
                v-model="users.org_name"
                placeholder="请选择"
                :popper-append-to-body="false"
                style="width: 100%"
              >
                <el-option
                  v-for="item in organOptions"
                  :key="item.id"
                  :label="item.org_name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="角色">
              <el-select
                v-model="RoleValue"
                placeholder="请选择"
                :popper-append-to-body="false"
                multiple
                style="width: 100%"
              >
                <el-option
                  v-for="item in RoleOptions"
                  :key="item.id"
                  :label="item.role_name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="demo-drawer__footer">
                <el-button
                  @click="drawer = false"
                >
                  取 消
                </el-button>
                <el-button
                  type="primary"
                  @click="insertUser()"
                >
                  确 定
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-scrollbar>
    </el-drawer>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :modal="false"
      width="30%"
    >
        <el-input
          v-model="users.password"
          placeholder="请输入新密码"
        />
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="changeWord()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addUser,
  getOrg,
  getOrgTree,
  getUser,
  changePassword,
  register,
  getRole,
  getUserRole
} from '@/api/user'

export default {
  name: 'Index',
  data() {
    let isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码')
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        const isPhone = reg.test(value)
        value = Number(value) //转换为数字
        if (typeof value === 'number' && !isNaN(value)) {//判断是否为数字
          value = value.toString() //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
            callback(new Error('手机号码格式如:173********'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入电话号码'))
        }
      }
    }
    return {
      dialogVisible:false,
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

      RoleOptions: [],
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
        access_ip: '',
        role:''
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
      },
      rule: {
        username: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
        full_name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        phone_number: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: isMobileNumber, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
        // is_active: [{ required: true, message: "选择不能为空", trigger: "blur" },],
      }
    }
  },
  mounted() {
    this.getList()
    this.getUserList()
    this.getRoleList()
    this.height = document.body.offsetHeight - 317
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
        this.tableData.forEach(item => {
          this.$set(item, 'role', '')
        })
        this.loading = false
      })
    },
    openDrawer(data) {
      this.drawer = true
      this.$nextTick(() => {
        this.$refs['Form'].clearValidate()
      })
      this.getOrgList()
      if (data) {
        let params = {
          record_id: data.id
        }
        getUserRole(params).then(res => {
          if (res.data!=''){
            this.RoleValue = res.data.map(item => {
              return item.id;
            })
          }else {
            this.RoleValue=''
          }
        })
        this.users = Object.assign({}, data)
      } else {
        this.users = Object.assign({}, this.values)
        this.RoleValue=''
      }
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
      })
    },
    //获取角色列表
    getUserList() {
      this.loading = true
      let params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        query_str: this.username,
        org_id: ''
      }
      getUser(params).then(res => {
        this.tableData = res.data
        this.page.total = res.counts
        this.tableData.forEach(item => {
          this.$set(item, 'role', '')
        })
        this.loading = false
      })
    },

    //添加角色 或者 编辑角色
    insertUser() {
      console.log(this.RoleValue)
      let params = {
        id: this.users.id,
        username: this.users.username,
        full_name: this.users.full_name,
        phone_number: this.users.phone_number,
        org_id: this.users.org_name,
        email: this.users.email,
        is_active: this.users.is_active,
        access_ip: this.users.access_ip,
        password: this.users.password,
        role_ids: this.RoleValue
      }

      this.$refs["Form"].validate((valid) => {
        if (valid) {
          if (this.users.id === '') {
            register(params).then(res => {
              if (res.success) {
                this.$message.success(res.msg)
              }
            })
            this.drawer = false
            console.log('register')
            this.getUserList()
          } else {
            addUser(params).then(res => {
              if (res.success) {
                this.users.password ? this.changeWord(this.users.id, this.users.password) : this.$message.success(res.msg)
                this.drawer = false
                console.log('addUser')
                this.getUserList()
              }
            })
          }
        }
      });
    },
    //修改角色状态
    changeState(data) {
      let params = {
        id: data.id,
        is_active: data.is_active,
        username: data.username,
        full_name: data.full_name,
        phone_number: data.phone_number,
        org_id: data.org_id
      }
      addUser(params).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.getUserList()
        }
      })
    },
    openPassword(id){
      this.dialogVisible=true
      this.users.id=id
    },
    //修改密码
    changeWord() {
      let params = {
        record_id: this.users.id,
        password: this.users.password
      }
      changePassword(params).then(res => {
        if (res.success) {
          this.$message.success('更新成功')
        }
      })
      this.dialogVisible=false
    },
    //获取角色列表
    getRoleList() {
      getRole().then(res => {
        this.RoleOptions = res.data
      })
    },
    //获取用户下的角色详情
    expandChange(row, dataArray) {
      if (dataArray.indexOf(row) !== -1) {
        let params = {
          record_id: row.id
        }
        getUserRole(params).then(res => {
          res.data.length > 0 ? row.role = res.data : row.role = [{ role_name: '暂无角色' }]
        })
      }
    },
    //换页
    handleSizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getUserList()
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getUserList()
    },
    count(index) {
      return (this.page.currentPage - 1) * this.page.pageSize + index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.User_main {
  /*display: flex;*/
  /*flex-direction: row;*/
  height: 100%;
  //position: fixed;
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
  background-color: rgba(255, 255, 255, 1);

  .el-drawer__header {
    padding: 0 20px 0 0;
  }
}

::v-deep .el-tree-node__content {
  font-weight: 500;
  color: #333333;
}

</style>

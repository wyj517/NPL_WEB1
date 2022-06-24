<template>
  <div style="padding: 20px">
    <ListHeader title="角色名称" buttonTitle="角色" @handle-create="openDialog()" />
    <BaseTable v-loading="loading" :height="height" :columns="columns" :data="tableData" />

    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="35%">
      <main>
        <div class="role_center">
          <div>
            <el-form ref="ruleForm" label-position="right" label-width="100px" :model="ruleForm" :rules="rule">
              <el-form-item label="角色名称" prop="role_name">
                <el-input v-model="ruleForm.role_name" placeholder="请输入角色名称" />
              </el-form-item>
              <el-form-item label="角色备注" prop="remarks">
                <el-input v-model="ruleForm.remarks" placeholder="请输入角色备注" />
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-tree :data="treeData" show-checkbox node-key="name" :check-strictly="true" :default-expanded-keys="[]"
              :default-checked-keys="menusId" :props="defaultProps" ref="tree">
            </el-tree>
          </div>
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
import BaseTable from "@/components/BaseTable";
import { formatDates, interval } from "@/utils";
import { deleteRole, getRole, updateRole } from "@/api/user";
import ListHeader from "@/components/ListHeader";
import { setRemove } from "@/api/dataset";
import Layout from "@/layout";

export default {
  name: "index",
  components: { BaseTable, ListHeader },
  data() {
    return {
      loading: false,
      height: null,
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        role_name: "",
        parent_id: "",
        lvl: "",
        remarks: "",
      },
      value: {
        id: "",
        role_name: "",
        parent_id: "",
        lvl: "",
        remarks: "",
      },
      rule: {
        role_name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        lvl: [{ required: true, message: "角色等级不能为空", trigger: "blur" }],
      },
      treeData: [
        {
          name: "dataManage",
          label: "数据管理",
          children: [
            {
              name: "Dataset",
              label: "数据集管理",
            },
            {
              name: "Datasource",
              label: "数据源管理",
            },
          ],
        },
        {
          name: "taskManage",
          label: "任务管理",
          children: [
            {
              name: "Tasklist",
              label: "任务列表",
            },
            { name: "FlowAdd", label: "添加流程图" },
            {
              name: "Taskresult",
              label: "任务执行结果",
            },
            {
              name: "Taskstate",
              label: "任务执行日志",
            },
            {
              name: "Analysis",
              label: "数据分析",
            },
            {
              name: "TaskFlow",
              label: "任务流程",
            },
          ],
        },
        {
          name: "userManage",
          label: "人员管理",
          children: [
            {
              name: "Users",
              label: "用户管理",
            },
            {
              name: "Roles",
              label: "角色管理",
            },
          ],
        },
        {
          name: "Material",
          label: "语料和模型",
          children: [
            {
              name: "Corpus",
              label: "语料管理",
            },
            {
              name: "Model",
              label: "模型管理",
            },
          ],
        },
        {
          name: "TextApi",
          label: "文本分类接口",
          children: [
            {
              name: "SingleText",
              label: "单文本分类",
            },
            {
              name: "BatchText",
              label: "批量文本分类",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
        value: "name",
      },
      menusId: [],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      getRole().then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
    delRole(id) {
      this.$confirm("确实删除吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            record_id: id,
          };
          deleteRole(params).then((res) => {
            if (res.success) {
              this.$message.success(res.msg);
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addRole() {
      let params = {
        id: this.ruleForm.id,
        role_name: this.ruleForm.role_name,
        parent_id: this.ruleForm.parent_id,
        remarks: this.ruleForm.remarks,
        permission_list: this.$refs.tree.getCheckedKeys(),
      };
      updateRole(params).then((res) => {
        if (res.success) {
          this.$message.success(res.msg);
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    openDialog(data) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
      if (data) {
        this.ruleForm = data;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(data.permission_list);
        });
      } else {
        this.ruleForm = this.value;
      }
    },
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: "id", key: "id", width: "150" },
        { label: "角色名称", key: "role_name" },
        { label: "角色等级", key: "lvl" },
        { label: "备注", key: "remarks" },
        {
          label: "操作",
          width: "160",
          fixed: "right",
          render: (h, { row }) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                  },
                  on: {
                    click: () => {
                      this.openDialog(row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                  },
                  on: {
                    click: () => {
                      this.delRole(row.id);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ];
      return arr;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.role_center {
  display: flex;
  flex-direction: row;
}
</style>

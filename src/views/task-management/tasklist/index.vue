<template>
  <div class="task_main">
    <ListHeader
      title="任务名称"
      :show-create="true"
      :search="search"
      @handle-search="getList"
      @handle-create="openAddTaskFlow"
    />
    <BaseTable
      v-loading="loading"
      :height="height"
      :columns="columns"
      :data="tableData"
    />
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
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTable";
import { formatDates, interval } from "@/utils";
import ListHeader from "@/components/ListHeader";
import { getApi } from "@/api/database";
import router from "@/router";

export default {
  name: "Index",
  components: {
    BaseTable,
    ListHeader,
  },
  data() {
    return {
      search: "",
      loading: false,
      height: null,
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        query_str: "",
        total: 0,
      },
      taskNum: "",
      executionNum: "",
      successNum: "",
      errorNum: "",
    };
  },
  computed: {
    columns() {
      const arr = [
        // 表格列项
        { label: "任务名称", key: "task_name", width: "150" },
        { label: "创建人", key: "full_name" },
        { label: "数据集名称", key: "datas_name" },
        {
          label: "执行状态",
          render: (h, params) => {
            return h(
              "el-link",
              {
                props: {
                  underline: false,
                  type:
                    params.row.task_status === 2
                      ? "success"
                      : params.row.task_status === 1
                      ? "primary"
                      : "danger",
                },
              },
              "●" +
                (params.row.task_status === 2
                  ? "成功"
                  : params.row.task_status === 1
                  ? "进行中"
                  : "执行失败")
            );
          },
        },
        {
          label: "开始执行时间",
          width: "180px",
          render: (h, params) => (
            <span>{formatDates(params.row.create_date)}</span>
          ),
        },
        {
          label: "结束时间",
          width: "180px",
          render: (h, params) => (
            <span>{formatDates(params.row.update_time)}</span>
          ),
        },
        {
          label: "执行时长",
          render: (h, params) => (
            <span>
              {interval(params.row.create_date, params.row.update_time)}
            </span>
          ),
        },
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
                      this.routerTaskLog(row.id, row.datas_name);
                    },
                  },
                },
                "执行日志"
              ),
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                  },
                  on: {
                    click: () => {
                      this.routerEdit(row.id, row.datas_name);
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
                      this.deleteTask(row.id, row.datas_name);
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
  methods: {
    openAddTaskFlow() {
      this.$router.push({ name: "TaskFlow" });
    },
    routerTaskLog(id, name) {
      this.$router.push({ name: "Taskstate", query: { id, name } });
    },
    routerEdit(id) {
      this.$router.push({ name: "TaskFlow", query: { id } });
    },
    // 删除任务

    deleteTask(id) {
      this.$confirm("确实删除吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { msg, success } = await getApi("task/deleteTaskFlow", {
            task_id: id,
          });
          let message = success ? "success" : "error";
          this.$message({ type: message, message: msg });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getList();
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    getList(str) {
      const params = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        total_flg: true,
        task_name: str || "",
        dataset_id: this.$route.query.dataset_id || "",
      };
      getApi("task/get_task_flow", params).then((res) => {
        this.tableData = res.data;
        this.taskNum = res.counts;
        this.successNum = res.cntSuccess;
        this.errorNum = res.cntError;
        this.executionNum = res.cntRun;
        this.page.total = res.counts;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.task_main {
  padding: 20px;
}

.task_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
  height: 100px;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;

  .el-divider--vertical {
    height: 4em;
  }

  .right_header {
    display: flex;

    .right_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      margin-left: 50px;
      color: #929fb2;

      .icon_title {
        width: 10px;
        height: 10px;
        position: relative;
        left: -10px;
      }
    }
  }

  .left_header {
    ::v-deep .el-progress-bar__outer {
      border-radius: 0;
      background-color: #ff4949;
    }

    ::v-deep .el-progress-bar__inner {
      border-radius: 0;
    }

    .left_number {
      .font {
        position: relative;
        top: -10px;
        color: #929fb2;
        font-size: 13px;
      }
    }

    margin-right: 70px;
  }
}
</style>

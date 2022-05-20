<template>
  <section>
    <div class="approve-container">
      <NodePanel :lf="lf" v-if="lf.container"></NodePanel>
      <div id="graph" class="viewport" ref="container" />
    </div>
    <PropertyPanel
      :selectNode="selectNode"
      :nodeData="nodeData"
    ></PropertyPanel>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="input-suffix">
        <p>任务名称：</p>
        <el-input placeholder="请输入任务名称" v-model="taskName"> </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFlowSubmit(2)">确 定</el-button>
      </span>
    </el-dialog>

    <el-drawer
      title="节点分析结果"
      :visible.sync="drawer"
      direction="rtl"
      custom-class="demo-drawer"
      class="drawer"
      v-drawerDrag
      size="60%"
    >
      <el-button
        type="primary"
        plain
        class="exprot"
        size="small"
        @click="exportExcel"
        :loading="exportLoading"
        >导出</el-button
      >
      <div class="demo-drawer__content" style="padding: 10px">
        <el-table :data="tableData">
          <el-table-column
            :prop="item"
            :label="item"
            :width="index ? 'auto' : '60'"
            v-for="(item, index) in tableColumn"
            :key="index"
          />
        </el-table>

        <el-pagination
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="getNodeDetail"
          class="pagination"
        >
        </el-pagination>
      </div>
    </el-drawer>
  </section>
</template>

<script>
import { Message } from "element-ui";
import LogicFlow from "@logicflow/core";
import {
  DndPanel,
  SelectionSelect,
  Control,
  Snapshot,
  Menu,
} from "@logicflow/extension";
import PropertyPanel from "./components/property-panel.vue";
import NodePanel from "./components/node-panel.jsx";
import { themeApprove, approveNodes, defaultData } from "./components/config";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import RegisteNode from "./components/registerNode";
import { getApi } from "@/api/database";
import excel from "@/utils/excel";
let lf = {};
export default {
  data() {
    return {
      selectNode: {
        properties: {},
      },
      lf,
      approveNodes,
      nodeData: {},
      taskName: "",
      dialogVisible: false,
      drawer: false,
      exportLoading: false,
      taskId: "",
      tableData: [],
      tableColumn: [],
      totalPage: 0,
    };
  },
  components: {
    PropertyPanel,
    NodePanel,
  },
  created() {
    // this.getNodeDetail();
  },
  methods: {
    // 任务流详情
    async getDetail() {
      // console.log(this.$route.query);
      let task_id = this.$route.query.id;
      if (task_id) {
        let { data } = await getApi("task/getTaskFlowDetail", { task_id });
        this.nodeData = data.task_flow_json;
        let resLog = await getApi("task/getNodeStatusAndLog", { task_id });
        // console.log(resLog);
        resLog.data.status.map((it) => {
          this.nodeData.edges.map((li) => {
            if (it.node_id == li.targetNodeId) {
              li.status = it.status;
            }
          });
        });

        this.nodeData.edges.map((it) => {
          if (it.status == "3") {
            it.type = "polyline-error";
            it.text = "执行失败";
          } else if (it.status == "2") {
            it.type = "polyline-success";
            it.text = "执行成功";
          } else if (it.status == "1") {
            it.text = "进行中";
          } else if (it.status == "0") {
            it.text = "未开始";
          }
        });

        // console.log(this.nodeData);
        this.taskName = data.task_name;
        this.taskId = data.id;
      } else {
        // 初始化默认效果
        this.nodeData = defaultData;
      }
      initFlow(this);
    },
    openNodeDetail() {
      this.drawer = true;
      this.getNodeDetail();
    },
    // 导出
    async exportExcel() {
      this.exportLoading = true;
      let params = {
        page: 1,
        page_size: 99999,
        node_id: this.selectNode.id,
        task_id: this.taskId,
      };
      let { data } = await getApi("task/get_nodes_result", params);
      console.log(data);
      this.exportExcelFu(data, this.tableColumn);
    },
    // 导出参数
    exportExcelFu(tableData, tableColumn) {
      if (tableData) {
        const params = {
          title: tableColumn,
          key: tableColumn,
          data: tableData,
          autoWidth: true,
          filename: "节点分析结果",
        };
        excel.export_array_to_excel(params);
        this.exportLoading = false;
      } else {
        console.error("表格数据不能为空！");
        // this.$Message.success('表格数据不能为空！')
      }
    },

    // 节点详情 执行结果
    async getNodeDetail(page = 1, page_size = 10) {
      this.tableData = [];
      let params = {
        page: page,
        page_size,
        total_flg: true,
        node_id: this.selectNode.id,
        task_id: this.taskId,
      };
      let { data, counts } = await getApi("task/get_nodes_result", params);
      this.totalPage = counts;
      let tempObj = {};
      this.tableColumn = [];
      if (data.length) {
        tempObj = data[0];
      }
      for (const key in tempObj) {
        this.tableColumn.push(key);
      }
      this.tableData = data;
    },

    saveFlow() {
      this.dialogVisible = true;
      console.log(this.nodeData);
    },
    async saveFlowSubmit(mode) {
      // console.log(this.nodeData);
      let modeUrl = this.taskId ? "updateTaskFlow" : "create_task_flow";
      let params = { task_name: this.taskName, task_flow_json: this.nodeData };
      if (this.taskId) {
        params = Object.assign(params, { id: this.taskId });
      }
      let res = await getApi("task/" + modeUrl, params);
      console.log(res);
      if (res.success) {
        Message.success("操作成功");
        this.dialogVisible = false;
        if (mode == 2) {
          this.$router.push({ name: "Tasklist" });
        }
      }
    },
    // 更新属性
    updateProperty(id, data) {
      const node = lf.graphModel.nodesMap[id];
      const edge = lf.graphModel.edgesMap[id];
      if (node) {
        node.model.setProperties(Object.assign(node.model.properties, data));
      } else if (edge) {
        edge.model.setProperties(Object.assign(edge.model.properties, data));
      }
    },
    // 重新执行
    async reActionNode(task_id, start_node_id) {
      let { data, msg, success } = await getApi("task/execute_task", {
        task_id,
        start_node_id,
      });
      this.saveFlowSubmit();
      if (success) {
        // this.$message.success("操作成功");
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },
  },
  mounted() {
    this.getDetail();
  },
};

const initFlow = (than) => {
  const config = {
    stopScrollGraph: true,
    stopZoomGraph: true,
    grid: {
      size: 10,
      visible: true,
      type: "mesh",
      config: {
        color: "#f3f3f3", // 设置网格的颜色
      },
    },
    keyboard: { enabled: true },
    style: themeApprove,
  };
  lf = new LogicFlow({
    ...config,
    container: document.querySelector("#graph"),
    plugins: [Control, Menu],
  });

  lf.extension.control.addItem({
    iconClass: "custom-minimap",
    title: "",
    text: "保存",
    onClick: (lf, ev) => {
      than.saveFlow();
      than.nodeData = lf.getGraphData();
    },
  });

  lf.extension.menu.setMenuConfig({
    nodeMenu: [
      {
        text: "删除",
        callback(node) {
          lf.deleteNode(node.id);
        },
      },
    ], // 覆盖默认的节点右键菜单
    edgeMenu: false, // 删除默认的边右键菜单
    graphMenu: [], // 覆盖默认的边右键菜单，与false表现一样
  });

  if (than.taskId) {
    lf.extension.menu.addMenuConfig({
      nodeMenu: [
        {
          text: "重新执行",
          callback(node) {
            than.nodeData = lf.getGraphData();
            than.reActionNode(than.taskId, node.id);
          },
        },
        {
          text: "执行结果",
          callback(node) {
            than.selectNode = node;
            than.openNodeDetail();
          },
        },
      ],
    });
  }
  RegisteNode(lf);
  lf.on("element:click", ({ data }) => {
    console.log(data);
    than.selectNode = data;
    than.nodeData = lf.getGraphData();
  });
  lf.on("connection:not-allowed", (data) => {
    Message.error(data.msg);
  });
  lf.on("edge:add", async (data) => {
    // console.log(lf.getGraphData());
  });

  lf.render(than.nodeData);
  than.lf = lf;
};
</script>

<style lang="scss">
@import url("./index.css");
#graph {
  height: 900px;
  margin-left: 256px;
  margin-right: 276px;
}
.approve-container {
  background: #f0f2f8;
}
.custom-minimap {
  background: url("../../icons/save.png");
  background-size: contain;
}
.pagination {
  margin: 10px 0 20px 0;
  text-align: right;
}

.drawer .el-drawer__header {
  margin-bottom: 5px;
}
.exprot {
  position: absolute;
  top: 20px;
  right: 60px;
  &.el-button.is-loading{
      position: absolute;
  }
}
</style>

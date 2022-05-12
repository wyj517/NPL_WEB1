<template>
  <section>
    <div class="approve-example-container">
      <!-- {{NodePanel(lf)}} -->
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
import { themeApprove, approveNodes } from "./components/config";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import RegisteNode from "./components/registerNode";
import { getApi } from "@/api/database";
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
      taskId: "",
    };
  },
  components: {
    PropertyPanel,
    NodePanel,
  },
  created() {},
  methods: {
    async getDetail() {
      console.log(this.$route.query);
      let task_id = this.$route.query.id;
      if (task_id) {
        let { data } = await getApi("task/getTaskFlowDetail", { task_id });
        this.nodeData = data.task_flow_json;
        let resLog = await getApi("task/getNodeStatusAndLog", { task_id });
        console.log(resLog);
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

        console.log(this.nodeData);
        this.taskName = data.task_name;
        this.taskId = data.id;
      }
      initFlow(this);
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
      if (res.success) {
        Message.success("操作成功");
        this.dialogVisible = false;
      } else {
        Message.error("保存失败，请核对后再提交");
      }
      if (mode == 2) {
        // location.reload();
        this.$router.push({ name: "Tasklist" });
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
  lf.extension.menu.addMenuConfig({
    nodeMenu: [
      {
        text: "重新执行",
        callback(node) {
          than.nodeData = lf.getGraphData();
          than.reActionNode(than.taskId, node.id);
        },
      },
    ],
  });
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
  width: 1500px;
  height: 850px;
}
.custom-minimap {
  background: url("../../icons/save.png");
  background-size: contain;
}
</style>

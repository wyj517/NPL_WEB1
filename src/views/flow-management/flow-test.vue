<template>
  <section>
    <div id="graph" class="container" ref="container" />
  </section>
</template>

<script>
const josnTest = {
  nodes: [
    {
      id: "node_id_1",
      type: "rect",
      x: 100,
      y: 200,
      text: {
        x: 100,
        y: 100,
        value: "节点1",
      },
      properties: {},
    },
    {
      id: "node_id_2",
      type: "circle",
      x: 200,
      y: 300,
      text: {
        x: 200,
        y: 300,
        value: "节点2",
      },
      properties: {},
    },
  ],
  edges: [
    {
      id: "edge_id",
      type: "polyline",
      sourceNodeId: "node_id_1",
      targetNodeId: "node_id_2",
      text: {
        x: 139,
        y: 100,
        value: "连线",
      },
      startPoint: {
        x: 110,
        y: 140,
      },
      endPoint: {
        x: 200,
        y: 250,
      },
      pointsList: [
        {
          x: 200,
          y: 140,
        },
        {
          x: 100,
          y: 200,
        },
        {
          x: 200,
          y: 200,
        },
        {
          x: 100,
          y: 150,
        },
      ],
      properties: {},
    },
  ],
};

import LogicFlow from "@logicflow/core";
import { getApi } from "@/api/database";
export default {
  data() {
    return {
      selectNode: {
        properties: {},
      },
      nodeData: {},
      taskName: "",
      dialogVisible: false,
      taskId: "",
    };
  },
  methods: {
    // 更新属性
  },
  mounted() {
    let lf = new LogicFlow({
      container: this.$refs.container
    });

    lf.render(josnTest);
  },
};

</script>

<style lang="scss">
@import url("./index.css");
.container {
  width: 1000px;
  height: 500px;
}
</style>

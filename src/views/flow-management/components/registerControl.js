export default function RegisterControl(lf,than) {
  lf.extension.control.addItem({
    iconClass: "custom-minimap",
    title: "",
    text: "保存",
    onClick: (lf, ev) => {
      than.saveFlow();
      than.nodeData = lf.getGraphData();
    },
  });
  lf.extension.control.addItem({
    iconClass: "custom-delete",
    title: "",
    text: "删除",
    onClick: (lf, ev) => {
      // console.log(than.selectNode);
      let node = than.selectNode;
      lf.deleteNode(node.id);
      lf.deleteEdge(node.id);
    },
  });
  lf.extension.control.addItem({
    iconClass: "custom-selection",
    title: "",
    text: "选区",
    onClick: (lf, ev) => {
      lf.updateEditConfig({
        stopMoveGraph: true,
      });
      console.log(lf);
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

  lf.on("element:click", ({ data }) => {
    // console.log(data);
    than.selectNode = data;
    than.nodeData = lf.getGraphData();
  });
  lf.on("node:dbclick", ({ data }) => {
    than.selectNode = data;
    than.openNodeDetail();
  });

  lf.on("connection:not-allowed", (data) => {
    Message.error(data.msg);
  });
  lf.on("blank:click", (data) => {
    // console.log(data);
    than.selectNode.id = "";
  });
  lf &&
    lf.on("selection:selected", () => {
      lf.updateEditConfig({
        stopMoveGraph: false,
      });
    });

  // 选择框样式
  lf.setTheme({
    outline: {
      fill: "transparent",
      stroke: "#949494",
      strokeDasharray: "3 3",
      hover: {
        stroke: "#949494",
      },
    },
  });
}

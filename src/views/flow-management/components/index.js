// 寻找上级类型
export function findProType(targetNodeId,nodeData) {
  let sourceNodeId = "";
  let proType = "";
  nodeData.edges.map((item) => {
    if (item.targetNodeId == targetNodeId) {
      sourceNodeId = item.sourceNodeId;
    }
  });
  nodeData.nodes.map((item) => {
    if (sourceNodeId == item.id) {
      proType = item.properties.type;
    }
  });
  return proType;
}

import { RectNode, RectNodeModel } from "@logicflow/core";

class CustomRectNode extends RectNode {}

class CustomRectModel extends RectNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 150;
    this.height = 40;
    this.radius = 20;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = '#FF6347';
    return style;
  }
}

export default {
  type: "custom-rect",
  view: CustomRectNode,
  model: CustomRectModel
};

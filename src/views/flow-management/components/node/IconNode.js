import { h } from "@logicflow/core";
import RectNode from "./RectNode";

// 左上角带ICON的节点
class IconNode extends RectNode.view {
  getImageHref() {
    return;
  }
  getRadius(){
    return
  }
  getStrokeDasharray(){
    return
  }
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const href = this.getImageHref();
    const iconAttrs = {
      x: x - (1 / 2) * width + 10,
      y: y - (1 / 2) * height + 8, // icon在左上角
      width: 25,
      height: 25,
      href,
      // 根据宽高缩放
      preserveAspectRatio: "none meet",
    };
    const rectAttrs = {
      ...style,
      strokeWidth: 1,
      strokeDasharray : this.getStrokeDasharray(),
      rx: this.getRadius(),
      x: x- 1/2 * width,
      y: y - 1/2 * height,
      width,
      height,
    };
    return h("g", {}, [
      h("rect", { ...rectAttrs }),
      h("image", { ...iconAttrs }),
    ]);
  }
}

export default {
  type: "image-node",
  view: IconNode,
  model: RectNode.model,
};

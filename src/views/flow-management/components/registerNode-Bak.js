import {
  EllipseNodeModel,
  EllipseNode,
  h,
  RectNode,
  RectNodeModel,
  PolygonNode,
  PolygonNodeModel,
  PolylineEdge,
  PolylineEdgeModel,
} from "@logicflow/core";
import { bgColor, borderColor } from "./config";

export default function RegisteNode(lf) {
  class ApplyNodeModel extends RectNodeModel {
    getConnectedTargetRules() {
      const rules = super.getConnectedTargetRules();
      const geteWayOnlyAsTarget = {
        message: "开始节点只能连出，不能连入！",
        validate: (source, target) => {
          let isValid = true;
          if (target) {
            isValid = false;
          }
          return isValid;
        },
      };
      // @ts-ignore
      rules.push(geteWayOnlyAsTarget);
      return rules;
    }
    initNodeData(data) {
      super.initNodeData(data);
      this.rx = 80;
      this.ry = 30;
      this.text.editable = false;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "#9996ca";
      style.fill = "#dfe0ff";
      //  style.strokeDasharray = "3 3";
      return style;
    }
  }
  lf.register({
    type: "apply",
    view: EllipseNode,
    model: ApplyNodeModel,
  });

  class ApproverNode extends RectNode {
    static extendKey = "UserTaskNode";
    getLabelShape() {
      const { x, y, width, height, properties } = this.props.model;
      const { labelColor, approveTypeLabel } = properties;
      return h(
        "text",
        {
          fill: labelColor,
          fontSize: 12,
          x: x - width / 2 + 5,
          y: y - height / 2 + 15,
          width: 50,
          height: 25,
        },
        approveTypeLabel
      );
    }
    getShape() {
      const { x, y, width, height, radius } = this.props.model;
      const style = this.props.model.getNodeStyle();
      return h("g", {}, [
        h("rect", {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width,
          height,
        }),
        this.getLabelShape(),
      ]);
    }
  }
  class ApproverModel extends RectNodeModel {
    constructor(data, graphModel) {
      super(data, graphModel);
      this.properties = {
        labelColor: "#000000",
        approveTypeLabel: "",
        approveType: "",
      };
    }
  }

  lf.register({
    type: "approver",
    view: ApproverNode,
    model: ApproverModel,
  });

  // 菱形
  class JugementModel extends PolygonNodeModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "#1a7ec8";
      style.fill = "#d3e6f4";
      //  style.strokeDasharray = "3 3";
      return style;
    }
    initNodeData(data) {
      super.initNodeData(data);
      this.text.editable = false;
    }
  }
  lf.register({
    type: "polygon",
    view: PolygonNode,
    model: JugementModel,
  });

  class FinishNodeModel extends EllipseNodeModel {
    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules();
      const geteWayOnlyAsTarget = {
        message: "结束节点只能连入，不能连出！",
        validate: (source) => {
          let isValid = true;
          if (source) {
            isValid = false;
          }
          return isValid;
        },
      };
      // @ts-ignore
      rules.push(geteWayOnlyAsTarget);
      return rules;
    }
    initNodeData(data) {
      super.initNodeData(data);
      this.rx = 80;
      this.ry = 30;
      this.text.editable = false;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "#9996ca";
      style.fill = "#dfe0ff";
      //  style.strokeDasharray = "3 3";
      return style;
    }
  }
  lf.register({
    type: "finish",
    view: EllipseNode,
    model: FinishNodeModel,
  });
  // console.log("EllipseNodeModel",EllipseNodeModel);

  // 小矩形
  class CustomRectNode extends RectNode {}
  class CustomRectModel extends RectNodeModel {
    initNodeData(data) {
      super.initNodeData(data);
      this.width = 150;
      this.height = 40;
      this.radius = 2;
      this.text.editable = false;
      this.isHovered = false;
      this.isSelected = false;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      //  style.strokeDasharray = "3 3";
      return style;
    }
  }

  class RectModel1 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[0];
      style.fill = bgColor[0];
      return style;
    }
  }

  class RectModel2 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[1];
      style.fill = bgColor[1];
      return style;
    }
  }
  class RectModel3 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[2];
      style.fill = bgColor[2];
      return style;
    }
  }
  class RectModel4 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[3];
      style.fill = bgColor[3];
      return style;
    }
  }

  class RectModel5 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[4];
      style.fill = bgColor[4];
      return style;
    }
  }
  class RectModel6 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[5];
      style.fill = bgColor[5];
      return style;
    }
  }
  class RectModel7 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[6];
      style.fill = bgColor[6];
      return style;
    }
  }
  class RectModel8 extends CustomRectModel {
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[7];
      style.fill = bgColor[7];
      return style;
    }
  }

  lf.register({
    type: "rect",
    view: CustomRectNode,
    model: CustomRectModel,
  });

  lf.register({
    type: "rect1",
    view: CustomRectNode,
    model: RectModel1,
  });
  lf.register({
    type: "rect2",
    view: CustomRectNode,
    model: RectModel2,
  });
  lf.register({
    type: "rect3",
    view: CustomRectNode,
    model: RectModel3,
  });
  lf.register({
    type: "rect4",
    view: CustomRectNode,
    model: RectModel4,
  });
  lf.register({
    type: "rect5",
    view: CustomRectNode,
    model: RectModel5,
  });
  lf.register({
    type: "rect6",
    view: CustomRectNode,
    model: RectModel6,
  });
  lf.register({
    type: "rect7",
    view: CustomRectNode,
    model: RectModel7,
  });
  lf.register({
    type: "rect8",
    view: CustomRectNode,
    model: RectModel8,
  });

  // 数据集椭圆
  class CustomEllipseNode extends EllipseNode {}
  class CustomEllipseModel extends EllipseNodeModel {
    initNodeData(data) {
      super.initNodeData(data);
      this.rx = 80;
      this.ry = 30;
      this.text.editable = false;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = borderColor[3];
      style.fill = bgColor[3];
      //  style.strokeDasharray = "3 3";
      return style;
    }
  }
  lf.register({
    type: "ellipse",
    view: CustomEllipseNode,
    model: CustomEllipseModel,
  });

  class CustomEdge extends PolylineEdge {}
  class CustomEdgeModel extends PolylineEdgeModel {
    getEdgeStyle() {
      const style = super.getEdgeStyle();
      style.stroke = "#C5C6D5";
      //  style.strokeDasharray = "3 3";
      return style;
    }
    getTextStyle() {
      const style = super.getTextStyle();
      style.color = "#666";
      return style;
    }
  }
  // 默认连接线
  lf.register({
    type: "polyline",
    view: CustomEdge,
    model: CustomEdgeModel,
  });

  class ErrorEdge extends PolylineEdge {}
  class ErrorEdgeModel extends PolylineEdgeModel {
    getEdgeStyle() {
      const style = super.getEdgeStyle();
      style.stroke = "red";
      return style;
    }
    getTextStyle() {
      const style = super.getTextStyle();
      style.color = "red";
      return style;
    }
  }
  // 执行失败连接线
  lf.register({
    type: "polyline-error",
    view: ErrorEdge,
    model: ErrorEdgeModel,
  });

  class SuccessEdge extends PolylineEdge {}
  class SuccessEdgeModel extends PolylineEdgeModel {
    getEdgeStyle() {
      const style = super.getEdgeStyle();
      style.stroke = "green";
      return style;
    }
    getTextStyle() {
      const style = super.getTextStyle();
      style.color = "green";
      return style;
    }
  }
  // 执行成功连接线
  lf.register({
    type: "polyline-success",
    view: SuccessEdge,
    model: SuccessEdgeModel,
  });
}

import IconNode from "./IconNode";
import {
  PolylineEdge,
  PolylineEdgeModel,
} from "@logicflow/core";
export default function RegisteNode(lf) {
  class StartNode extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/apply.png");
    }
    getRadius() {
      return 20;
    }
  }
  lf.register({
    type: "apply",
    view: StartNode,
    model: IconNode.model,
  });

  class FinishNode extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/finish.png");
    }
    getRadius() {
      return 20;
    }
  }
  lf.register({
    type: "finish",
    view: FinishNode,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect1 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect1.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect1",
    view: Rect1,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect2 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect2.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect2",
    view: Rect2,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect3 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect3.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect3",
    view: Rect3,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect4 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect4.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect4",
    view: Rect4,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect5 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect5.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect5",
    view: Rect5,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect6 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect6.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect6",
    view: Rect6,
    model: IconNode.model,
  });
  // 图形分割线
  class Rect7 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect7.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect7",
    view: Rect7,
    model: IconNode.model,
  });
  // -----------------
  class Rect8 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/rect8.png");
    }
    getRadius() {
      return 2;
    }
  }
  lf.register({
    type: "rect8",
    view: Rect8,
    model: IconNode.model,
  });
  // -----------------
  class DataRect1 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/ellipse.png");
    }
    getRadius() {
      return 2;
    }
    getStrokeDasharray() {
      return "3 3";
    }
  }
  lf.register({
    type: "ellipse",
    view: DataRect1,
    model: IconNode.model,
  });
  // -----------------
  class DataRect2 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/data-rect2.png");
    }
    getRadius() {
      return 2;
    }
    getStrokeDasharray() {
      return "3 3";
    }
  }
  lf.register({
    type: "data-rect2",
    view: DataRect2,
    model: IconNode.model,
  });
  // -----------------
  class DataRect3 extends IconNode.view {
    getImageHref() {
      return require("@/icons/flow/data-rect3.png");
    }
    getRadius() {
      return 2;
    }
    getStrokeDasharray() {
      return "3 3";
    }
  }
  lf.register({
    type: "data-rect3",
    view: DataRect3,
    model: IconNode.model,
  });

  // 线条属性
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

  // -----------------
}

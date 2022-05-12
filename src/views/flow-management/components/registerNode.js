import LogicFlow, {
  BaseNodeModel,
  ConnectRule,
  EllipseNodeModel,
  EllipseNode,
  h,
  RectNode,
  RectNodeModel,
  PolygonNode,
  PolygonNodeModel,
  PolylineEdge, PolylineEdgeModel
} from "@logicflow/core";

export default function RegisteNode(lf) {
  class ApplyNodeModel extends EllipseNodeModel {
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
      this.rx = 60;
      this.ry = 30;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "#FF6347";
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

  class JugementModel extends PolygonNodeModel {
    constructor(data, graphModel) {
      super(data, graphModel);
      this.points = [
        [35, 0],
        [70, 35],
        [35, 70],
        [0, 35],
      ];
      this.properties = {
        api: "",
      };
    }
  }
  lf.register({
    type: "jugement",
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
      this.rx = 60;
      this.ry = 30;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "#FF6347";
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
      this.radius = 3;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "#3CB371";
      return style;
    }
  }
  lf.register({
    type: "rect",
    view: CustomRectNode,
    model: CustomRectModel
  });

    // 小椭圆
    class CustomEllipseNode extends EllipseNode {}
    class CustomEllipseModel extends EllipseNodeModel {
      // getConnectedSourceRules() {
      //   const rules = super.getConnectedSourceRules();
      //   const geteWayOnlyAsTarget = {
      //     message: "只能有一条线",
      //     validate: (source, target) => {
      //       let isValid = true;
      //       console.log(source,lf.getGraphData());
      //       let edges = lf.getGraphData().edges
      //       edges.map(item=>{
      //         console.log(item.id, source.id);
      //         if (item.id == source.id) {
      //           isValid = false;
      //         }
      //       })
      //       return isValid;
      //     },
      //   };
        // @ts-ignore
      //   rules.push(geteWayOnlyAsTarget);
      //   return rules;
      // }

      initNodeData(data) {
        super.initNodeData(data);
        this.rx = 60;
        this.ry = 30;
      }
      getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = "#242424";
        return style;
      }
    }
    lf.register({
      type: "ellipse",
      view: CustomEllipseNode,
      model: CustomEllipseModel
    });

    class CustomEdge extends PolylineEdge {}
    class CustomEdgeModel extends PolylineEdgeModel {
      getEdgeStyle() {
        const style = super.getEdgeStyle();
        style.stroke = "red";
        style.strokeDasharray = "5 5";
        return style;
      }
      getTextStyle() {
        const style = super.getTextStyle();
        style.color = 'red';
        return style;
      }
    }
    
    // 执行失败连接线
    lf.register({
      type: "polyline-error",
      view: CustomEdge,
      model: CustomEdgeModel,
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
        style.color = 'green';
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

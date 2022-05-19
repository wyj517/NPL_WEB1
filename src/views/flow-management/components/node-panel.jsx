import { approveNodes } from "./config";

export default {
  // 拖拽创建
  props: ["lf"],
  methods: {
    dragNode(item) {
      console.log(item);
      this.lf.dnd.startDrag({
        type: item.type,
        text: item.label,
        properties: { type: item.property.approveType },
      });
    },
  },
  mounted() {
    // console.log(this.lf);
    document.querySelector("#approveNode").onselectstart = function () {
      return false;
    };
  },
  render(h) {
    const nodeList1 = [];
    const nodeList2 = [];
    const nodeList3 = [];

    approveNodes.forEach((item, key) => {
      if (item.genus == "1") {
        nodeList1.push(
          <div class={`approve-node node-${item.type}`} key={key}>
            <div
              class="node-shape"
              style={item.style}
              onmousedown={() => this.dragNode(item)}
            >
              <div class="node-label">{item.label}</div>
            </div>
          </div>
        );
      }else  if (item.genus == "2") {
        nodeList2.push(
          <div class={`approve-node node-${item.type}`} key={key}>
            <div
              class="node-shape"
              style={item.style}
              onmousedown={() => this.dragNode(item)}
            >
              <div class="node-label">{item.label}</div>
            </div>
          </div>
        );
      }else  if (item.genus == "3") {
        nodeList3.push(
          <div class={`approve-node node-${item.type}`} key={key}>
            <div
              class="node-shape"
              style={item.style}
              onmousedown={() => this.dragNode(item)}
            >
              <div class="node-label">{item.label}</div>
            </div>
          </div>
        );
      }
   
    });
    return (
      <div class="node-panel" id="approveNode">
        <div class="node-box"> {nodeList1} </div>
        <div class="node-box"> {nodeList2} </div>
        <div class="node-box"> {nodeList3} </div>
      </div>
    );
  },
};

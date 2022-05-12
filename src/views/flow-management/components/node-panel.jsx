import { approveNodes } from "./config";

export default {
  // 拖拽创建
  props:["lf"],
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
  mounted(){
    // console.log(this.lf);
  },
  render(h) {
    const nodeList = [];
    approveNodes.forEach((item, key) => {
      nodeList.push(
        <div class={`approve-node node-${item.type}`} key={key}>
          <div
            class="node-shape"
            // on-click={()=>this.dragNode(item)}
            style={item.style}
            onmousedown={() => this.dragNode(item)}
          >
            <div class="node-label">{item.label}</div>
          </div>
        </div>
      );
    });
    return (
      <div class="node-panel">
        {nodeList}
      </div>
    );
  },
};



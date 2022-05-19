import { approveNodes } from './config';
import Vue from "vue"

export default function NodePanel(lf) {
  // 拖拽创建
  const dragNode = (item) => { 
    lf.dnd.startDrag({
      type: item.type,
      text: item.label
    })
  }
  // 节点菜单
let vm = new Vue()
let h = vm.$createElement

  const getNodePanel = ()  => { 
    const nodeList = [];
    approveNodes.forEach((item, key) => { 
      nodeList.push(
        <div
          className={`approve-node node-${item.type}`}
          key={key}
        >
          <div
            className="node-shape"
            style={{ ...item.style }}
            onMouseDown={() => dragNode(item)}
          ></div>
          <div className="node-label">{item.label}</div>
        </div>
      )
    })
    console.log("nodeList",nodeList);
    return nodeList;
  }
  return getNodePanel()
}
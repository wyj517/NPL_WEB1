<template>
  <div class="map-wrapper">
    <div id="container"></div>
    <PropertyPanel :selectData="selectData"></PropertyPanel>
    <div class="button-wrapper">
      <button id="js_download-img">下载快照</button>
      <button id="js_download-xml">下载xml</button>
      <button @click="getFileXml">导入</button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import LogicFlow from "@logicflow/core";
import {
  BpmnElement,
  BpmnXmlAdapter,
  DndPanel,
  SelectionSelect,
  Control,
  MiniMap,
  Snapshot,
  lfJson2Xml,
  lfXml2Json,
  Menu,
} from "@logicflow/extension";
import PropertyPanel from "./property-panel.vue"
import { getXmlDocumentByFilePath, patternItem } from "./index";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import RegisteNode from "./registerNode";
import { onMounted ,ref} from "vue";
let lf = {};
let jsonData = {};
let selectData = ref({text:{}});
onMounted(() => {
  let resXml = getXmlDocumentByFilePath("./file/logicflow.xml");
  let strDiv = "<root>" + resXml + "</root>";
  console.log(lfXml2Json(strDiv));

  jsonData = lfXml2Json(strDiv).root;
  if (jsonData.nodes.length) {
    jsonData.nodes.map((it) => {
      it.x = parseInt(it.x);
      it.y = parseInt(it.y);
    });
  }
  if (jsonData.edges) {
    jsonData.edges.map((it) => {
      it.startPoint.x = parseInt(it.startPoint.x);
      it.startPoint.y = parseInt(it.startPoint.y);
      it.endPoint.x = parseInt(it.endPoint.x);
      it.endPoint.y = parseInt(it.endPoint.y);
      if (it.pointsList) {
        it.pointsList.map((li) => {
          li.x = parseInt(li.x);
          li.y = parseInt(li.y);
        });
      }
    });
  }
  lf = new LogicFlow({
    container: document.querySelector("#container"),
    grid: true,
    plugins: [
      BpmnElement,
      DndPanel,
      SelectionSelect,
      Control,
      MiniMap,
      Snapshot,
      Menu,
    ],
    keyboard: {
      enabled: true,
    },
  });
  RegisteNode(lf);
  // 设置节点面板
  lf.setPatternItems(patternItem);

  // 添加导航栏
  lf.extension.control.addItem({
    iconClass: "custom-minimap",
    title: "",
    text: "导航",
    onMouseEnter: (lf, ev) => {
      const position = lf.getPointByClient(ev.x, ev.y);
      lf.extension.miniMap.show(
        position.domOverlayPosition.x - 120,
        position.domOverlayPosition.y + 35
      );
    },
    onClick: (lf, ev) => {
      const position = lf.getPointByClient(ev.x, ev.y);
      lf.extension.miniMap.show(
        position.domOverlayPosition.x - 120,
        position.domOverlayPosition.y + 35
      );
    },
  });

  lf.render(jsonData);
  lf.on("history:change", (data) => {
    let changeData = data.data.undos.pop();
    // console.log("changeData", changeData);
    // console.log(JSON.stringify(changeData));
    //   console.log(data);
  });

  lf.on("element:click", ({ data }) => {
    console.log(data);
    selectData.value = data
    // console.log(JSON.stringify(lf.getGraphData()));
  });
  lf.on("connection:not-allowed", (data) => {
    ElMessage.error(data.msg);
  });

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  document.querySelector("#js_download-img").addEventListener("click", () => {
    lf.getSnapshot();
  });

  document.querySelector("#js_download-xml").addEventListener("click", () => {
    const data = lf.getGraphData();
    console.log(data);
    // download("logicflow.xml", lfJson2Xml(data));
  });
});
</script>

<style>
#container {
  width: 1000px;
  height: 400px;
  float: left;
}

li{
  list-style: none;
  line-height: 40px;
}
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.button-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
}
.custom-minimap {
  background: url(data:image/png;base64,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);
}
</style>

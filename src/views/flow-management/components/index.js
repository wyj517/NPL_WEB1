export function bpmnXmltoJson(str) {
  var jsonArr = { nodes: [], edges: [] };
  var tmpDiv = document.createElement("root");
  tmpDiv.innerHTML = str;
  let nodesDom = tmpDiv.getElementsByTagName("nodes");
  let edgesDom = tmpDiv.getElementsByTagName("edges");
  // console.log(edgesDom);
  for (let i = 0; i < nodesDom.length; i++) {
    var id = getTagName(nodesDom[i], "id");
    var type = getTagName(nodesDom[i], "type");
    var x = getTagName(nodesDom[i], "x");
    var y = getTagName(nodesDom[i], "y");
    var text = getTagPoint(nodesDom[i], "text");
    var properties = {};
    jsonArr.nodes.push({ id, type, x, y, text, properties });
  }
  for (let i = 0; i < edgesDom.length; i++) {
    var id = getTagName(edgesDom[i], "id");
    var type = getTagName(edgesDom[i], "type");
    var sourceNodeId = getTagName(edgesDom[i], "sourceNodeId");
    var targetNodeId = getTagName(edgesDom[i], "targetNodeId");
    var properties = {};
    var startPoint = getTagPoint(edgesDom[i], "startPoint");
    var endPoint = getTagPoint(edgesDom[i], "endPoint");
    var pointsList = getPointArr(edgesDom[i], "pointsList");
    jsonArr.edges.push({
      id,
      type,
      sourceNodeId,
      targetNodeId,
      startPoint,
      endPoint,
      pointsList,
    });
  }
  return jsonArr;
  function getTagName(tmpDiv, name) {
    return tmpDiv.getElementsByTagName(name)[0].textContent || "";
  }

  function getTagPoint(tmpDiv, name) {
    console.log(tmpDiv);
    let x = tmpDiv.getElementsByTagName("x")[0]
      ? tmpDiv.getElementsByTagName("x")[0].textContent
      : 0;
    let y = tmpDiv.getElementsByTagName("x")[0]
      ? tmpDiv.getElementsByTagName("x")[0].textContent
      : 0;
    let value = tmpDiv.getElementsByTagName("value")[0]
      ? tmpDiv.getElementsByTagName("value")[0].textContent
      : "";
    if (value) {
      return { x, y, value };
    } else return { x, y };
  }
  function getPointArr(tmpDiv, name) {
    var arr = [];
    let dom = tmpDiv.getElementsByTagName(name);
    for (let i = 0; i < dom.length; i++) {
      let x = dom[i].getElementsByTagName("x")[0].textContent || 0;
      let y = dom[i].getElementsByTagName("y")[0].textContent || 0;
      arr.push({ x, y });
    }
    return arr;
  }
}

export function getXmlDocumentByFilePath(xmlFilePath) {
  //xmlDocument对象
  var xmlDoc = null;
  //xmlhttp对象
  var xmlhttp = null;
  if (window.XMLHttpRequest) {
    //IE7+, FireFox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    //IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", xmlFilePath, false);
  xmlhttp.send();
  xmlDoc = xmlhttp.response;
  return xmlDoc;
}

export const patternItem = [
  {
    type: "apply",
    label: "数据源",
    style: {
      width: "30px",
      height: "30px",
      borderRadius: "15px",
      border: "2px solid #FF6347",
    },
    property: {
      username: "",
      time: "",
      startTime: "",
      endTime: "",
    },
  },
  {
    type: "bpmn:userTask",
    label: "用户任务",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
    className: "important-node",
  },
  {
    type: "bpmn:serviceTask",
    label: "系统任务",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAAAXNSR0IArs4c6QAAAgZJREFUSEvNljFPFEEUx38PCRgtoDG3JMZEjZJQmYgBE41HZW0hvV/AWBgLc3sszGlhLNBPQI2NpZ1nIFFQIhWJhcYYo4MUxkIDRnhklz1Zd/fuZoGA0+3Me//fmzf73oxwQEMOiMv/D/aqOoPSH2VIeGcn5PJustV0x16gA/xh1NYkCAGer5oEWSORr1fRgE6mbSBLRQLJBXu+XgDmQyGFSYHfwJ2U8AOFLoFbW0lg8KuRBVd4Bly6rUflCM9QLrmKxOmf7ejg6pdAfrn4ZcBRitepA8dSAp+Bl/HcReB4an2FQ5RdU56f6oqWEZ7/FVbGG2fdmIvOVhhL2IzYmoQBO41mZxxCy7HCE2tkNE/N83UauB6v1a2RESfq1j+xPTxfXwFDiamP1sjJVmIlX78L9CZs5qyR4XYBpMGrQHfCacoaudESXNW3opxL2KxZI4eLgav6HuXUrsDCBzshp4uBKzqD/FNGxVOtzNpa+662lz/XgjUy2G6njfVccJ+v9xTuFiynTMm1CiLbQNL1ue39A/gUf54AetLCG8q1bzV56rLrDLjP1/MKb1yc0zZF+nVuqku+DonwWJWzojxCuJJoKA1eHeVF1L2EeVVuLhuZcw246bUYXhYbXZxZuS+LoViLa7Gsq7xefig/XaGhnfMLZN8eAkWi34mt8453Il6onPYa0ExvEx2iuxnRs30zAAAAAElFTkSuQmCC",
    className: "import_icon",
  },
  {
    type: "bpmn:exclusiveGateway",
    label: "条件判断",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
  },
  {
    type: "finsh",
    text: "结束",
    label: "结束节点",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC",
  },
];


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

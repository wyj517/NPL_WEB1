export const bgColor = ["#FFF8EA","#F4FFEA","#E4FFF4","#E4FBFF","#E4F1FF","#F3EFFF","#FFECF0","#FFF1EB"]
export const borderColor = ["#FFC953","#83C56B","#6CD0B0","#70B8BC","#5087D7","#9375E9","#E37691","#E98D5A"]

const rectSytel = (index)=>{
  return {
    width: "160px",
    height: "40px",
    borderRadius: "2px",
    background: bgColor[index],
    border:"dashed 1px "+ borderColor[index]
  }
}

const dataSetStyle = {
  width: "140px",
  height: "50px",
  borderRadius: "50%",
  border: "dashed  1px #70B8BC",
  background: "#E4FBFF",
  margin: "0 auto"
}

const ellipseStyle = {
  width: "140px",
  height: "50px",
  borderRadius: "50%",
  border: "dashed  1px #9996ca",
  background: "#dfe0ff",
  margin: "0 auto"
}
export const approveNodes = [
  {
    type: "apply",
    label: "开始",
    genus: "1",
    style: ellipseStyle,
    property: {
      approveType: "wf_start",
    },
  },
  {
    type: "finish",
    label: "结束",
    genus: "1",
    style: ellipseStyle,
    property: {
      approveType: "wf_end",
    },
  },
  {
    type: "rect1",
    label: "分词",
    genus: "2",
    style:rectSytel(0),
    property: {
      approveType: "wf_segment",
    },
  },
  {
    type: "rect2",
    label: "向量化",
    genus: "2",
    style:rectSytel(1),
    property: {
      approveType: "wf_vector",
    },
  },
  {
    type: "rect3",
    label: "文本分类",
    genus: "2",
    style:rectSytel(2),
    property: {
      approveType: "wf_classify",
    },
  },
  {
    type: "rect4",
    label: "文本聚类",
    genus: "2",
    style:rectSytel(3),
    property: {
      approveType: "wf_cluster",
    },
  },
  {
    type: "rect5",
    label: "文本分析",
    genus: "2",
    style:rectSytel(4),
    property: {
      approveType: "wf_combineAna",
    },
  },
  {
    type: "rect6",
    label: "关键词获取",
    genus: "2",
    style:rectSytel(5),
    property: {
      approveType: "wf_keyword",
    },
  },
  {
    type: "rect7",
    label: "情感分析",
    genus: "2",
    style:rectSytel(6),
    property: {
      approveType: "wf_sentiment",
    },
  },
  {
    type: "rect8",
    label: "NER",
    genus: "2",
    style:rectSytel(7),
    property: {
      approveType: "wf_ner",
    },
  },
  {
    type: "ellipse",
    label: "数据集",
    genus: "3",
    style: dataSetStyle,
    property: {
      approveType: "wf_corpus",
    },
  },
  {
    type: "data-rect2",
    label: "过滤节点",
    genus: "3",
    style: {
      width: "60px",
      height: "60px",
      borderRadius: "2px",
      border: "dashed 1px #1a7ec8",
      background: "#d3e6f4",
      transform: "rotate(45deg)",
    },
    property: {
      approveType: "wf_filter",
      filters:[],
    },
  },
  {
    type: "data-rect3",
    label: "数据合并",
    genus: "3",
    style: {
      width: "60px",
      height: "60px",
      borderRadius: "2px",
      border: "dashed 1px #1a7ec8",
      background: "#d3e6f4",
      transform: "rotate(45deg)",
    },
    property: {
      approveType: "wf_combine",
      combineList:{}
    },
  },
];

export const approveUser = [
  {
    label: "直接上级",
    value: "leader",
  },
  {
    label: "T3领导",
    value: "t3Leader",
  },
  {
    label: "T2领导",
    value: "t2Leader",
  },
  {
    label: "T1领导",
    value: "t1Leader",
  },
];

// 主题
export const themeApprove = {
  rect: {
    // 矩形样式
    radius: 8,
    stroke: "#3CB371",
  },
  circle: {
    r: 25,
    stroke: "#FF6347",
  },
  polygon: {
    stroke: "#6495ED",
  },
  polyline: {
    strokeWidth: 1,
  },
  edgeText: {
    background: {
      fill: "white",
    },
  },
};

export const data = {
  nodes: [
    {
      id: "28df2fbe-f32b-4a9b-b544-7e70d7187b33",
      type: "apply",
      x: 210,
      y: 210,
      text: { x: 210, y: 210, value: "申请" },
      properties: {},
    },
    {
      id: "64179bd7-c60e-433c-8df7-97c8e98f855d",
      type: "approver",
      x: 350,
      y: 210,
      text: { x: 350, y: 210, value: "审批" },
      properties: {
        labelColor: "#000000",
        approveTypeLabel: "直接上级",
        approveType: "leader",
      },
    },
    {
      id: "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      type: "jugement",
      x: 510,
      y: 210,
      text: { x: 510, y: 210, value: "判断报销是否\n大于1000元" },
      properties: { api: "" },
    },
    {
      id: "9f119df3-c449-4e5d-a67a-cb351b9cbdb5",
      type: "approver",
      x: 670,
      y: 210,
      text: { x: 670, y: 210, value: "审批" },
      properties: {
        labelColor: "#000000",
        approveTypeLabel: "T2领导",
        approveType: "t2Leader",
      },
    },
    {
      id: "ef34f09c-38ea-4ad4-acd2-cc2f464a2be6",
      type: "finsh",
      x: 850,
      y: 210,
      text: { x: 850, y: 210, value: "结束" },
      properties: {},
    },
  ],
  edges: [
    {
      id: "0d87b1eb-2389-445a-9f34-6227940b2072",
      type: "polyline",
      sourceNodeId: "28df2fbe-f32b-4a9b-b544-7e70d7187b33",
      targetNodeId: "64179bd7-c60e-433c-8df7-97c8e98f855d",
      startPoint: { x: 235, y: 210 },
      endPoint: { x: 300, y: 210 },
      text: { x: 51.25, y: 0, value: "" },
      properties: {},
      pointsList: [
        { x: 235, y: 210 },
        { x: 300, y: 210 },
      ],
    },
    {
      id: "d99e7451-b379-411e-b0da-df11be8be20a",
      type: "polyline",
      sourceNodeId: "64179bd7-c60e-433c-8df7-97c8e98f855d",
      targetNodeId: "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      startPoint: { x: 400, y: 210 },
      endPoint: { x: 475, y: 210 },
      text: { x: 437.5, y: 210, value: "通过" },
      properties: {},
      pointsList: [
        { x: 400, y: 210 },
        { x: 475, y: 210 },
      ],
    },
    {
      id: "4c615802-15d8-442c-be22-b65430286123",
      type: "polyline",
      sourceNodeId: "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      targetNodeId: "9f119df3-c449-4e5d-a67a-cb351b9cbdb5",
      startPoint: { x: 545, y: 210 },
      endPoint: { x: 620, y: 210 },
      text: { x: 582.5, y: 210, value: "是" },
      properties: {},
      pointsList: [
        { x: 545, y: 210 },
        { x: 620, y: 210 },
      ],
    },
    {
      id: "934ae03a-6ee0-4568-a2b4-8bcede565e0b",
      type: "polyline",
      sourceNodeId: "9f119df3-c449-4e5d-a67a-cb351b9cbdb5",
      targetNodeId: "ef34f09c-38ea-4ad4-acd2-cc2f464a2be6",
      startPoint: { x: 720, y: 210 },
      endPoint: { x: 825, y: 210 },
      text: { x: -10, y: 0, value: "" },
      properties: {},
      pointsList: [
        { x: 720, y: 210 },
        { x: 825, y: 210 },
      ],
    },
    {
      id: "bd5e1dd0-1978-46f7-851b-d31c03aebee9",
      type: "polyline",
      sourceNodeId: "64179bd7-c60e-433c-8df7-97c8e98f855d",
      targetNodeId: "ef34f09c-38ea-4ad4-acd2-cc2f464a2be6",
      startPoint: { x: 350, y: 170 },
      endPoint: { x: 850, y: 185 },
      text: { x: 600, y: 140, value: "驳回" },
      properties: {},
      pointsList: [
        { x: 350, y: 170 },
        { x: 350, y: 140 },
        { x: 850, y: 140 },
        { x: 850, y: 185 },
      ],
    },
    {
      id: "453139c3-faa1-4e3a-a413-38f251243baa",
      type: "polyline",
      sourceNodeId: "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      targetNodeId: "ef34f09c-38ea-4ad4-acd2-cc2f464a2be6",
      startPoint: { x: 510, y: 245 },
      endPoint: { x: 850, y: 235 },
      text: { x: 680, y: 275, value: "否" },
      properties: {},
      pointsList: [
        { x: 510, y: 245 },
        { x: 510, y: 275 },
        { x: 850, y: 275 },
        { x: 850, y: 235 },
      ],
    },
  ],
};

export const defaultData = {
  nodes: [
    {
      id: "4ed20597-e266-4cc9-88d7-c3d2f2237066",
      type: "apply",
      x: 540,
      y: 70,
      properties: { type: "wf_start" },
      text: { x: 540, y: 70, value: "开始" },
    },
    {
      id: "39f13dcd-7a5c-47cf-af54-8eda4aee6e79",
      type: "finish",
      x: 550,
      y: 430,
      properties: { type: "wf_end" },
      text: { x: 550, y: 430, value: "结束" },
    },
  ],
  edges: [],
};

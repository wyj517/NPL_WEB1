const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@sentence(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)",
    },
  ],
});

module.exports = [
  {
    url: "/vue-admin-template/table/list",
    type: "get",
    response: (config) => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items,
        },
      };
    },
  },
  // // 数据源清单
  {
    url: "/nlp/ds/get_ds/aaa",
    type: "get",
    response: (_) => {
      return {
        code: 200,
        data: "success",
        mes: "数据源清单",
      };
    },
  },
];

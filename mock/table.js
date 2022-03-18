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
  "list|30": [
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
  // 获取数据源详情
  {
    url: "/ds/get_ds_detail",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: '1',
          ds_name: '数据源名称3',
          des: '描述3',
          create_time: '1650052653',
          ds_type: 'ORACLE',
          conn_str: '连接串',
          user_name: 'admin',
          password: '123',
        },
        message: "数据源清单",
        counts: 1,
        success: 'success'
      };
    },
  },
  // // 数据源清单
  {
    url: "/ds/get_ds",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [
          {
            id: '1',
            ds_name: '数据源名称',
            des: '描述',
            create_time: '1650052653',
            ds_type: 'ORACLE',
            conn_str: '连接串',
            user_name: 'admin',
            password: '123',
          },
          {
            id: '2',
            ds_name: '数据源名称2',
            des: '描述3',
            create_time: '1650052653',
            ds_type: 'MYSQL',
            conn_str: '连接串2',
            user_name: 'admin',
            password: '123',
          },
        ],
        message: "数据源清单",
        counts: 2,
        success: 'success'
      };
    },
  },


  //编辑数据源
  {
    url: "/ds/update_ds_detail",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [],
        message: "数据源清单",
        success: 'success'
      };
    },
  },
  // 新增数据源
  {
    url: "/ds/create_ds",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [],
        message: "数据源清单",
        success: 'success'
      };
    },
  },
  // 删除数据源
  {
    url: "/ds/delete_ds",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [],
        message: "数据源清单",
        success: 'success'
      };
    },
  },
  // 测试数据源连接
  {
    url: "/ds/test_ds",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [],
        message: "数据源清单",
        success: 'success'
      };
    },
  },

  //数据集详情
  {
    url: "/datas/get_datas_detail",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [
          {
            id: '1',
            datas_name: '数据集名称1',
            des: '描述',
            ds_name: 'test',
            schema_name: 'test',
            table_name: 'test',
            id_filed:'test',
            doc_field:'test'
          },
        ],
        message: "数据集清单",
        counts: 1,
        success: 'success'
      };
    },
  },
  //数据集列表
  {
    url: "/datas/get_datas",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [
          {
            id: '1',
            datas_name: '数据集名称1',
            des: '描述',
            ds_name: '数据源名称',
            create_user_name: '管理员1',
            create_time: '1650052653',
          },
          {
            id: '2',
            datas_name: '数据集名称2',
            des: '描述',
            ds_name: '数据源名称',
            create_user_name: '管理员2',
            create_time: '1650052653',
          },
        ],
        message: "数据集清单",
        counts: 2,
        success: 'success'
      };
    },
  },

  //任务列表
  {
    url: "/task/get_task",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: [
          {
            id: '1',
            task_name: '任务名称1',
            sts: '执行失败',
            create_user: '创建1',
            create_time: '1650052653',
            end_time: '1650052653',
            use_time: '200'
          },
          {
            id: '2',
            task_name: '任务名称2',
            sts: '执行成功',
            create_user: '创建2',
            create_time: '1650052653',
            end_time: '1650052653',
            use_time: '200'
          },
          {
            id: '3',
            task_name: '任务名称3',
            sts: '执行中',
            create_user: '创建3',
            create_time: '1650052653',
            end_time: '1650052653',
            use_time: '200'
          },
        ],
        counts: '3',
        cntSuccess:'1',
        cntError:'1',
        cntRun:'1',
        message: "数据源清单",
        success: 'success'
      };
    },
  },
];

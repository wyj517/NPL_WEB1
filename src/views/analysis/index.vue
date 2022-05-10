<template>
  <section class="analysis">
    <h1>AI智能分析中心</h1>
    <div class="chart-line">
      <div class="chart-row">
        <EchartsCom :option="optionPie"> </EchartsCom>
      </div>
      <div class="chart-row">
        <EchartsCom :option="optionBar"> </EchartsCom>
      </div>
    </div>
  </section>
</template>

<script>
import EchartsCom from "@/components/echarts-com.vue";
import { getApi } from "@/api/database.js";
export default {
  data() {
    return {
      optionPie: {
        title: {
          text: "最终标签分布",
          subtext: "AI分析",
          left: "center",
        },
        dataset: {},
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      optionBar: {
        legend: {},
        tooltip: {},
        title: {
          text: "编号类型分布",
          subtext: "AI分析",
          left: "center",
        },
        dataset: {
          // 提供一份数据。
          source: [],
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: "category" },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: "bar" }],
      },
    };
  },
  components: { EchartsCom },
  methods: {
    async getInit() {
      let data = {
        datas_id: this.$route.query.id||"a2a7b528",
      };
      let res1 = await getApi("/datas/get_class_id_count",data);
      // console.log(res1);
      let barData = res1.data.map((item) => {
        return [item.class_id, item.count];
      });
      this.optionBar.dataset.source = barData;
      // console.log(this.optionBar);
      let res2 = await getApi("/datas/get_manual_tag_count",data);
      let setData = res2.data.map((it) => {
        return {
          name: it.manual_tag,
          value: it.count,
        };
      });
      this.optionPie.series[0].data = setData;
      //   console.log(this.optionPie);
      //   console.log(res2);
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>

<style lang="scss" scoped>
.chart-line {
  padding: 0 10px;
  display: flex;
  .chart-row {
    flex: 1;
    padding: 10px;
  }
}
.analysis {
  padding: 0 10px;
  h1 {
    padding: 10px 20px;
    border-bottom: solid 1px #ddd;
  }
}
</style>

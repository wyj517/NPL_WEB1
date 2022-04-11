<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import * as echarts from "echarts";
import { on, off } from "@/utils/index";
export default {
  data() {
    return {
      dom: null,
    };
  },
  props: ["option"],
  methods: {
    resize() {
      this.dom.resize();
    },
    initEcharts() {
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(this.option);
        on(window, "resize", this.resize);
      });
    },
  },
  mounted() {
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
  watch: {
    option: {
      handler(newVal) {
        if(newVal){
            this.initEcharts()
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
.charts {
  height: 400px;
}
</style>

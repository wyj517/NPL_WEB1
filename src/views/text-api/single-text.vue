<template>
  <section class="con">
    <div class="con-body">
      <div class="text-top">
        <div class="test-btn" @click="inifData">测试</div>
        <el-select v-model="scheme" class="scheme-input" placeholder="Select" size="small">
          <el-option label="xgboost" value="xgboost" />
          <el-option label="lightgbm" value="lightgbm" />
        </el-select>
        <input type="text" class="text-input" v-model="text" placeholder="输入测试语料" />
      </div>
      <div class="text-moudle">
        <h3>测试结果</h3>
        <div class="m-body">
          <div class="code-box json-format" v-if="resultHtml">
            <pre v-html="resultHtml"></pre>
          </div>
          <div class="no-result" v-else>
            <img src="@/assets/no-result.png" />
            <p>暂无结果</p>
          </div>
        </div>
      </div>
      <div class="text-moudle">
        <h3>⽂本分类接⼝协议</h3>
        <div class="m-body">
          <iframe src="/iframe/single-text.html" frameborder="0" width="100%" height="440px"></iframe>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import { getApi } from "@/api/database";
import { syntaxHighlight } from "@/utils/index.js"
export default {
  data() {
    return {
      text: "",
      scheme: "xgboost",
      resultHtml: ""
    }
  },
  methods: {
    async inifData() {
      let res = await getApi("hotline/submit_single", { doc: this.text, scheme: this.scheme })
      this.resultHtml = syntaxHighlight(res)
      // console.log(this.resultHtml);
      // console.log(res);
    }
  },
  mounted() {
  },
}
</script>


<style lang="scss" scoped>
.con {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background: #f0f2f8;
  height: 100%;
  overflow: auto;

  .con-body {
    width: 860px;
    margin: 10px auto;
    background: white;
    padding: 10px 95px;
    height: 100%;
  }

  .text-top {
    width: 100%;
    height: 40px;
    background: #EFF7F3;
    box-shadow: inset 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    position: relative;

    .text-input {
      text-align: center;
      width: 90%;
      height: 40px;
      border: none;
      outline: none;
      background: none;
    }

    .scheme-input {
      position: absolute;
      width: 100px;
      top: 4px;
      right: 100px;
    }

    .test-btn {
      width: 86px;
      height: 32px;
      line-height: 32px;
      background: linear-gradient(360deg, #00BF9B 0%, #A5F0C4 100%);
      border-radius: 16px;
      color: white;
      text-align: center;
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }

  }

  .text-moudle {
    margin-top: 20px;
    margin-bottom: 20px;
    h3 {
      font-size: 14px;
      margin-bottom: 10px;
      text-indent: 1em;
      position: relative;

      &::before {
        content: " ";
        width: 6px;
        height: 14px;
        background: #00BF9B;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }

    .m-body {
      padding: 5px;
      border-radius: 2px;
      border: 1px solid #C1CCC8;

      .no-result {
        text-align: center;
        padding: 50px 0;
      }

      .normal-result {
        padding: 20px 30px;

        p {
          line-height: 1.5;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 4px;
          margin-top: 4px;

          tr.header {
            background: #f8f8f8;
            font-weight: bold;
          }

          td {
            line-height: 2em;
            min-width: 24px;
            border: 1px solid #d4d4d4;
            padding: 5px;
            padding-top: 7px;
            padding-bottom: 7px;
            vertical-align: top;
            font-size: 12px;
          }
        }

        h4 {
          margin: 10px 0 10px 0;
          font-size: 16px;
          position: relative;
          text-indent: 1em;

          &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-left: 7px solid #fabf1d;
            border-bottom: 7px solid transparent;
          }
        }
      }
    }
  }
}
</style>
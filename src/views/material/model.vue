<template>
  <section>
    <div class="header-info">模型数量：<span>{{ modelList.length }}</span>个</div>
    <div class="body-info">
      <ul>
        <li v-for="(item, index) in modelList" :key="index">
          <dl class="in">
            <div class="header">
              <h3>{{ '模型' + (index + 1) }}</h3>
            </div>
            <div class="li-body">
              <dd>
                <h4><img src="@/assets/model-icon1.png" />模型参数</h4>
                <p>algorithm:{{ item.algorithm }}</p>
                <p>booster:{{ item.booster }}</p>
                <p>colsample_bytree:{{ item.colsample_bytree }}</p>
                <p>eta:{{ item.eta }}</p>
                <p>gamma:{{ item.gamma }}</p>
                <p>lambda:{{ item.lambda }}</p>
                <p>max_depth:{{ item.max_depth }}</p>
                <p>min_child_weight:{{ item.min_child_weight }}</p>
                <p>num_class:{{ item.num_class }}</p>
                <p>objective:{{ item.objective }}</p>
                <p>seed:{{ item.seed }}</p>
                <p>subsample:{{ item.subsample }}</p>

              </dd>
              <dd>
                <h4><img src="@/assets/model-icon2.png" />训练语料</h4>
                <p>count:{{ item.count }}</p>
                <p>distribution</p>
                <div class="distribution">
                  <p v-for="(li, i) in item.distribution" :key="i">
                    {{ i }}：{{ li }}
                  </p>
                </div>
              </dd>
            </div>
          </dl>
        </li>

      </ul>
    </div>
  </section>
</template>

<script>
import { getApi } from "@/api/database";
export default {
  data() {
    return {
      modelList: []
    }
  },
  methods: {
    async inifData() {
      let res = await getApi("model/details")
      this.modelList = res.data
      console.log(res);
    }
  },
  mounted() {
    this.inifData()
  },
}
</script>

<style lang="scss" scoped>
.header-info {
  padding: 15px 30px;

  span {
    color: #00bf9b;
  }
}

.body-info {
  ul {
    background: #f0f2f8;
    padding: 20px;
    padding-right: 0;
    padding-bottom: 20px;
    width: 100%;

    li {
      display: inline-block;
      list-style-type: none;
      width: 50%;
      margin-bottom: 20px;

      .distribution {
        padding-left: 10px;
      }

      .in {
        padding: 20px;
        background: white;
        margin-right: 20px;
        border-radius: 5px;

        .header {
          margin-bottom: 10px;

          h3 {
            width: 180px;
            height: 30px;
            background: #00BF9B;
            padding-left: 10px;
            line-height: 30px;
            color: white;
            font-weight: normal;
            font-size: 16px;
            position: relative;

            &:before {
              content: ' ';
              position: absolute;
              right: -15px;
              width: 0;
              height: 0;
              border-top: 15px solid transparent;
              border-left: 15px solid #00BF9B;
              border-bottom: 15px solid transparent;
            }
          }


        }

        .li-body {
          display: flex;

          img {
            vertical-align: middle;
            margin-right: 10px;
          }

          dd {
            flex: 1;
            background: #F6FAFD;
            padding: 16px;
            padding-left: 0;
            min-height: 226px;

            &:first-child {
              margin-right: 10px;
              background: #F4F7F6;
            }

            p {
              padding-left: 16px;
              line-height: 25px;
            }

            h4 {
              line-height: 40px;
              padding: 0 16px;
              margin-bottom: 10px;
              width: 150px;
              font-size: 14px;
              background: white;
            }
          }

        }
      }
    }
  }
}
</style>
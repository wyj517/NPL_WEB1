<template>
  <section class="params-box">
    <h3>节点属性</h3>
    <ul>
      <li v-if="selectNode.properties.type == 'wf_corpus'">
        <p>数据集：</p>
        <el-select
          v-model="datsetId"
          placeholder="请选择数据集"
          @change="updateParams($event, 1)"
        >
          <el-option
            v-for="item in datasetOptions"
            :key="item.id"
            :label="item.datas_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </li>
      <li v-if="selectNode.properties.type == 'wf_segment'">
        <p>分词类型数量：</p>
        <p>
          <el-input
            v-model="segmentInt"
            type="Number"
            @change="updateParams($event, 2)"
          />
        </p>
      </li>
      <li v-if="selectNode.properties.type == 'wf_vector'">
        <p>向量化类型数量：</p>
        <p>
          <el-input
            v-model="vectorInt"
            type="Number"
            @change="updateParams($event, 2)"
          />
        </p>
      </li>
      <li v-if="selectNode.properties.type == 'wf_classify'">
        <p>文本分类类型数量：</p>
        <p>
          <el-input
            v-model="classifyInt"
            type="Number"
            @change="updateParams($event, 2)"
          />
        </p>
      </li>
      <li v-if="selectNode.properties.type == 'wf_cluster'">
        <p>文本聚类类型数量：</p>
        <p>
          <el-input
            v-model="clusterInt"
            type="Number"
            @change="updateParams($event, 2)"
          />
        </p>
      </li>
      <li v-if="selectNode.properties.type == 'wf_combineAna'">
        <p>文本分析类型数量：</p>
        <p>
          <el-input
            v-model="combineAna"
            type="Number"
            @change="updateParams($event, 2)"
          />
        </p>
      </li>
      <li v-if="selectNode.properties.type == 'wf_keyword'">
        <p>关键字提取类型数量：</p>
        <p>
          <el-input
            v-model="keyword.num"
            type="Number"
            @change="updateParams($event, 6)"
          />
        </p>
        <p>关键字提取SCHEME：</p>
        <p>
          <el-select
            v-model="keyword.scheme"
            placeholder="请选择SCHEME"
            @change="updateParams($event, 6)"
          >
            <el-option label="tfidf" value="tfidf"> </el-option>
          </el-select>
        </p>
      </li>

      <li v-if="selectNode.properties.type == 'wf_ner'">
        <p>NER:</p>
        <p>
          <el-select
            v-model="arrNer"
            placeholder="请选择分词类型"
            multiple
            @change="updateParams($event, 4)"
          >
            <el-option
              v-for="(item, index) in wordOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </p>
      </li>
      <li v-if="selectNode.properties.type == 'wf_filter'">
        <p>过滤节点选择必填项:</p>
        <el-checkbox-group
          v-model="arrFilter"
          @change="updateParams($event, 5)"
        >
          <el-checkbox
            v-for="(item, index) in filterOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-checkbox-group>
      </li>
      <li v-if="selectNode.properties.type == 'wf_combine'">
        <p>数据合并参数:</p>
        <el-form
          label-position="right"
          label-width="100px"
          :model="formCombine"
        >
          <div
            class="db-item"
            v-for="(item, index) in formCombine.combineList"
            :key="index"
          >
            <el-form-item label="数据库类型">
              <el-select v-model="item.dbtype" placeholder="请选择数据库类型">
                <el-option label="mysql" value="mysql"></el-option>
                <el-option label="oracle" value="oracle"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库地址">
              <el-input v-model="item.host"></el-input>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="item.port"></el-input>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="item.user"></el-input>
            </el-form-item>
            <el-form-item label="数据库库名">
              <el-input v-model="item.db"></el-input>
            </el-form-item>
            <el-form-item label="数据库表名">
              <el-input v-model="item.table"></el-input>
            </el-form-item>
            <el-form-item label="where语句">
              <el-input v-model="item.sql" type="textarea"></el-input>
            </el-form-item>
            <el-button @click.prevent="removeDomain(item)" size="small"
              >删除</el-button
            >
          </div>
        </el-form>
        <el-button type="primary" @click="addCombine" size="small"
          >新增</el-button
        >
      </li>
    </ul>
  </section>
</template>

<script>
import { getApi } from "@/api/database";
import { findProType } from "./index";
export default {
  name: "property",
  props: ["selectNode", "nodeData"],
  data() {
    return {
      datsetId: "",
      segmentInt: "",
      vectorInt: "",
      classifyInt: "",
      clusterInt: "",
      combineAna: {},
      keyword:{},
      datasetOptions: [],
      arrNer: [],
      arrFilter: [],
      wordOptions: ["PER", "LOC", "TIME", "ORG"],
      filterOptions: [],
      formCombine: { combineList: [{ dbtype: "mysql" }] },
    };
  },
  watch: {
    selectNode(newValue) {
      console.log("selectNode", newValue);

      let properties = newValue.properties;
      let type = newValue.properties.type
      if(type == "wf_corpus"){
          this.datsetId = properties.dataset_id
      }else if (type == "wf_segment" ) {
          this.segmentInt = properties.num
      }else if(type == "wf_vector"){
          this.vectorInt = properties.num
      }else if(type == "wf_classify"){
        this.classifyInt = properties.num
      }else if(type == "wf_cluster"){
        this.clusterInt = properties.num
      }else if(type == "wf_combineAna"){
        this.combineAna = properties.num
      }else if (type =="wf_keyword") {
        this.keyword = properties 
      }else if (type =="wf_ner") {
        this.arrNer = properties.typeList
      }else if(type == "wf_filter"){
        this.arrFilter =[]
        properties.filters=properties.filters || []
        properties.filters.map(item=>{
          if (item.isNull == 1) {
            this.arrFilter.push(item.field)
          }
        })
      }else if(type == "wf_combine"){
        this.formCombine.combineList= properties.combineList || []
      }

    // 获取下拉类别
      if (type == "wf_filter" || type == "wf_combine") {
        this.getFilterOptions(newValue.id);
      }
    },
    formCombine: {
      deep: true,
      handler(updateData) {
        let tempStr = JSON.stringify(updateData.combineList);
        let combineList = JSON.parse(tempStr);
        this.$parent.updateProperty(this.selectNode.id, { combineList });
      },
    },
  },
  methods: {
    async getFilterOptions(id) {
      let proType = findProType(id, this.nodeData);
      if (proType) {
        let { data } = await getApi("task/getFilterField", {
          pre_type: proType,
        });
        this.filterOptions = data;
      }
    },
    addCombine() {
      console.log(this.formCombine.combineList);
      this.formCombine.combineList.push({ dbtype: "mysql" });
      console.log(this.formCombine.combineList);
    },
    removeDomain(item) {
      var index = this.formCombine.combineList.indexOf(item);
      if (index !== -1) {
        this.formCombine.combineList.splice(index, 1);
      }
    },
    async getDataSet() {
      // 加载数据源表
      let res = await getApi("datas/get_datas", { total_flg: false });
      this.datasetOptions = res.data;
      // console.log(res);
    },
    async updateParams(value, type) {
      let updateData = {};
      // console.log(value, type);
      let keyName = "";
      if (type == 1) {
        keyName = "dataset_id";
        updateData[keyName] = value;
      } else if (type == 2) {
        keyName = "num";
        updateData[keyName] = value;
      } else if (type == 3) {
        updateData = this.combineAna;
      } else if (type == 6) {
        // 关键字获取
        keyword = this.keyword;
      }
      else if (type == 4) {
        updateData.typeList = value;
      } else if (type == 5) {
        console.log(value);
        let arrField = this.filterOptions.map((item) => {
          return {
            field: item,
            isNull: 0,
          };
        });
        arrField.map((item) => {
          value.map((li) => {
            if (item.field == li) {
              item.isNull = 1;
            }
          });
        });
        updateData.filters = arrField;
      }
      console.log(updateData, "updateData");
      this.$parent.updateProperty(this.selectNode.id, updateData);
    },
  },
  mounted() {
    console.log("this.nodeData", this.nodeData);
    this.getDataSet();
  },
};
</script>

<style lang="scss">
.params-box {
  h3 {
    font-size: 16px;
    padding: 10px 0;
    border-bottom: solid 1px #dcdfe6;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    margin: 5px;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      margin-top: 10px;
    }
  }
}
</style>

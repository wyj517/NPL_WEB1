<template>
  <section class="con-flow">
    <h3>添加流程图</h3>
    <ul>
      <li @click="routeToNewFlow(1)">
        <div><img src="../../assets/flow-plus.jpg"/></div>
        <p>新建空白流程图</p>
      </li>
      <li @click="routeToNewFlow(2)">
        <div><img src="../../assets/flow-m1.jpg"/></div>
        <p>典型分析</p>
      </li>
      <li @click="routeToNewFlow(3)">
        <div><img src="../../assets/flow-m2.jpg"/></div>
        <p>分词分析</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods:{
        routeToNewFlow(index){
             this.$router.push({name:"TaskFlow",query:{type:index}})
        }

    }
};
</script>

<style lang="scss" scoped>
.con-flow {
  padding: 10px;
  h3 {
    font-size: 18px;
    padding-left: 50px;
  }
  ul li {
    display: inline-block;
    margin-right: 40px;
    cursor: pointer;
    div {
      width: 180px;
      height: 180px;
      border: solid 1px #d7d9de;
      font-size: 100px;
      text-align: center;
      line-height: 180px;
      img{
          width: 100%;
          height: 100%;
      }
      &:hover{
          box-shadow: 5px 5px 10px #d8d8d8;
      }
    }
    p {
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>

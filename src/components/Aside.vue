<template>
  <el-menu :default-openeds="['1', '3']" style="min-height:100%;overflow-x: hidden"
           background-color="rgb(40,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router

           >
    <div style="height: 60px;line-height: 60px;text-align: center">
      <img src="../assets/logo.png" alt="" style="width:20px;position:relative;top:5px;margin-right: 5px">
      <b style="color: aliceblue" v-show="logoTextShow">商业管理系统</b>

    </div>


    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>



    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">商城管理</span>
      </template>


        <el-menu-item index="/mallPayLog">
          <i class="el-icon-s-custom"></i>
          <span slot="title">支付记录</span>
        </el-menu-item>

        <el-menu-item index="/mallOrderGoods">
          <i class="el-icon-s-custom"></i>
          <span slot="title">订单商品</span>
        </el-menu-item>

        <el-menu-item index="/mallRefundTrace">
          <i class="el-icon-s-custom"></i>
          <span slot="title">退款跟踪</span>
        </el-menu-item>

        <el-menu-item index="/mallSearchHistory">
          <i class="el-icon-s-custom"></i>
          <span slot="title">搜索历史</span>
        </el-menu-item>

        <el-menu-item index="/mallTopic">
          <i class="el-icon-s-custom"></i>
          <span slot="title">专题列表</span>
        </el-menu-item>


    </el-submenu>

  </el-menu>

</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse:Boolean,
    logoTextShow:Boolean
  },
  methods:{
     handleSelect(index){
      console.log(index)
      console.log(this.$router.options.routes)
     }
  }
}
</script>

<style scoped>

</style>
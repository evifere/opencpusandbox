<template>
  <el-container>
    <el-header>
    Headers
    </el-header>
    <el-main>
      dashboardlab
    </el-main>
    <el-footer align="right">copyright 2018-2019 @dashboardlab v{{version}}</el-footer>
  </el-container>
</template>

<script scoped>
import { version } from "../../package.json";

export default {
  name: "Dashboard",
  props: {
    msg: String
  },

  data() {
    return {
     
      version: version,
    };
  },
  created(){
    console.log('axios',this.$http)
  }
};
</script>

<template >
  <el-container>
    <el-container>
      <Sidebar></Sidebar>

      <el-main>
        <el-row>
          <el-col :span="24" >
            <highcharts
              :options="chartOptions"
            ></highcharts>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-footer align="right">copyright 2018-2019 @dashboardlab v{{version}}</el-footer>
  </el-container>
</template>

<script scoped>
import { version } from "../../package.json";
import { Chart } from "highcharts-vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "Linechart",
  components: {
    highcharts: Chart,
    Sidebar
  },

  data() {
    return {
      version:version,
      chartOptions: require("../config/linechart")
    };
  }
};
</script>

<template >
  <el-container>
    <el-container>
      <Sidebar></Sidebar>

      <el-main>
        <el-row>
          <el-col :span="24" v-show="candleStickOptions.series[0].data.length>0">
            <highcharts
              :constructor-type="'stockChart'"
              :options="candleStickOptions"
              v-if="candleStickOptions.series[0].data.length>0"
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
  name: "Candlestick",
  components: {
    highcharts: Chart,
    Sidebar
  },

  data() {
    return {
      version:version,
      candleStickOptions: require("../config/candlestick")
    };
  }
};
</script>

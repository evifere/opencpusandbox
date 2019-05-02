<template>
  <el-container>
    <el-header>Headers</el-header>
    <el-container>
      <el-aside width="128px">
        <el-menu class="el-menu-vertical-demo" @select="handleVerticalMenu" :collapse="isCollapse">
          <el-menu-item index="candlestick">
            <img :src="'icons/candlestick.png'" width="48" height="48">
          </el-menu-item>
          <el-menu-item index="combo-chart">
            <img :src="'icons/combo-chart.png'" width="48" height="48">
          </el-menu-item>
          <el-menu-item index="line-chart">
            <img :src="'icons/line-chart.png'" width="48" height="48">
          </el-menu-item>
          <el-menu-item index="pie-chart">
            <img :src="'icons/pie-chart.png'" width="48" height="48">
          </el-menu-item>
          <el-menu-item index="histogram">
            <img :src="'icons/histogram.png'" width="48" height="48">
          </el-menu-item>
          <el-menu-item index="histogram2">
            <img :src="'icons/histogram2.png'" width="48" height="48">
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="8">
            <highcharts :options="chartOptions"></highcharts>
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

export default {
  name: "Dashboard",
  components: {
    highcharts: Chart
  },
  props: {
    msg: String
  },

  data() {
    return {
      version: version,
      isCollapse: false,
      chartOptions: {
        series: [
          {
            data: [1, 2, 3] // sample data
          }
        ]
      }
    };
  },

  created() {
    this.$http
      .get(
        "http://localhost/ocpu/user/opencpu/library/mysamplepack/R/test/json"
      )
      .then(response => {
        this.chartOptions = response.data;
      });
  },

  methods: {
    handleVerticalMenu(key, keyPath) {
      console.log("handleVerticalMenu", key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-vertical-demo {
min-height: 53em;
}
</style>
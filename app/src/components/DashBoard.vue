<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-menu-item index="4">Analyse Center</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">Danone</el-menu-item>
          <el-menu-item index="2-2">Lactalis</el-menu-item>
          <el-menu-item index="2-3">Miam miam burger</el-menu-item>
        </el-submenu>
        <el-menu-item index="5" >Results</el-menu-item>
        <el-submenu index="6" class="right-menu-item">
          <template slot="title"><img :src="'icons/female-profile.png'" width="48" height="48">User Account</template>
          <el-menu-item index="6-1">Logout</el-menu-item>
          <el-menu-item index="6-2">Settings</el-menu-item>
        </el-submenu>
 
      </el-menu>
    </el-header>
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
          <el-menu-item index="line-graphic">
            <img :src="'icons/line-graphic.png'" width="48" height="48">
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
      activeIndex:1,
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

.el-menu--horizontal > .el-submenu.right-menu-item {
  float: right;
}
</style>
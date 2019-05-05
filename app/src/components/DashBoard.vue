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
          <el-menu-item index="2-1">Yanone</el-menu-item>
          <el-menu-item index="2-2">Milktalis</el-menu-item>
          <el-menu-item index="2-3">Miam miam burger</el-menu-item>
        </el-submenu>
        <el-menu-item index="5">Results</el-menu-item>
        <el-submenu index="6" class="right-menu-item">
          <template slot="title">
            <img :src="'icons/female-profile.png'" width="48" height="48">User Account
          </template>
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
          <el-col :span="8">
            <highcharts :options="chartOptions"></highcharts>
          </el-col>
          <el-col :span="8">
            <highcharts :options="chartOptions"></highcharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <highcharts :options="histogramOptions"></highcharts>
          </el-col>
          <el-col :span="8">
            <highcharts :options="chartPieOptions"></highcharts>
          </el-col>
          <el-col :span="8">
            <highcharts :options="histogramUniformOptions"></highcharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <highcharts :options="comboChartOptions"></highcharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-show="candleStickOptions.series[0].data.length>0">
            <high-stock
              :key="'AAPL Stock Price'"
              :options="candleStickOptions"
              v-if="candleStickOptions.series[0].data.length>0"
            ></high-stock>
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
import highstock from "highcharts/highstock";
import vueHightstock from "vue-highstock";

export default {
  name: "Dashboard",
  components: {
    highcharts: Chart,
    highStock: vueHightstock(highstock, {
      // highstock global options here
    })
  },
  props: {
    msg: String
  },

  data() {
    return {
      version: version,
      isCollapse: false,
      activeIndex: "5",
      chartOptions: {
        series: [
          {
            data: [3, 5, 7] // sample data
          }
        ]
      },
      randomSeries: [],
      candleStickOptions: require("../config/candlestick"),
      histogramOptions: require("../config/histo"),
      histogramUniformOptions: require("../config/unifhisto"),
      chartPieOptions: require("../config/pie"),
      comboChartOptions: require("../config/combo")
    };
  },

  created() {
    let _self = this;
    this.$http
      .get(
        process.env.VUE_APP_API_BASE_URI +
          "ocpu/user/opencpu/library/mysamplepack/R/test/json"
      )
      .then(response => {
        this.chartOptions = response.data;
      });

    this.$http
      .post(
        process.env.VUE_APP_API_BASE_URI +
          "/ocpu/user/opencpu/library/chartreader/R/randomplot2",
        {
          n: 1000,
          dist: "normal"
        }
      )
      .then(response => {
        let resultUrl =
          process.env.VUE_APP_API_BASE_URI +
          response.data.split("\n")[0] +
          "/json";

        _self.$http.get(resultUrl).then(response => {
          this.histogramOptions.series[0].data = response.data.counts;
          this.histogramOptions.series[0].breaks = response.data.breaks;
        });
      });

    this.$http
      .post(
        process.env.VUE_APP_API_BASE_URI +
          "/ocpu/user/opencpu/library/chartreader/R/randomplot2",
        {
          n: 1000,
          dist: "uniform"
        }
      )
      .then(response => {
        let resultUrl =
          process.env.VUE_APP_API_BASE_URI +
          response.data.split("\n")[0] +
          "/json";
        _self.$http.get(resultUrl).then(response => {
          this.histogramUniformOptions.series[0].data = response.data.counts;
          this.histogramUniformOptions.series[0].breaks = response.data.breaks;
        });
      });

    this.$http
      .post(
        process.env.VUE_APP_API_BASE_URI +
          "/ocpu/user/opencpu/library/chartreader/R/randompie",
        {
          n: 10
        }
      )
      .then(response => {
        let resultUrl =
          process.env.VUE_APP_API_BASE_URI +
          response.data.split("\n")[0] +
          "/json";
        _self.$http.get(resultUrl).then(response => {
          this.chartPieOptions.series[0].data = response.data.series.map(
            (el, i) => {
              return { y: el, name: "pie n = " + i };
            }
          );
        });
      });

    this.$http
      .post(
        process.env.VUE_APP_API_BASE_URI +
          "/ocpu/user/opencpu/library/chartreader/R/randomfruits",
        {
          n: 10
        }
      )
      .then(response => {
        let resultUrl =
          process.env.VUE_APP_API_BASE_URI +
          response.data.split("\n")[0] +
          "/json";
        _self.$http.get(resultUrl).then(response => {
          console.log(response.data);
        });
      });
    this.$http
      .get(process.env.VUE_APP_BASE_URI + "aapl-ohlc.json")
      .then(response => {
        this.candleStickOptions.series[0].data = response.data;
      });
  },

  methods: {
    handleVerticalMenu(key, keyPath) {
      console.log("handleVerticalMenu", key, keyPath);
    },
    handleSelect() {
      console.log("handleSelect");
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
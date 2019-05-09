<template >
  <el-container>
    <el-container>
    <Sidebar></Sidebar>

      <el-main>
        <el-row>
          <el-col :span="24">
            <highcharts :options="boxplotOptions"></highcharts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <highcharts :options="chartFruitsOptionsA"></highcharts>
          </el-col>
          <el-col :span="8">
            <highcharts :options="chartFruitsOptionsB"></highcharts>
          </el-col>
          <el-col :span="8">
            <highcharts :options="chartFruitsOptionsC"></highcharts>
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
  name: "Dashboard",
  components: {
    highcharts: Chart,
    Sidebar
  },

  data() {
    return {
      version: version,
      isCollapse: false,
      chartFruitsOptionsA: {},
      chartFruitsOptionsB: {},
      chartFruitsOptionsC: {},
      randomSeries: [],
      candleStickOptions: require("../config/candlestick"),
      histogramOptions: require("../config/histo"),
      histogramUniformOptions: require("../config/unifhisto"),
      chartPieOptions: require("../config/pie"),
      comboChartOptions: require("../config/combo"),
      boxplotOptions: require("../config/boxplot")
    };
  },

  created() {
    this.loadRandomplots(
      {
        n: 1000,
        dist: "normal"
      },
      "histogramOptions"
    );
    this.loadRandomplots(
      {
        n: 1000,
        dist: "uniform"
      },
      "histogramUniformOptions"
    );
    this.loadRandompie();
    this.loadRandomFruits("chartFruitsOptionsA");
    this.loadRandomFruits("chartFruitsOptionsB");
    this.loadRandomFruits("chartFruitsOptionsC");
    this.loadCandlestick();
    this.loadBoxplotCars();
  },

  methods: {
    loadRandomFruits(optionKeyname) {
      let _self = this;

      this.$http
        .post(
          process.env.VUE_APP_API_BASE_URI +
            "/ocpu/user/opencpu/library/chartreader/R/randomfruits",
          {
            n: 3
          }
        )
        .then(response => {
          let resultUrl =
            process.env.VUE_APP_API_BASE_URI +
            response.data.split("\n")[0] +
            "/json?auto_unbox=true";
          _self.$http.get(resultUrl).then(response => {
            _self[optionKeyname] = response.data;
          });
        });
    },
    loadCandlestick() {
      this.$http
        .get(process.env.VUE_APP_BASE_URI + "aapl-ohlc.json")
        .then(response => {
          this.candleStickOptions.series[0].data = response.data;
        });
    },
    loadRandompie() {
      let _self = this;

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
    },
    loadRandomplots(data, key) {
      let _self = this;

      this.$http
        .post(
          process.env.VUE_APP_API_BASE_URI +
            "/ocpu/user/opencpu/library/chartreader/R/randomplot2",
          data
        )
        .then(response => {
          let resultUrl =
            process.env.VUE_APP_API_BASE_URI +
            response.data.split("\n")[0] +
            "/json?auto_unbox=true";
          _self.$http.get(resultUrl).then(response => {
            this[key].series[0].data = response.data.counts;
            this[key].series[0].breaks = response.data.breaks;
          });
        });
    },
    loadBoxplotCars() {
      let _self = this;

      this.$http
        .post(
          process.env.VUE_APP_API_BASE_URI +
            "/ocpu/user/opencpu/library/chartreader/R/boxplotcars"
        )
        .then(response => {
          let resultUrl =
            process.env.VUE_APP_API_BASE_URI +
            response.data.split("\n")[0] +
            "/json?auto_unbox=true";
          _self.$http.get(resultUrl).then(response => {
            // cf https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html
            //https://www.tutorialspoint.com/r/r_boxplots.htm
            //stats
            //a vector of length 5, containing the extreme of the lower whisker, the lower ‘hinge’, the median, the upper ‘hinge’ and the extreme of the upper whisker.

            this.boxplotOptions.xAxis.categories = response.data.names;
            this.boxplotOptions.series[0].data = response.data.stats;
            this.boxplotOptions.series[1].data = response.data.out;
          });
        });
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
<template >
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        v-if="isConnected"
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
          <el-menu-item index="6-1" @click="onLogout">Logout</el-menu-item>
          <el-menu-item index="6-2">Settings</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container v-if="isConnected">
      <el-aside width="128px" v-if="isConnected">
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
    <el-footer v-if="isConnected" align="right">copyright 2018-2019 @dashboardlab v{{version}}</el-footer>
    <!-- login form -->
    <el-main class="login_form" v-if="!isConnected">
      <el-row>
        <el-col :span="24">
          <fieldset class="one-edge-shadow">
            <legend><img :src="'icons/logo.png'" width="48" height="48"><span>Welcome to dashboardlab</span></legend>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="Login">
                <el-input v-model="form.login"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onLogin">Login</el-button>
                <el-button>Cancel</el-button>
              </el-form-item>

              <el-alert
                title="Authentication failed"
                type="error"
                description="Please try again"
                close-text="Gotcha"
                v-show="loggedAttempFailed"
                show-icon
              ></el-alert>
            </el-form>
          </fieldset>
        </el-col>
      </el-row>
    </el-main>
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
      activeIndex: "5",
      chartFruitsOptionsA: {},
      chartFruitsOptionsB: {},
      chartFruitsOptionsC: {},
      randomSeries: [],
      candleStickOptions: require("../config/candlestick"),
      histogramOptions: require("../config/histo"),
      histogramUniformOptions: require("../config/unifhisto"),
      chartPieOptions: require("../config/pie"),
      comboChartOptions: require("../config/combo"),
      boxplotOptions: require("../config/boxplot"),
      isConnected: false,
      loggedAttempFailed: false,
      form: {
        login: "",
        password: ""
      }
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
    handleVerticalMenu(key, keyPath) {
      console.log("handleVerticalMenu", key, keyPath);
    },
    handleSelect() {
      console.log("handleSelect");
    },
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
    },
    onLogin() {
      if (
        this.form.login === "bigdata" &&
        this.form.password == "datascience"
      ) {
        this.isConnected = true;
        this.$message("Authentication succeed");
      } else {
        this.loggedAttempFailed = true;
      }
    },
    onLogout() {
      this.isConnected = false;
      this.$message("Good bye");
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

.login_form {
  margin-top: 10%;
  position: absolute;
  margin-left: 40%;
}

.one-edge-shadow {
  -webkit-box-shadow: 0 8px 6px -6px black;
  -moz-box-shadow: 0 8px 6px -6px black;
  box-shadow: 0 8px 6px -6px black;
}

legend {
  font-weight: bolder;
  font-size: 18px;
}
legend img {
      vertical-align: middle;
}
</style>
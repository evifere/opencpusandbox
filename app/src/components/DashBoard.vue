<template>
  <el-container>
    <el-header>Headers</el-header>
    <el-main>
      <el-row>
        <el-col :span="12">
          <highcharts :options="chartOptions"></highcharts>
        </el-col>
      </el-row>
    </el-main>
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
  }
};
</script>

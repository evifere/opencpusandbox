 <template>
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
</template>
<script scoped>
export default {
  name: "Sidebar",

  data() {
    return {
      isCollapse: false,
    };
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
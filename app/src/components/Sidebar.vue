 <template>
  <el-aside width="128px">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @select="handleVerticalMenu"
      :collapse="isCollapse"
    >
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
      isCollapse: false
    };
  },

  computed: {
    activeIndex: {
      get() {
        return localStorage.getItem("activeIndex");
      },
      set(value) {
        localStorage.setItem("activeIndex", value);
      }
    }
  },
  methods: {
    handleVerticalMenu(key, keyPath) {
      this.activeIndex = key;
      this.$router.push({ path: "/" + key });
    }
  }
};
</script>

<style>
.el-menu-vertical-demo {
  min-height: 53em;
}

.el-menu-item.is-active img {
  border-radius: 5px 20px 5px;
  padding: 0.2em;
  background-color: rgb(31, 189, 176);
}
</style>
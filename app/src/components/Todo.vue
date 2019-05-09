<template >
  <el-container>
      <Sidebar></Sidebar>

      <el-main>
        <el-row>
          <el-col :span="24">
            TO DO 
          </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script scoped>
import { version } from "../../package.json";
import Sidebar from "./Sidebar.vue";

export default {
  name: "Todo",

  components: {
    Sidebar
  },
  data() {
    return {
      version: version,
    };
  },

  methods: {
    handleVerticalMenu(key, keyPath) {
      console.log("handleVerticalMenu", key, keyPath);
    },
    handleSelect() {
      console.log("handleSelect");
    },
    onLogout() {
      this.isConnected = false;
      localStorage.removeItem("isConnected");
      console.log("onLogout");
      this.$message("Good bye");
      location.reload(true);
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
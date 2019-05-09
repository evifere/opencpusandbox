<template>
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
        <el-menu-item index="5"  @click="onDashboard()">Dashboard</el-menu-item>
        <el-submenu index="6" class="right-menu-item">
          <template slot="title">
            <img :src="'icons/female-profile.png'" width="48" height="48">User Account
          </template>
          <el-menu-item index="6-1" @click="onLogout()">Logout</el-menu-item>
          <el-menu-item index="6-2">Settings</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
</template>


<script scoped>

export default {
  name: "Navigation",

  data() {
    return {
      activeIndex: "5",
    };
  },

  methods: {
    handleSelect(key) {
      console.log("handleSelect",key);
    },
  
    onDashboard(){
      this.$router.push({ path: '/dashboard' })
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
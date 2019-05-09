<template >
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

export default {
  name: "Login",

  data() {
    return {
      version: version,
      isConnected: false,
      loggedAttempFailed: false,
      form: {
        login: "",
        password: ""
      }
    };
  },

  methods: {
    handleVerticalMenu(key, keyPath) {
      console.log("handleVerticalMenu", key, keyPath);
    },
    handleSelect() {
      console.log("handleSelect");
    },
    onLogin() {
      if (
        this.form.login === "bigdata" &&
        this.form.password == "datascience"
      ) {
        this.isConnected = true;
        localStorage.setItem('isConnected', JSON.stringify(this.isConnected));

        this.$router.push('/dashboard');
        this.$message("Authentication succeed");
      } else {
        this.loggedAttempFailed = true;
      }
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
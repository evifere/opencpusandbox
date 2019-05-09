<template>
  <div id="app">
    <Navigation v-if="!($route.path==='/login')"></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components:{
    Navigation
  }
}

</script>


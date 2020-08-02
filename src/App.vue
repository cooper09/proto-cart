<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Sonya</span>
        <span class="font-weight-light leftmargin hidden-sm-and-down" >VIRTUAL MALL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn
        text
        href="https://sonyainc.net/candles-cart/product-page.html"
        target="_blank"
      > 
        <span class="mr-2">Product Page</span>
      </v-btn> 
    </v-app-bar>
    <v-content   class="animated fadeIn">
      <p v-if="isVisible"><MainView /></p>
      <router-view></router-view>
    </v-content>
    <v-content transition="slide-x-transition">

    </v-content>

  </v-app>
</template>

<script>
import MainView from './views/MainView';

export default {
  name: 'App',
  components: {
    MainView
  },
  computed: {
    isVisible () {
      return this.$store.state.visible;
    }
  },
  data: () => ({
    //
  }),
};
</script>
<style>
body {
  padding: 2em;
}
.leftmargin {
  margin-left: 1em;
}
</style>

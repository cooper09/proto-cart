<template>
  <v-container   class="animated fadeIn container">
    <v-btn @click="nextPage()">Checkout</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  
  }),
  methods: {
    nextPage() {
      fbq('trackCustom', ' Submitted - Go To Checkout ');
      gtag('event', 'click', 'Submitted - Go To Checkout');
      this.$router.push('/checkout')
      this.$store.dispatch('hideMainView')
    }
  }
};//end export
</script>
<style scoped>
  .btn {
    background: #ddd;
    cursor: pointer;
  }
</style>

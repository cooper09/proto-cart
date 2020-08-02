<template>
  <v-container   class="animated fadeIn container">
    <v-btn color="primary" @click="nextPage()">Checkout</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  
  }),
  methods: {
    nextPage() {

      fbq('trackCustom', ' Candles - Checkout Button Submitted');
      gtag('event', 'Candles - Checkout Button Submitted', {
        event_category: "Candles",
        event_label : "Candles Checkout"
      });

      this.$router.push('/paypal')
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

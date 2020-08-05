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

      fbq('trackCustom', ' Vintium - Checkout Button Submitted');
      gtag('event', 'Vintium - Checkout Button Submitted', {
        event_category: "Vintium",
        event_label : "Vintium - Checkout"
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

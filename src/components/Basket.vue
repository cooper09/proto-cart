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

      fbq('trackCustom', 'Nohon - Checkout Button Submitted');
      gtag('event', 'Nogon - Checkout Button Submitted', {
        event_category: "Nohon",
        event_label : "Nohon Checkout"
      });

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

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

      fbq('trackCustom', ' Sonya Nohon - Checkout Button Submitted');
      gtag('event', 'Sonya Nohon - Checkout Button Submitted', {
        event_category: "Sonya Nohon",
        event_label : "Sonya Nohon Checkout"
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

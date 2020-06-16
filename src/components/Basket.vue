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

      fbq('trackCustom', 'Checkout Button Submitted');
      gtag('event', 'Checkout Button Submitted', {
        event_category: "Generic",
        event_label : "Generic Checkout"
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

<template>
  <v-container   class="animated fadeIn container">
    <v-btn @click="nextPage()" color="primary">Checkout</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  
  }),
  methods: {
    nextPage() {
      fbq('trackCustom', 'Sonya - Submitted - Go To Checkout ');
      //gtag('event', 'click', 'Sonya - Submitted - Go To Checkout');
      gtag('event', 'Sonya Event', {
          'event_action': 'Sonya - Submitted - Go To Checkout',
          'event_category': "Sonya - Event",
          'event_label': 'Sonya - Submitted - Go To Checkout'
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

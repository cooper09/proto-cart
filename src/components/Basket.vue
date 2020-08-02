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

      fbq('trackCustom', ' Dara - GemInI - Checkout Button Submitted');
      gtag('event', 'Dara - GemInI - Checkout Button Submitted', {
        event_category: "Dara - GemInI",
        event_label : "Dara - GemInI Checkout"
      });

    // cooper s - instead of my paypal page go to Dara's checkout page
      this.$router.push('/paypal')
      //window.open("https://www.daracarter.com/music/","_blank, directories=yes")
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

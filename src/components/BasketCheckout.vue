<template>
  <v-container   class="animated fadeIn container">
    <span class="right"><v-btn @click="showStore()">Back to Shop</v-btn></span>
  <br/></br>
    <div v-for="goodie in newCart" :key="id" >{{goodie.product.name}}
      quantity: {{goodie.quantity}}
      price: ${{goodie.product.price}}
       <span class="right"><v-btn @click="removeItem(goodie)">remove</v-btn></span>
      <br/><br/>
    </div>
    <br/><br/>
   </div>
   <div>Total: ${{total}} </div>
   <br/><br/>
   <v-btn class="btn" @click="payMethod()">Pay Now</v-btn>
   <br/><br/>
   <div ref="paypal"></div>
  </v-container>
</template>

<script>
import Cart from '@/helper/cart'

export default {
  computed:{
    selectedItem () {
      return this.$store.state.selected;
    },
    total() {
      return this.$store.state.total;
    },
    newCart() {
      return this.$store.state.cart
    }
  },
  data: () => ({

  }),
  methods: {
    nextPage() {
      this.$router.push('/paypal')
    },
    removeItem(item) {
      console.log("Remove following Item from cart: ", item);
      this.$store.dispatch('updateCart', item);
    },
    showStore() {
      //this.$router.push('/')
      this.$store.dispatch('showMainView')
    },
    payMethod() {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AYvEZYKAlTLeErYUz9KdH_2twNwANrX9gWVlmR3D16GHndWk0lcrSXfDjle3TF-1jdiwfKMyUslZIHrW"
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },//end payMethods
    // cooper s - once the paypal script is added to the page, time to go to work
    setLoaded: function() {
      console.log("Paypal loaded: ", this.newCart[0].product.name );
      this.loaded = true;
      window.paypal
            .Buttons({
              createOrder: (data, actions ) =>{
                console.log("PayPal Button: ", data );
                return  actions.order.create({
                  purchase_units: [
                    {
                      description: "TEST",
                      amount:{
                        currency_code: "USD",
                        value: 1
                      }
                    }
                  ]//end purchase units
                });//end order.create
              },//end createOrder 
              onApprove: async (data, actions ) =>{
                  const order = await actions.order.capture();
                  this.paidFor = true;
                  console.log("Payment approved: ", data.ID );
                  console.log("Payment info: ", JSON.stringify(data));

            //cooper s - reserve this for adding data to DB in the future
                // for now lets start fresh...
                this.$store.dispatch("showMainView");

              }//end onApprove
        })//end paypall Button
      .render(this.$refs.paypal )  
    },//setLoaded
  }//end methods
};//end export
</script>
<style scoped>
  .btn {
    background: #ddd;
    cursor: pointer;
  }
  .right {
    float: right;
  }
</style>

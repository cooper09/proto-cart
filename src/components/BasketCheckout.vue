<template>
  <v-container   class="animated fadeIn container">
    <span class="right"><v-btn @click="showStore()">Back to Shop</v-btn></span>
   BasketCheckout Page: 
      <br/><br/>
      new Cart: {{newCart}}
    <br/><br/>
    items: 
    <div v-for="goodie in newCart" :key="id" >{{goodie.product.name}}
      quantity: {{goodie.quantity}}
      price: ${{goodie.product.price}}
       <span class="right"><v-btn @click="removeItem(goodie)">remove</v-btn></span>
      <br/><br/>
    </div>
    <br/><br/>
   </div>
   <div>Total: ${{total}} </div>
   <v-btn class="btn" @click="payMethod()">Pay Now</v-btn>
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
      alert("In paymethod");
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AYvEZYKAlTLeErYUz9KdH_2twNwANrX9gWVlmR3D16GHndWk0lcrSXfDjle3TF-1jdiwfKMyUslZIHrW"
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },//end payMethods
    setLoaded: function() {
      console.log("PayPal - setLoaded this is: ", this.nane)
      alert("PayPal - setLoaded this is: "+ this)
        this.loaded = true;
        window.paypal
            .Buttons({
                createOrder: (data, actions ) => {
                    return actions.order.create({
                        purchase_units:[
                            {
                                description:'TEST', //this.name,
                                amount:{
                                    currency_code: "USD", 
                                    value:  1 //this.getQty
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions ) => {
                  const order = await actions.order.capture();
                  this.paidFor = true;
                  console.log("Payment approved: ", data.ID );
                  console.log("Payment info: ", JSON.stringify(data));

                  // cooper s - send captured data to DB
                  console.log("Send data to DB " , this.name , " address: ", this.address, " city: ", this.city," state: ", this.state, " zip: ", this.zip, " phone: ", this.phone, " email: ", this.email );

                  var timestamp = new Date();

                  var infoObj = {
                    orderId: data.orderID,
                    paymentId: data.paymentID,
                    payerId:data.payerID,
                    items: this.getCartItems,
                    amount:this.getQty,
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    state: this.state,
                    country: this.country,
                    zip: this.zip,
                    phone: this.phone,
                    email: this.email,
                    timestamp: timestamp
                  }

                console.log("PayPage sending data: ",  infoObj, " to database ");
                  const url = `https://sleepy-everglades-99189.herokuapp.com/beatcart`;

                  axios.post(url,infoObj)
                    .then(function (response) {
                      console.log("POST: ", response.data);
                    //clear fields
                    })
                    .catch(function (error) {
                      console.log("POST Error: ",  error);
                    }); 

              this.$store.dispatch("clearCart");
              //this.$router.push('/')
              
        }// on Approval
      })//end windows.paypal.Buttons
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

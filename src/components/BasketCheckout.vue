<template>
  <v-container   class="animated fadeIn container">

        <v-card-actions class="right">
            <v-btn color="primary"  @click="showStore()">
                <v-icon>mdi-store </v-icon>
                <span>Show Cart</span>
            </v-btn>
        </v-card-actions>
  <br/><br/>
  <div>
    <v-list enabled>
      <h3>Selected Items</h3>
      <p><b>{{selectedItem[0].title}}</b></p>
      <p>{{selectedItem[0].description1}}</p>

      <v-list-item-group v-model="newCart" color="primary">
        <v-list-item
          v-for="(item, i) in newCart"
          :key="i"
          class=""
        >
          <v-list-item-avatar class="margins">
            <v-img :src='selectedItem[0].image' width="24" height="24" ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list>
             {{selectedItem[0].title}} <span class="left">price: ${{selectedItem[0].price}}</span>
            </v-list>
          </v-list-item-content>

            <v-list>
              <v-text-field label="Quantity" dense counter-value :value="selectedItem[0].quantity" class="margins"></v-text-field>
            </v-list>

            <span class="right">

              <!--    <v-btn color="primary"  @click="removeItem(item)">
                      <v-icon>mdi-trash-can </v-icon>
                      <span>Remove Item</span>
                  </v-btn> -->

            </span>
        </v-list-item>
                
      </v-list-item-group>
                  
    </v-list>
        <br/><br/>
         
        <hr />
  </div>

    <br/><br/>     
            
   <div>Total: ${{floatTotal}} </div>
   <br/><br/>
      <img src="https://sonyainc.net/images/paypal.jpg" />
     
         <v-card-actions>
            <v-btn color="primary"  @click="showPayPal()">
                <v-icon>mdi-dollar-sign </v-icon>
                <span>Pay Now</span>
            </v-btn>
        </v-card-actions>
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
    },
    floatTotal() {
      return this.$store.getters.floatTotal
    }
  },
  data: () => ({

  }),
  methods: {
    removeItem(item) {
      console.log("Remove following Item from cart: ", item);
      this.$store.dispatch('updateCart', item);
    },
    showStore() {
      //this.$router.push('/')
      fbq('trackCustom', 'Sonya - Back to Store Button Submitted');
      gtag('event', 'Sonya - Nohon - Back to Store Submitted', {
        event_category: "Sonya - Nohon",
        event_label : "Sonya - Nohon Back To Store"
      });
      this.$store.dispatch('showMainView');
      this.$store.dispatch('hideBasket')
    },
    showPayPal(){
      console.log("Lets to the paypal page...")

      this.$router.push('/paypal')
    },
    roundOff(num) {
      console.log("Round off: ", num )
    }
   
  },//end methods

};//end export
</script>
<style scoped>
  .btn {
    background: #ddd;
    cursor: pointer;
  }
  .left {
    margin-left: 2em;
  }
  margins {
    margin-right: 2em;
  }
</style>

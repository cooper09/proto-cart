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
      <span class="right guarantee hidden-sm-and-down">  
          <v-list-item-avatar class="margins">
            <v-img :src='selectedItem[0].image' width="24" height="24" ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list>
             {{selectedItem[0].title}} <span class="left">price: ${{selectedItem[0].price}}</span>
            </v-list>
          </v-list-item-content>
      </span>
            <v-list>
              <v-text-field label="Quantity" dense counter-value :value="selectedItem[0].quantity" class="margins"></v-text-field>
            </v-list>


        </v-list-item>
                
      </v-list-item-group>
                  
    </v-list>
        <br/><br/>
         
        <hr />
  </div>
    <br/><br/>     
       
   <div>Total: ${{floatTotal}} </div>
   <br/><br/>
    <span>
        <v-layout row wrap>
          <v-flex>
            <img src="http://sonyainc.net/images/paypal.jpg" />
            <v-card-actions>
                <v-btn color="primary"  @click="showPayPal()">
                    <v-icon>mdi-dollar-sign </v-icon>
                    <span>Pay Now</span>
                </v-btn>
            </v-card-actions>
          </v-flex>
          <v-flex>
                  <span class="right guarantee hidden-sm-and-down">
                      <center><h3>Our Guarantee</h3></center><p></p>
                      <p>Gually Goods strives to provide the best customer experience possible. If you're unsatisfied with your order we offer easy returns  for all domestic orders within 30 days of delivery.</p>
                      <v-img src="http://sonyainc.net/images/30-day-guarantee-badge.png" width="30%"  class="right" ></v-img>
                  </span>
          </v-flex>
        </v-layout>
        </span>


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
      fbq('trackCustom', 'HB Blender  - Back to Store Button Submitted');
      gtag('event', 'HB Blender  - Nohon - Back to Store Submitted', {
        event_category: "HB Blender ",
        event_label : "HB Blender  Back To Store"
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
  .guarantee {
    position:relative;
    bottom: 12em;
    width: 50%;
    padding: 1em;
    margin-right: 3em;

  }
  .foobar {
    background: gray;
    padding: 1em;
  }
</style>

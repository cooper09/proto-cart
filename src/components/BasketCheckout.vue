<template>
  <v-container   class="animated fadeIn container">
    <span class="right"><v-btn @click="showStore()">Back to Shop</v-btn></span>
  <br/></br>
  <div>
    <v-list enabled>
      <h3>Selected Items</h3>
      <v-list-item-group v-model="newCart" color="primary">
        <v-list-item
          v-for="(item, i) in newCart"
          :key="i"
          class=""
        >
          <v-list-item-avatar class="margins">
            <img :src='item.product.image' width="24" height="24" >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list>
             {{item.product.name}} <span class="left">price: ${{item.product.price}}</span>
            </v-list>
          </v-list-item-content>

            <v-list>
              <v-text-field label="Quantity" dense counter-value :value="item.quantity" class="margins"></v-text-field>
            </v-list>

            <span class="right"><v-btn @click="removeItem(item)">remove item</v-btn></span>
        </v-list-item>
                
      </v-list-item-group>
                  
    </v-list>
        <br/><br/>
         
        <hr />
  </div>

    <br/><br/>
   </div>
   <div>Total: ${{floatTotal}} </div>
   <br/><br/>
   <v-btn class="btn" @click="showPayPal()">Pay Now</v-btn>
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
      this.$store.dispatch('showMainView')
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

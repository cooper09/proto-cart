<template>

  <v-container class="animated fadeIn">
    <!-- for the length of the product list, build a card and display it -->

    <v-card class="pa-1">
        <v-responsive class="pt-4">
            
 <!-- <center><img src="https://via.placeholder.com/300" /></center> -->
            <center><img src="masks.jpg" /></center>
        </v-responsive>
        <v-card-text>
            <div class="subheading">{{this.product.title}}</div>
            <div class="grey--text">{{this.product.description}}</div>
            <span class="right price">Price: <b>${{this.product.price}}</b></span>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" class="addBtn" @click="addToCart(product)">
                <v-icon>mdi-cart </v-icon>
                <span>Add To Cart</span>
            </v-btn>
        </v-card-actions>
            <Basket />
    </v-card>
  </v-container>
</template>

<script>
import Basket from '@/components/Basket';
import Cart from '@/helper/cart'

export default {
    components: {
       Basket 
    },
  props: ["product"],  
  data: () => ({
       singleSelect: false,
        selected: [],
        
    }),//end data
  computed:{
    mydata () {
      return this.$store.state.products;
    }
  },
  methods: {
    nextPage() {
      alert("next page please")
      this.$router.push('/about')
      let hello = "We shall Overcome"

    },
/*    selected() {
      alert("Selected Something")
    }, */
    addToCart(item){ 
        //add to cart update state selected list with an action
        console.log ("Card.addToCart - Add ", item.id, " to the Cart")   
        this.$store.dispatch('setData', item );
        console.log("addToCart id: ", typeof(item.id))

        const ourCart = Cart.addItem(item.id, 1);
        console.log("Card.addToCart - our new cart: ", ourCart);
        this.$store.dispatch('setCart', ourCart );
    }
  },//end methods
};//end export
</script>
<style scoped>
  .btn {
    background: #ddd;
    cursor: pointer;
    float: right;
  }

  .price {
    font-size: 1.25em;
  }

</style>

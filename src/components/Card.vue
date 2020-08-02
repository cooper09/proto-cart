
<template>

  <v-container class="animated fadeIn">
    <!-- for the length of the product list, build a card and display it -->

    <v-card class="pa-1">
        <v-responsive class="pt-4">
            
 <!-- <center><img src="https://via.placeholder.com/300" /></center> -->
        <center><v-img src="https://sonyainc.net/Dara/Gem_in_I.png" aspect-ratio="1.0"  id="bgImg"></v-img></center>
        
        </v-responsive>
        <v-card-text class="foobar">
            <h3>{{this.product.title}}</h3>
            <div class="grey--text"><b>{{this.product.description1}}</b></div>
                    <br/>
            <div class="grey--text">{{this.product.description2}}</div>
            <div class="grey--text">{{this.product.description3}}</div>
            <div class="grey--text">{{this.product.description4}}</div>
            <span class="right price">Price: <b>${{this.product.price}}</b></span>
        </v-card-text>

        
            <Basket />
    </v-card>
  </v-container>
</template>

<script>
import Basket from '@/components/Basket';
import Cart from '@/helper/cart'

export default {
    created() {
      console.log('Component has been created: ', this.product );

    //add to cart update state selected list with an action
        console.log ("Card.addToCart - Add ", this.product.id, " to the Cart")   
        this.$store.dispatch('setData', this.product );
        console.log("addToCart id: ", typeof(this.product.id))

        const ourCart = Cart.addItem(this.product.id, this.product.price, 1);
        console.log("Card.addToCart - our new cart: ", ourCart);
        this.$store.dispatch('setCart', ourCart );

        //alert("Your item has been added to the cart. Only one per customer!");
        console.log("Card.addToCart: checkout button" , document.getElementById('checkOutBtn') )
        let checkout = documment.getElementById("checkOutBtn").style.visibility = "hidden";


    },//end ctreated HOOK
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
      //let hello = "We shall Overcome"

    },
/*    selected() {
      alert("Selected Something")
    }, */
    addToCart(item){ 
        alert("Your item has been added to the cart. Only one per customer!\n\nPlease proceed to Checkout");

        //add to cart update state selected list with an action
        console.log ("Card.addToCart - Add ", item.id, " to the Cart")   
        this.$store.dispatch('setData', item );
        console.log("addToCart id: ", typeof(item.id))

        const ourCart = Cart.addItem(item.id, 1);
        console.log("Card.addToCart - our new cart: ", ourCart);
        this.$store.dispatch('setCart', ourCart );

        //alert("Your item has been added to the cart. Only one per customer!");
        console.log("Card.addToCart: checkout button" , document.getElementById('checkOutBtn') )
        let checkout = documment.getElementById("checkOutBtn").style.visibility = "hidden";


        //checkout.classList.add('hide')
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
    font-size: 1.4em;
    position:relative;
    bottom: 1.5em; 
    padding: 1em;
  }

  .hide {
    display: none;
    background: blue;
  }
  .hide {
    display: none;
    background: blue;
  }
  .foobar {
    padding: 2em
  }
</style>
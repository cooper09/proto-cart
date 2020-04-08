import Vue from 'vue'
import Vuex from 'vuex'
import Cart from '@/helper/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: [],
    total: 0,
    visible: true,
    cart: {},
    products: [
      {
        id: 1,
        title: 'Tactical Knife - 400',
        description: 'Razor Tactical Spring Assisted Open Tactical Rescue Pocket Knife Bowie Blue',
        price: 29.99,
        ratings: 3,
        reviews: 5,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1,
        category: 0,
        image: 'tactical-knife.jpg'
      }
    ],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: '',
      productTitleSearched: ''
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
    }  
  },//end state
  mutations: {
    setData(state,payload) {
      state.selected.push( payload);
      state.total = state.total + parseInt(payload.price)
      //console.log("store.setData: ", state.selected)
    },
    updateCart(state,payload) {
      console.log("update selected: ", payload.title );
      const newCart = Cart.removeItem(payload );

      console.log("Store.updateCart - new cart: ", newCart);
      state.cart = newCart;

      let total = 0;
      for (var i in newCart) {
        let entry = newCart[i];
        let {quantity, product, cost} = entry
        console.log(`- ${product.name} x ${quantity} ${cost}`)
        total += cost
       
        console.log("Store.updateCart - total:  ", total );
        alert("Store.updateCart - total:  "+ total)
      }//end for loop
      state.total  = total;
    },
    setCart(state, payload ){
      state.cart = payload
      //console.log(`- ${product.name} x ${quantity} ${payload}`)
      console.log("Store.setCart - payload: ", payload[0].cost)

      state.total += parseFloat(payload[0].cost);
     
      console.log("Store.updateCart -  state.total:  ", state.total );

    },
    hideMainView(state) {
      state.visible = false;
    },
    showMainView(state){
      state.visible = true;
    }
  }, 
  actions: {
    setData(context, data ) {
      //alert("Hit it kid: " + data );
      context.commit('setData', data);
    },
    updateCart(context, data) {
      context.commit('updateCart', data);
    },
    hideMainView(context) {
      context.commit('hideMainView');
    },
    showMainView(context) {
      context.commit('showMainView');
    },
    setCart(context, data ) {
      context.commit('setCart', data);
    }
  },//end actions
  getters: {
    floatTotal: state => {
     return  parseFloat(state.total);
    }
  },
})

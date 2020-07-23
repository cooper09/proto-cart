import Vue from 'vue'
import Vuex from 'vuex'
import Cart from '@/helper/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: [],
    total: 0.0,
    visible: true,
    cart: {},
    products: [
      {
        id: 1,
        title: 'Hamilton Beach Personal Blender for Shakes and Smoothies with 14oz Travel Cup and Lid, Raspberry',
        description1: 'Compact design and BPA free: Great for home, office and travel with on the go portability ',
        description2: 'Blend and go: Blend and drink from the 14 ounce jar and lid which are both dishwasher safe',
        description3: 'Stainless steel blades: Ice crushing power for smooth results',
        description4: '',
        price: 39.99,
        ratings: 3,
        reviews: 5,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1,
        category: 0,
        image: 'http://sonyainc.net/HB-blender/images/blender.png'
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
      state.total = payload.price;
      console.log("store.setData: ", state.total)
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
        //alert("Store.updateCart - total:  "+ total)
      }//end for loop
      state.total  = total;
    },
    setCart(state, payload ){
      state.cart = payload
      //console.log(`- ${product.name} x ${quantity} ${payload}`)
      console.log("Store.setCart - payload: ", payload[0].cost, " and current total: ", state.total)

      state.total = (payload[0].cost);
     
      console.log("Store.updateCart -  state.total:  ", state.total);
      state.total.toPrecision(4);
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
    },
    hideBasket(state){
      console.log("Hide The Shopping Basket")
    }
  },//end actions
  getters: {
    floatTotal: state => {
      console.log("getters.floatTotal - current total: ", state.total )
      let ftotal = state.total
      ftotal.toPrecision(3)
     return ftotal
    }
  },
})


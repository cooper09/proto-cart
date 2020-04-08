const _ = require('lodash');

//Use a dictionary to keep track of what item is what

const Inventory = {
    1: {
      name: "Tactical Knife - 400",
      price: 29.99,
      image: 'tactical-knife.jpg'
    },
    
  }//end Inventory
  

const Cart = new function () {
    this.items = {}
    this.cartObj = []

    this.addItem = (id, qty) => {
        console.log("Cart.addItem: ", id , " qty: ", qty )
        if(this.items[id]){
          this.items[id] += qty      
        }else{
          this.items[id] = qty
        }
         const newCart = this.generateCartObject();
         console.log("Cart.addItem - newCart=: " , newCart )
         return newCart;
      }

    this.removeItem = ( item) => {
        console.log("Cart.updateCart - Removing ", item.id  ," from Cart.");
        this.items[item.id] -= 1
        const newCart = this.generateCartObject();
        console.log("Cart.removeItem: ", newCart )
        return(newCart)
    }//end removeItem

    this.displayCart = ()=>{
        if (_.isEmpty(this.cartObj)){
          console.log("Cart is Empty")
        }else{
          console.log("Cart Items: ", this.cartObj )
          let total = 0
          for( var i in this.cartObj){
            let entry = this.cartObj[i]
            let {quantity, product, cost} = entry
            console.log(`- ${product.name} x ${quantity} ${cost}`)
            total += cost
          }
          console.log(`Total: ${total}`)
        }
        return this.cartObj
      }//end displayCart

// cooper s - always keep our cart objects rip-roaring and ready to go....
    this.generateCartObject = () => {
        console.log("GenerateCartObject - items: ", this.items )
        this.cartObj = []
        if (!_.isEmpty(this.items )) {
            let ids = Object.keys(this.items);
            for(var i=0; i<ids.length; i++){
                let productIdx = ids[i]
                let quantity = parseInt(this.items[productIdx])
                let product = Inventory[productIdx]
                let id = parseInt(ids[i])
                console.log("chosen product: ", ids[i] );
                console.log("chosen product price: ", product.price );
                if(quantity>0){
                    let cost = quantity * product.price
                    let item = { id, quantity, product, cost }
                    console.log("generateCartObject - final item: ", item )         
                    this.cartObj.push(item)
                    console.log("generateCartObject - final item: ", this.cartObj )
                  //  
                  }//end iffy
            //return this.cartObj; 
            }//end for 
        }//end iffy
        return this.cartObj; 
    }//end generateCartObject
}//end Cart

export default Cart
const _ = require('lodash');

//Use a dictionary to keep track of what item is what

const Inventory = {
    product1: {
      name: "Product 1",
      price: 50,
    },
    product2: {
      name: "Product 2",
      price: 35,
    },
    product3: {
      name: "Product 3",
      price: 110,
    },
    product4: {
      name: "Product 4",
      price: 50,
    },
    product5: {
      name: "Product 5",
      price: 35,
    },
    product6: {
      name: "Product 6",
      price: 110,
    },
    product7: {
      name: "Product 7",
      price: 50,
    },
    product8: {
      name: "Product 8",
      price: 35,
    },
    product9: {
      name: "Product 9",
      price: 110,
    }
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
        this.generateCartObject()
      }

    this.removeItem = ( item) => {
        console.log("Cart.updateCart - Removing ", item.id  ," from Cart.");
        this.items[item.id] -= 1
        this.generateCartObject();
        return("here is our new Cart...")
    }//end removeItem

    this.generateCartObject = () => {
        console.log("GenerateCartObject - items: ", this.items )
        this.cartObj = []
        if (!_.isEmpty(this.items )) {
            let ids = Object.keys(this.items);
            console.log("generateCartObject - list of ids: ", ids );
            for(var i=0; i<ids.length; i++){
                console.log("id: ", ids[i])
                let productId = ids[i]
                let quantity = parseInt(this.items[productId])
                console.log("our product: ", productId, " quantity: ", quantity );
                console.log("our items: ", this.items[productId] );
                console.log("our product Inventory: ", Inventory[parseInt(productId)]);
                let product = Inventory[productId]
                console.log("chosen product: ", product );
            }//end for 
        }//end iffy

    }//end generateCartObject
}//end Cart

export default Cart
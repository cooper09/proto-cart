<template>
  <v-container   class="animated fadeIn container">
    Your Total is: ${{getTotal}}
    <span class="right"><v-btn @click="showStore()">Back to Shop</v-btn></span>
    <center><v-layout row wrap align-center align-content-space-between>  
       <v-row align="center">
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          class="myform"
        >
        <v-text-field
            v-model="name"
            :counter="30"
            :rules="nameRules"
            label="Name"
            required
        ></v-text-field>

        <v-text-field
            v-model="address"
            :counter="60"
            :rules="addressRules"
            label="Address"
            required
        ></v-text-field>

        <v-text-field
            v-model="city"
            :counter="30"
            :rules="cityRules"
            label="City"
            required
        ></v-text-field>

        <v-text-field
            v-model="state"
            :counter="30"
            :rules="stateRules"
            label="State"
            required
        ></v-text-field>

        <v-text-field
            v-model="country"
            :counter="30"
            :rules="countryRules"
            label="Country"
            required
        ></v-text-field>

        <v-text-field
            v-model="zip"
            :counter="12"
            :rules="zipRules"
            label="Zip"
            required
        ></v-text-field>

        <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Phone"
            required
        ></v-text-field>
      

        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="When info is complete check this box and submit below"
            required
        ></v-checkbox>

        <v-btn
            :disabled="!valid"
            color="blue white--text"
            class="mr-4"
            @click="validate"
        >
            Submit
        </v-btn>

        <v-btn
            color="#1f4992 white--text"
            class="mr-4"
            @click="reset"
        >
            Reset Form
        </v-btn>
        </v-form>
    </v-row>
      </v-layout></center>

   
        <br/><br/>
    <div ref="paypal"></div>

    <hr />
    <br/><br/>
        <div v-if="paidFor">
            <h3>Thanx for Shopping with HarlemBased Vendors. Stay Live!</h3>
          </div>
    <br/><br/>
    <hr />
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  mounted: function() {
  },
  computed: {
    getTotal () {
        return this.$store.state.total;
    },
  },//end computed
  
 //cooper s - picks up the THIS from the current scope and NOT the component scope
 
  data () {
    return {
      loaded: false,
      paidFor: false,
      valid: true,
      phone: '',
      phoneRules: [
       
      ],
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      address: '',
      addressRules: [
        v => !!v || 'Adress is required',
        v => (v && v.length <= 60) || 'Address must be less than 60 characters',
      ],
      city: '',
      cityRules: [
        v => !!v || 'City is required',
        v => (v && v.length <= 30) || 'City must be less than 30 characters',
      ],
      state: '',
      stateRules: [
        v => !!v || 'State is required',
        v => (v && v.length <= 30) || 'State must be less than 30 characters',
      ],
      country: '',
      countryRules: [
        v => !!v || 'Country is required',
        v => (v && v.length <= 30) || 'Country must be less than 30 characters',
      ],
      zip: '',
      zipRules: [
        v => !!v || 'Zip code is required',
        v => (v && v.length <= 12) || 'Zip Code must be less than 12 characters',
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => (v && v.length <= 12) || 'Phone number must be less than 12 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      checkbox: false,
      lazy: false,
 
    }//end return
  },//end data
  methods: {
    showStore() {
      this.$store.dispatch('showMainView')
    },
    payMethod() {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AYvEZYKAlTLeErYUz9KdH_2twNwANrX9gWVlmR3D16GHndWk0lcrSXfDjle3TF-1jdiwfKMyUslZIHrW"
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);

    },//end payMethods
    nextPage() {
      this.$router.push('/')
    },
    setLoaded: function() {
      console.log("setLoaded this is: ", this)
        this.loaded = true;
        window.paypal
            .Buttons({
                createOrder: (data, actions ) => {
                    return actions.order.create({
                        purchase_units:[
                            {
                                description: this.name,
                                amount:{
                                    currency_code: "USD", 
                                    value:  this.getTotal
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
                    amount:this.getTotal,
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

              this.$refs.form.reset();
              alert("Thank you. Your Purchase has been comnpleted and your shipment is on its way!")
              
        }// on Approval
      })//end windows.paypal.Buttons
      .render(this.$refs.paypal )
    },//setLoaded
    validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
          //alert("Send data to database - selected:  "+ this.select );
          const dataObj = {
              name: this.name,
              address: this.address,
              city: this.city,
              state: this.state,
              country: this.country,
              zip: this.zip,
              phone: this.phone,
              email: this.email
          }//end dataObj
          //this.$refs.form.reset();
          this.payMethod()
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },    
     
  },//end methods
};//end export
</script>
<style scoped>
  .btn {
    background: #ddd;
    cursor: pointer;
  }
  .container {
    padding: 0;
  }
  .myform {
    width: 100%;
  }
</style>

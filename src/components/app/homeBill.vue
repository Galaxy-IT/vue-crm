<template>
   <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line" v-for="(currency,index) of curencies" :key='index'>
            <span>{{getCurrency(currency)}}</span>
          </p>
        </div>
      </div>
   </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props:['rates'],
  data(){
    return{
      curencies:['RUB','EUR','USD']
    }
  },

  computed:{
    ...mapGetters(["info"]),

    base(){
      return this.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods:{
    getCurrency(cur){
      let qwerty = Math.ceil(this.base * this.rates[cur])
      return new Intl.NumberFormat('ru-RU',{
        style:'currency',
        currency:cur,
      }).format(qwerty)
    }
    
  }
}
</script>
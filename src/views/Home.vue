<template>
  <div>
  <div class="page-title">
    <h3 >Home</h3>

    <button class="btn waves-effect waves-light btn-small"
    @click = 'refresh'
    >
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <loader v-if="loading" />
  <div v-else class="row">
   <homeBill 
   :rates = 'currency.rates'
   />
   <homeCurrency
   :rates = 'currency.rates'
   :date = 'currency.date'
   />
    </div>

    
</div>
</template>
<script>
import homeBill from '@/components/app/homeBill.vue'
import homeCurrency from '@/components/app/homeCurrency.vue'
import {mapActions} from 'vuex'

export default {
  data(){
    return {
      loading:true,
      currency:null,}
      
  },
  async mounted(){
      this.currency = await this.fetchCurrency
      console.log(this.currency);
      
      this.loading = false
  },
  computed:{
    ...mapActions(['fetchCurrency'])
  },
  components:{homeBill,homeCurrency},
  methods:{
    async refresh(){
      this.loading = true
      this.currency = await this.fetchCurrency
      this.loading = false

    }
  }
}
</script>
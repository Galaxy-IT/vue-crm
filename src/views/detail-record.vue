<template>
  <div>
    <loader v-if = 'loading'/>
  <div v-else>
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        {{isOutcome}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div 
        class="card"
        :class='isColor'
        >
          <div class="card-content white-text">
            <p>Описание: {{record.descr}}</p>
            <p>Сумма: {{record.amount}}</p>
            <p>Категория: {{category.categoryName}}</p>

            <small>{{record.date}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import loader from '../components/app/loader.vue'
export default {
  components:{loader},
  data(){
    return{
      loading:true, 
      isOutcome:'',
      isColor:'',
      record:[],
      category:'',
    }
  },
  async mounted(){
    const id = this.$route.query['']
    this.record = await this.$store.dispatch('fetchRecordByID',id)
    this.category = await this.$store.dispatch('fetchCategoryByID',this.record.categoryID)
    console.log(this.record);
    

    this.isOutcome = this.record.type === 'outcome' ? 'Рассход' : 'Доход'
    this.isColor = this.record.type === 'outcome' ? "red" : 'green'
    this.record.date = new Date(this.record.date).toLocaleDateString()
    this.loading = false


  }
}
</script>
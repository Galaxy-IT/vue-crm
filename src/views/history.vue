<template>
  <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>
  <loader
        v-if="loading"
    />
    <p v-else-if = '!records.length'>
      Записей пока нет пока нет
      <router-link to='/record'>Перейти что бы чоздать новый record</router-link>
    </p>
  <section v-else>
    
    <historyTable
    :records = 'records'
    />
  </section>
</div>
</template>
<script>
import historyTable from '../components/app/historyTable.vue'
import loader from "../components/app/loader";

export default {
  data(){
    return{
      loading:true,
      categories:[],
      records:[],
    }
  },
  components:{historyTable,loader},
  async mounted(){
    // this.records = await this.$store.dispatch('fetchRecords')
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record =>{
      return {
        ...record,
        categoryName:this.categories.find(s =>s.id === record.categoryID).categoryName,
        typeClass: record.type === 'income' ?'green' : 'red',
        typeText: record.type === 'income' ? "Доход" : "Расход",
        
      }
    })
    
    this.loading = false
  }
}
</script>
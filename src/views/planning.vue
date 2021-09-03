<template>
  <div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4

    >{{ info.bill }} P</h4>
  </div>
  <loader
      v-if="loading"
  />
  <p v-else-if = '!categories.length'>
    категорий пока нет
    <router-link to='/category'></router-link>
  </p>
  <section
  v-else
  >
    <div 
    v-for="cat in categories" 
    :key="cat.id"
    >
      <p>
        <strong>{{cat.categoryName}}</strong>
        {{cat.spend}} из {{cat.limit}}
      </p>
      <div class="progress" >
        <div
            class="determinate"
            :style="{width: cat.progressPercent + '%'}"
            :class="[cat.progressColor]"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import loader from "../components/app/loader";

export default {
  data(){
    return{
    loading:true,
      categories:[],
    }
  },
  async mounted(){
    
    const categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')
    console.log(records);
    this.categories = categories.map(cat =>{
       cat.spend = records
      .filter(i => i.categoryID === cat.id)
      .filter(r => r.type ==='outcome')
      .reduce((total,record) =>{
        return total += +record.amount
      },0)
      cat.percent = 100 * cat.spend / cat.limit
      cat.progressPercent = cat.percent > 100 ? 100 : cat.percent
      cat.progressColor = cat.percent < 60 
      ?"green" 
      :cat.percent <100 
        ?"yellow" 
        : "red"
        
        return cat.spend,cat.progressPercent,cat.progressColor,cat
    })
    
    this.loading = false
  },
  computed: {
    ...mapGetters(["info","records"]),
  },
  components:{loader}
}
</script>
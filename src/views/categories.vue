<template>
  <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <loader v-if="loading"/>
    <div v-else class="row">
      <div class="col s12 m6">
        <categoryCreate @create="addNewCategory"/>
      </div>
      <div class="col s12 m6">
       <categoryEdit :categories = "category"/>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import categoryCreate from '@/components/app/categoryCreate.vue'
import categoryEdit from '@/components/app/categoryEdit'
import loader from '@/components/app/categoryEdit'


export default {
  data(){
    return{
      category:[],
      loading:true,
    }
  },

  async mounted(){
    this.category = await this.$store.dispatch("fetchCategories")
    this.loading = false
  },
components:{categoryCreate, categoryEdit,loader},
  methods:{
    addNewCategory(category){
      this.category.push(category)
    }
  }
}
</script>

<style>

</style>
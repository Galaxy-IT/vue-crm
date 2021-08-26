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
       <categoryEdit
           v-if="category.length"
           :key = "category.length + updateCount"
           :categories = "category"
           @updated = "updateCategories"
       />
        <p
            v-else
        >
          Категорий нету
        </p>
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
      updateCount:0,
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
    },
    updateCategories(item){
      const uid = this.category.findIndex(c =>c.id === item.id)
      this.category[uid].categoryName = item.categoryName
      this.category[uid].limit = item.limit
      this.updateCount++
    }
  }
}
</script>

<style>

</style>
<template>
  <div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4

    >{{ info.bill }}</h4>
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
    <div>
      <p>
        <strong>Девушка:</strong>
        12 122 из 14 0000
      </p>
      <div class="progress" >
        <div
            class="determinate green"
            style="width:40%"
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
    const record = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  computed: {
    ...mapGetters(["info"]),
  },
  components:{loader}
}
</script>
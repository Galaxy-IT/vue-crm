<template>
    <div class="app-main-layout">
        <Navbar @click = "isOpen = !isOpen"/>
        <Sidebar v-model="isOpen"/>


        <main class="app-content" :class ="{full:!isOpen}">
            <div class="app-page">

                <router-view/>


            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link to='/record' class="btn-floating btn-large blue" href="#">
                <i class="large material-icons">add</i>
            </router-link >
        </div>
    </div>
</template>
<script>
import Navbar from '../components/app/navbar.vue'
import Sidebar from '../components/app/sidebar.vue'
import messages from '@/utils/messages'

export default {
    components:{Navbar,Sidebar},
    data:()=>({
        isOpen:true,
    }),
    async mounted(){
        if(!Object.keys(this.$store.getters.info).length){
            await this.$store.dispatch('fetchInfo')
        }
    },
    computed:{
    error(){
     return this.$store.getters.error;
    }
  },
  watch:{
    error(fbError){
      this.$error(messages[fbError.code] || 'что-то пошло не так')
    }
  },
}
</script>
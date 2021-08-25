<template>
  <nav class="navbar orange lighten-1">
            <div class="nav-wrapper">
                <div class="navbar-left">
                    <a href="#" @click.prevent ="$emit('click')">
                        <i class="material-icons black-text">dehaze</i>
                    </a>
                    <span class="black-text">{{date}}</span>
                </div>

                <ul class="right hide-on-small-and-down">
                    <li>
                        <a 
                        ref = 'dropdown'
                        class="dropdown-trigger 
                        black-text" href="#" 
                        data-target="dropdown">
                            {{name}}
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>

                        <ul id='dropdown' class='dropdown-content'>
                            <li>
                                <router-link 
                                to='/profile'
                                 class="black-text"
                                 >
                                    <i class="material-icons">account_circle</i>Профиль
                                </router-link>
                            </li>
                            <li class="divider" tabindex="-1"></li>
                            <li>
                                <a @click.prevent = 'logOut' href="#" class="black-text">
                                    <i class="material-icons">assignment_return</i>Выйти
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
</template>
<script>
/* eslint-disable */
import {mapActions} from 'vuex'
export default {
  data:()=>({
    userID:'',
    date:'',
    interval :null, 
    dropdown:null,

  }),
  
  mounted(){
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown,{
       constrainWidth:true,
})
    this.interval = setInterval(() => {
      this.date = new Date().toLocaleTimeString()
    }, 1000);
    
  },
  beforeDestroy(){
    clearInterval(this.interval)
    if(this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy()
    }
  },
  methods:{
    async logOut(){
    await this.$store.dispatch('logout')
    await this.$router.push('/login?message=logout')
    },
    

  },
  computed:{
    name(){
      return this.$store.getters.info.name
    }
  }
}
</script>
<template>
  <ul class="sidenav app-sidenav" :class="{open:value}">
    <router-link 
    v-for ='(link) in links'
    :key = 'link.url'
    custom 
    v-slot="{ href, navigate, isActive }"
    :to='link.url'
    active-class="'active"
    :exact='link.exact'
    
    >
        <li :class="{ 'active': isActive }">
        <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">
          {{ link.title }}
        </a>
      </li>
    </router-link >

  </ul>
</template>
<script>
export default {
  data:() =>({
    links:[
      {title:'Счет',url:'/',exact:true},
      {title:'История',url:'/history'},
      {title:'Планирование',url:'/planning'},
      {title:'Новая запись',url:'/record'},
      {title:'Категории',url:'/categories'},

    ]
    
  }),
  props:['value']
}
</script>
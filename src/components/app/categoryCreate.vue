<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent = 'submitHandler'>
      <div class="input-field">
        <input 
        id="name" 
        type="text"
        v-model="categoryName"
        :class="{invalid:$v.categoryName.dirty && !$v.categoryName.required}"
        >
        <label for="name">Название</label>
        <span 
        class="helper-text invalid"
        v-if="$v.categoryName.$dirty && !$v.categoryName.required"
        >Введите название</span>
      </div>

      <div class="input-field">
        <input 
        id="limit" 
        type="number"
        v-model.number="limit"
          :class="{invalid:$v.limit.dirty && !$v.limit.minValue}"     
        >
        <label for="limit">Лимит</label>
        <span 
        class="helper-text invalid"
        v-if="$v.limit.$dirty && !$v.limit.minValue"
        >Минимальная величина {{$v.limit.$params.minValue.min}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import {required,minValue} from 'vuelidate/lib/validators'
export default {
  data(){
    return{
      categoryName:'',
      limit:100,
    }
  },
  validations:{
    categoryName:{required},
    limit:{minValue:minValue(100)}
  },
  mounted(){
    window.M.updateTextFields();
  },
   methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      
      try{
        const category = await this.$store.dispatch('createCategory',{
            categoryName:this.categoryName,
            limit:this.limit
            });
        console.log(category)
            this.categoryName='';
            this.limit=100;
            this.$v.$reset()
            this.$emit('create',category)

            this.$message('Котегория создана')
      }
      catch (e){
        throw e
      }
  
    }
  }
}
</script>
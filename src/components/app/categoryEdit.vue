<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent = "submitHandler">
      <div class="input-field">
        <select ref = 'select' v-model = 'current' >
          <option
              v-for="option of categories"
              :key="option.id"
              :value="option.id"
          >{{ option.categoryName }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

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
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required,minValue} from 'vuelidate/lib/validators'

export default {
  data(){
    return{
      select:null,
      categoryName :'',
      limit:100,
      current:null,

    }
  },
  validations:{
    categoryName:{required},
    limit:{minValue:minValue(100)}
  },
  props:['categories'],
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select)
    window.M.updateTextFields();
  },
  watch:{
    current(catID){
      const{categoryName,limit} =  this.categories.find(c => c.id ===catID)
      this.categoryName = categoryName
      this.limit = limit
    }
  },
   created(){
    if(this.categories){
      const {id,categoryName,limit} =  this.categories[0]
      this.current = id
      this.categoryName = categoryName
      this.limit = limit
    }

  },
  beforeDestroy() {
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
        const categoryData = {
          id:this.current,
          categoryName:this.categoryName,
          limit:this.limit,
        }
        await this.$store.dispatch('updateCategory',categoryData)
        this.$message('Категория обновлена')
        this.$emit('updated',categoryData)
      }
      catch(e){
        console.log()
      }
    }
  }
}
</script>
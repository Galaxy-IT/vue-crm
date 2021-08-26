<template>
  <div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>
  <loader v-if="loading"/>
    <p v-else-if = '!categories.length'>
      категорий пока нет
      <router-link to='/category'></router-link>
    </p>
  <form
      class="form"
      v-else
      @submit.prevent="submitHandler"

  >
    <div class="input-field" >
      <select ref = 'select' v-model="category">
        <option
            v-for="option of categories"
            :key="option.id"
            :value="option.id"
        >
          {{ option.categoryName }}
        </option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="income"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="outcome"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid:$v.amount.dirty && !$v.amount.minValue}"
      >
      <label
          for="amount"

      >Сумма</label>
      <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
      >Минимальная величина {{$v.amount.$params.minValue.min}}</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model = "descr"
          :class="{invalid:$v.descr.dirty && !$v.descr.required}"

      >
      <label for="description">Описание</label>
      <span
          class="helper-text invalid"
          v-if="$v.descr.$dirty && !$v.descr.required"
      >Поле не валидно</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {required,minValue} from 'vuelidate/lib/validators'
export default{
  data(){
    return{
      loading:true,
      categories:[],
      select:null,
      category:null,
      type:'outcome',
      amount:1,
      descr:'',
    }
  },
  validations:{
    amount:{minValue:minValue(1)},
    descr:{required},
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    setTimeout(()=>{
      this.select = window.M.FormSelect.init(this.$refs.select)
      window.M.updateTextFields();
    },0)

    if(this.categories[0]){
      this.category = this.categories[0].id
    }
  },
  beforeDestroy() {
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  computed:{
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type === 'income'){
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      if(this.canCreateRecord){
        try{
          await this.$store.dispatch('createRecord',{
            categoryID:this.category,
            amount:this.amount,
            descr:this.descr,
            tyle:this.type,
            date:new Date().toJSON(),
          })
          let bill = this.type ==='income'
          ? this.info.bill + this.amount
              : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo',{bill})
          this.$message('Запись создана')
          this.$v.$reset()
          this.amount = 1
          this.descr = ''

        }
        catch(e){
          console.log()
        }

      }
      else{
        this.$message(`недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    },

  }
}

</script>
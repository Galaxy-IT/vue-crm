<template>
  <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row">
      <div class="col s12 m6">
        <categoryCreate/>
      </div>
      <div class="col s12 m6">
       <categoryEdit/>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import categoryCreate from '@/components/app/categoryCreate.vue'
import categoryEdit from '@/components/app/categoryEdit'

export default {
components:{categoryCreate, categoryEdit}
}
</script>

<style>

</style>
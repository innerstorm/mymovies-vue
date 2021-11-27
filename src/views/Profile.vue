<template>
  <div class="container mx-auto page-content page-profile">
    <div class="sub-head flex flex-nowrap items-center justify-between">
      <h1 class="inline">Hello, {{ user.name }}</h1>
      <a href="" class="btn">settings</a>  
    </div>
    <hr>
    
    <div class="mb-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora et, ipsam nobis nihil quidem nesciunt amet quam unde vero quia enim reiciendis beatae optio voluptatibus obcaecati fugiat quo repudiandae. Et, laborum quibusdam tempore tempora fugit dolores quis molestiae, dolore, vitae eaque iusto dicta ut quisquam ad doloremque unde sapiente eum!</div>

    <hr>
    <div class="flex justify-between">
      <a href="" class="btn btn-primary">download data</a>
      <a href="" class="btn btn-outline">delete account</a>
    </div>


  </div>
</template>

<script>
import VueFeather from 'vue-feather'

export default {
  setup() {

    const user ={
      name: 'Thomas'
    }

    return { user, VueFeather  }
  }

}
</script>

<style>

</style>

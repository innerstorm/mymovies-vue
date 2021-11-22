<template>
  <div class="page-content page-home">

    <MoviesList />

  </div>
</template>

<script>
import MoviesList from '../components/MoviesList.vue'

export default {
  name: 'Home',
  components: { MoviesList },
  setup() {

  }
}
</script>

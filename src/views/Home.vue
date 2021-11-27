<template>
  <div class="container mx-auto page-content page-home">
    <MoviesList :moviesList="moviesList" />
  </div>
</template>

<script>
  import MoviesList from '../components/MoviesList.vue'
  import dummyData from '../assets/movies_data.json'

  export default {
    name: 'Home',
    components: { MoviesList },
    setup() {

    },

    data () {
      return {
        moviesList: dummyData
      }

    }
  }
</script>

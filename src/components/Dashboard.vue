<template>
  <Header />
  <div class="container mx-auto page-content page-home">
    <MoviesList :moviesList="moviesList"/>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import MoviesList from '../components/MoviesList.vue'
  import dummyData from '../assets/movies_data.json'

  export default {
    name: 'Dashboard',
    components: { Header, MoviesList },
    setup() {

    },

    data () {
      return {
        moviesList: dummyData
      }

    }
  }
</script>

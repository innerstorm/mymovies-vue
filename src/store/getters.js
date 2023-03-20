export default {
    // getters
    getUser(state) {
        return state.user
    },

    getLoggedIn(state) {
        return state.isLoggedIn
    },

    getFromLogin(state) {
        return state.fromLogin
    },

    getMovies(state) {
        return state.movies
    },

    getMovieById(state) {
        return (id) => {
            return state.movies.find(movie => movie.id === id)
        }
    },

    getMovieByTitle(state) {    
        return (title) => {
            return state.movies.find(movie => movie.title === title)
        }
    },

    getNumberOfMovies(state) {
        return state.movies.length
    },

    getSearchResults(state) {     
        return state.searchResults
    },
    
    getNumberOfSearchResults(state) {
        return state.searchResults.length
    },

    getSearchTerm(state) {
        return state.searchTerm
    },  



}
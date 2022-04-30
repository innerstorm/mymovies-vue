<template>
    <div class="movie-search-results-wrapper" v-if="newSearchResults.totalResults > 0">
        <div class="overlay" @click="closeSearchWindow"></div>
        <div class="search-results-list" @keypress.esc="closeSearchWindow">
            <div class="flex justify-between mb-3">
                <div class="text-bold">Select movie</div>
                <div>{{ newSearchResults.totalResults }} total results found for: {{ searchTerm }}</div>
            </div>
            <div class="flex flex-wrap">
                <div 
                    v-for="result in newSearchResults.Search" 
                    :key="result.imdbID" 
                    :id="result.imdbID"
                    class="item w-1/5"
                    @click="selectMovie(result)"
                >
                    <div class="search-result-item">
                        <img :src="result.Poster" :alt="result.Title" class="search-result-item-image">
                        <div class="search-result-item-data">
                            {{ result.Title }}
                            <small>{{ result.Year }}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3">
                <button>
                    <vue-feather type="refresh-cw" size="20" class=""></vue-feather>
                </button>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: ['searchTerm', 'newSearchResults'],
    emits: ['selectMovie'],

    setup(props, context) {

        const closeSearchWindow = () => {
            document.querySelector("body").classList.remove("search-visible");
            //context.emit('closeSearchWindow')
            console.log('closeSearchWindow')
            newSearchResults = {}
        }

        return {
            closeSearchWindow,

            selectMovie(movie) {
                console.log('emit')
                context.emit('selectMovie', movie)
            }
        }
    }
}
</script>

<style>
.movie-search-results-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
}

.movie-search-results-wrapper .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 2;

}

.search-results-list {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #000;
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 960px;
    max-height: 90%;
    border-radius: 1rem;
    overflow: hidden;
}

.search-results-list > div {
}

.search-results-list .item {
    padding: .5rem;
    cursor: pointer;
    padding: .5rem;
}

.search-result-item {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: .5rem;    
    background-color: rgba(255,255,255,.1);
    background-image: url(../assets/no-poster.jpg);
    background-size: cover;
}

.search-results-list .item img {
    aspect-ratio: 30/45;
}

.search-result-item-data {
    padding: .5rem;
    
    color: #fff;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 2;
    background: rgba(0,0,0,0.9);
    opacity: 0;
}

.search-results-list .item:hover .search-result-item-data {
    /* background: #000; */
    opacity: 1;
}
</style>
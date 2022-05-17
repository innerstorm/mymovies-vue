<template>
    <modal
        :show="newSearchResults.totalResults > 0"
        @close-modal="closeSearchWindow"
    >
        <template #header>
            <div class="flex justify-between">
                <div class="text-bold">Select movie</div>
                <div>
                    {{ newSearchResults.totalResults }} total results found for:
                    {{ searchTerm }}
                </div>
            </div>
        </template>
        <template #body>
            <div class="search-results-list">
                <div
                    v-for="result in newSearchResults.Search"
                    :key="result.imdbID"
                    :id="result.imdbID"
                    class="item w-1/5"
                    @click="selectMovie(result)"
                >
                    <div class="search-result-item">
                        <img
                            :src="result.Poster"
                            :alt="result.Title"
                            class="search-result-item-image"
                        />
                        <div class="search-result-item-data">
                            {{ result.Title }}
                            <small>{{ result.Year }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="p-4 flex justify-end">
                <button class="btn btn-primary">
                    next 10 Movies
                    <vue-feather
                        type="arrow-right"
                        size="20"
                        class="pl-2"
                    ></vue-feather>
                </button>
            </div>
        </template>
    </modal>
</template>

<script>
import { ref } from "vue";
import Modal from "./Modal.vue";

export default {
    props: ["searchTerm", "newSearchResults"],
    emits: ["selectMovie"],
    components: {
        Modal,
    },

    setup(props, context) {
        const closeSearchWindow = () => {
            document.querySelector("body").classList.remove("search-visible");

            console.log("close Search Window");
            props.newSearchResults.value = {};
            props.newSearchResults.totalResults = 0;
        };

        return {
            closeSearchWindow,
            selectMovie(movie) {
                console.log("emit", movie.Title);
                context.emit("selectMovie", movie);
            },
        };
    },
};
</script>

<style scoped>
.modal-header {
    padding: 1.33rem 4rem 1rem 1rem;
}

.search-results-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.search-results-list .item {
    padding: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.search-result-item {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    background-image: url(../assets/no-poster.jpg);
    background-size: cover;
}

.search-result-item img {
    aspect-ratio: 30/45;
}

.search-result-item-data {
    padding: 0.5rem;
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
    background: rgba(0, 0, 0, 0.9);
    opacity: 0;
}

.search-results-list .item:hover .search-result-item-data {
    /* background: #000; */
    opacity: 1;
}
</style>

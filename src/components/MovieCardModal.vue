<template>
    <div class="vue-modal" v-show="show">
        <div class="vue-modal-overlay" @click="closeModal">
            <div class="vue-modal-window">
                <button class="btn btn-close" @click="closeModal()">
                    <vue-feather type="x" size="20" class="ml-2"></vue-feather>
                </button>
                <div>
                    <img :src="movie.Poster" :alt="movie.Title" class="poster">
                </div>
                <div class="vue-modal-body">
                    <h2>{{ movie.Title }}</h2>
                    <p>{{ movie.Year }}</p>
                    <p>{{ movie.Genre }}</p>
                    <p><strong>Director:</strong>{{ movie.Director }}</p>
                    <p><strong>Actors:</strong> {{ movie.Actors }}</p>

                    <div>
                        <span class="badge">{{ movie.imdbRating }}</span>
                        <span class="badge">{{ movie.Rated }}</span>
                        <span class="badge">{{ movie.Genre }}</span>
                    </div>
                    <div class="p-6">
                        {{ movie.Plot }}
                    </div>
                </div>
                <div class="vue-modal-footer">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
    emits: ['closeModal'],
    props: ['movie', 'show'],

    setup(props, context) {
        return {
            closeModal() {
                console.log('close modal window')
                document.querySelector("body").classList.remove("modal-visible");
                context.emit('closeModal')
            },
        }
    }
}
</script>

<style>
.vue-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    z-index: 100;
}

.vue-modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.vue-modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 800px;
    max-height: 90%;
    background-color: #000;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.75);
    z-index: 101;
}
</style>
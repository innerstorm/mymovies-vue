<template>
    <div class="vue-modal" v-show="show">
        <div class="vue-modal-overlay" @click="closeModal"></div>
        <div
            class="vue-modal-window flex bg-base-300"
            @keydown.esc="closeModal"
        >
            <button class="btn btn-close" @click="closeModal">
                <vue-feather type="x" class=""></vue-feather>
            </button>
            <div class="w-1/3">
                <img :src="movie.Poster" :alt="movie.Title" class="poster" />
            </div>

            <div class="w-2/3 p-4">
                <h2 class="mb-3">{{ movie.Title }}</h2>

                <div class="mb-4">
                    <span class="badge">{{ movie.imdbRating }}</span
                    >&nbsp; <span class="badge">{{ movie.Rated }}</span
                    >&nbsp; <span class="badge">{{ movie.Runtime }}</span
                    >&nbsp;
                    <span class="badge">{{ movie.Genre }}</span>
                </div>

                <div class="mb-4">
                    <p>{{ movie.Year }}</p>
                    <p class="mb-2">
                        <strong>Director:</strong><br />{{ movie.Director }}
                    </p>
                    <p><strong>Actors:</strong><br />{{ movie.Actors }}</p>
                </div>

                <div class="text-sm leading-6">
                    {{ movie.Plot }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["closeModal"],
    props: ["movie", "show"],

    setup(props, context) {
        console.log(props.movie);

        return {
            closeModal() {
                document
                    .querySelector("body")
                    .classList.remove("modal-visible");
                context.emit("closeModal");
            },
        };
    },
};
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
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 100;
}

.vue-modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 960px;
    max-height: 90%;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 100px -10px rgba(128, 120, 110, 0.75);
    z-index: 101;
}

.btn-close {
    position: absolute;
    z-index: 102;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem;
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    border: 0;
    cursor: pointer;
}
</style>

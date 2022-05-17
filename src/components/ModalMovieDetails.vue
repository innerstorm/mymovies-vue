<template>
    <Teleport to="body">
        <modal :show="show" @close-modal="$emit('closeModal')">
            <template #body>
                <div class="w-1/3">
                    <img
                        :src="movie.Poster"
                        :alt="movie.Title"
                        class="poster"
                    />
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
            </template>
        </modal>
    </Teleport>
</template>

<script>
import Modal from "./Modal.vue";

export default {
    emits: ["closeModal"],
    props: ["movie", "show"],
    components: {
        Modal,
    },
};
</script>

<style></style>

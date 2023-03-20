<template>
    <div class="movie-card relative z-0" @click="handleClick" :id="movie.imdbID">
        <img :src="movie.Poster" alt="">
        <div class="overlay absolute z-10 left-0 top-0 w-full h-full">
            <h4>{{ movie.Title }}</h4>
            <p class="font-bold">{{ movie.Year }}</p>
            <p>{{ movie.Genre }}</p>
            <p><strong>Director:</strong>{{ movie.Director }}</p>
            <p><strong>Actors:</strong> {{ movie.Actors }}</p>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Moviecard',
    props: ['movie'],
    emits: ['showModal'],

    setup (props, context) {
        const handleClick = () => {
            context.emit('showModal')
        }

        return { handleClick }
    }
}
</script>

<style>
    .movie-card {
        @apply rounded rounded-lg overflow-hidden bg-grey-dark;
        box-shadow: 0 3px 10px 0 rgba(0,0,0,.75);
    }

    .movie-card img {
        width: 100%;
        height: auto;
        aspect-ratio: 30/45;
    }

    .movie-card .overlay {
        opacity: 0;
        padding: 1rem;
        font-size: .75rem;
        background-color: rgba(0,0,0,.75);
        transition: opacity .125s ease-in-out;
        cursor: pointer;
        user-select: none;
    }

    .movie-card:hover img {
        filter: blur(4px);
    }

    .movie-card:hover .overlay {
        opacity: 1;    
    }

    .movie-card h4 {
        margin-bottom: 1rem;
    }

    .movie-card strong {
        display: block;
        @apply text-gray-400;

    }

    .movie-card p {
        margin-bottom: .75rem;
    }
</style>
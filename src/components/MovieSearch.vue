<template>
<div class="container mx-auto page-content page-home">
    <div class="mb-8">
        <input 
            v-model="searchTerm" 
            type="text" 
            class="input input-lg input-bordered w-full" 
            placeholder="search movie title..."
            >
    </div>

    <div class="my-10" v-if="searchTerm">
        <h2 class="font-thin">{{ numberOfSearchResults }} results for: <span class="font-bold">{{ searchTerm }}</span></h2> 
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
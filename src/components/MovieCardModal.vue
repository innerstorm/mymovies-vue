<template>
    <div class="vue-modal" @show-modal="showModal" v-show="show">
        <div class="vue-modal-overlay" @click="closeModal">
            <div class="vue-modal-window">
                <div class="vue-modal-header">
                    title
                    <button class="btn btn-close" @click="closeModal()">
                        <vue-feather type="x" size="20" class="ml-2"></vue-feather>
                    </button>
                </div>
                <div class="vue-modal-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta, et, quia voluptatum eaque eligendi nesciunt at tempora inventore repellendus ex ut excepturi unde consequatur, beatae ipsam voluptatem aperiam enim similique blanditiis consectetur assumenda eum magnam. Nihil consequuntur, obcaecati autem debitis ipsa cumque! Minus, ipsa excepturi voluptatum optio repellendus dolorum. At aut unde totam labore ad quam nemo dignissimos voluptatem, natus sequi, repellat culpa dolorem iste consectetur cumque corrupti enim eius, quae magni suscipit accusantium blanditiis. Eos voluptatum porro hic, et perferendis, alias suscipit error blanditiis, laboriosam temporibus architecto eaque illo praesentium repellat veritatis quas. Iusto hic possimus incidunt asperiores!
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
    props: ['movie'],

    setup(props, context) {
        const show = ref(false)

        return {
            show,
            showModal(){
                show.value = true
                console.log('show modal window')
                document.querySelector("body").classList.add("modal-visible");
            },

            closeModal() {
                show.value = false
                console.log('close modal window')
                context.emit('closeModal')
                document.querySelector("body").classList.remove("modal-visible");
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
    max-width: 640px;
    background-color: #000;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.75);
    z-index: 101;
}
</style>
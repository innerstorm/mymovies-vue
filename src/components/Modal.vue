<template>
    <Transition name="fade">
        <div v-if="show">
            <div class="modal-mask" @click="closeModal"></div>
            <div class="modal-wrapper">
                <div class="modal-container bg-base-300">
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <button class="btn btn-close" @click="closeModal">
                            <vue-feather type="x" class=""></vue-feather>
                        </button>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    props: ["show"],
    emits: ["closeModal"],
    setup(props, context) {
        return {
            closeModal() {
                context.emit("closeModal");
            },
        };
    },
};
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
}

.modal-wrapper {
}

.modal-container {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 960px;
    max-height: 90%;
    overflow: hidden;
    margin: 0px auto;
    border-radius: 1rem;
    box-shadow: 0 0 100px -10px rgba(128, 120, 110, 0.75);
    transition: all 0.3s ease;
}

.modal-body {
    display: flex;
}

.modal-container .btn-close {
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

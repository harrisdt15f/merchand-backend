<template>
    <div @dblclick="dblclick" v-if="show" class="conta">
        <div class="loading"></div>
        <div class="msg">{{'拼命加载中'}}</div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    props:{
        show:Boolean
    },
    data() {
        return {
            // show: false
        }
    },
    methods: {
        dblclick() {
            this.$emit('update:show',false)
        }
    },
}
</script>

<style scoped>
.conta {
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 100px;
    border-radius: 5px;
    background: rgba(255, 255, 255, .6);
    transform: translate(-50%, -50%);
    z-index: 10003;
}

.loading {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 2px solid #e9e7e7;
    border-right-color: #4c8bfd;
    animation: loading 1s linear infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.msg {
    position: absolute;
    margin-top: 20px;
    color: #4c8bfd;
}
</style>
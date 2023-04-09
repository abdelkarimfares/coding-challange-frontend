<script lang="ts">

export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'button'
        },
        text: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
        }
    }
}

</script>
<template>
    <div :class="[type, 'alert'].join(' ')">{{ text }}</div>
</template>

<style scoped>
.alert {
    padding: 5px 10px;
    font-size: 13px;
    background-color: #DDD;
    border-radius: 3px;
    margin-bottom: 8px;
}

.alert.error {
    background-color: rgb(199, 22, 22);
    color: #FFF;
}

.alert.success {
    background-color: rgb(65, 137, 55);
    color: #FFF;
}
</style>
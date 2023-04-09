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
    <button :type="type" :disabled="disabled" @click="$emit('click', $event)">{{ text }}</button>
</template>

<style scoped>
button {
    display: inline-block;
    padding: 10px 20px;
    border: 0;
    background: rgba(49, 163, 49, 0.499);
    color: #FFF;
    cursor: pointer;
}
button:disabled{
    cursor: not-allowed;
}

</style>
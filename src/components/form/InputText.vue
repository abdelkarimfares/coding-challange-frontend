<script lang="ts">

export default {
    name: 'InputText',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        }
    }
}

</script>

<template>
    <div class="input-wrapper">
        <label>{{ label }}</label>
        <input @input="$emit('update:modelValue', $event.target.value)" :type="type" :value="value">
        <div class="error-message" v-if="error">{{ error }}</div>
    </div>
</template>

<style>
.input-wrapper{
    margin-bottom: 20px;
}

.input-wrapper label{
    font-size: 15px;
    font-weight: 500;
}

.input-wrapper input{
    display: block;
    padding: 5px 10px;
    border: 1px solid rgba(62, 203, 62, 0.499);
    margin: 4px 0;
    width: 100%;

}
.error-message{
    font-size: 13px;
    color: rgb(199, 22, 22);
    line-height: 1.2;
}
</style>
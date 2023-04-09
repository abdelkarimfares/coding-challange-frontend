<script lang="ts">

export default {
    name: 'Checkbox',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        checked: Boolean,
        id: String
    },

}

</script>

<template>
    <div class="checkbox-wrapper">
        <input :id="id" @input="$emit('update:modelValue', $event.target.value)" type="checkbox" :value="value">
        <label :for="id">{{ label }}</label>
    </div>
</template>

<style>
.checkbox-wrapper{
    margin-bottom: 5px;
}

.checkbox-wrapper label{
    margin-left: 10px;
}

</style>
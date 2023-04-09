<script lang="ts">
export default {
    name: 'Pagination',
    props: {
        count: Number,
        perPage: Number
    },
    data() {
        return {
            currentPage: 1
        }
    },
    computed: {
        canMoveNext() {
            return this.currentPage < Math.ceil(this.count / this.perPage)
        },
        canMovePrev() {
            return this.currentPage > 1
        },
    }
}
</script>

<template>
    <div class="pagination">
        <button @click="$emit('prev', --currentPage)" type="button" :disabled="!canMovePrev">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="$emit('next', ++currentPage)" type="button" :disabled="!canMoveNext">Next</button>
    </div>
</template>

<style scoped>
.pagination {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.pagination span {
    display: inline-block;
    padding: 10px;
}
</style>

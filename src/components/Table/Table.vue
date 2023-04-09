<script lang="ts">
export default {
    name: 'Table',
    props: {
        columns: {
            type: Array<{ key: string, label: string }>,
            required: true
        },
        items: {
            type: Array<any>,
            required: true
        },
        withActions: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
                <th v-if="withActions">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td v-for="column in columns">{{ item[column.key] }}</td>
                <td v-if="withActions">
                    <div class="actions">
                        <slot name="actions" :item="item"></slot>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.table {
    border-collapse: collapse;
    width: 100%;
}

th {
    font-weight: bold;
}

table,
th,
td {
    border: 2px solid #DDD;
    padding: 10px 15px;
    text-align: center;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

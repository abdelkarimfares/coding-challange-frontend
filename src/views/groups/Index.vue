<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Table from '@/components/Table/Table.vue';
import Pagination from '@/components/Pagination.vue';

export default {
    data() {
        return {
            page: 1,
            loading: false,
            pagedGroups: null,
            columns: [
                { key: 'name', label: 'Name' },
                { key: 'description', label: 'Description' },
            ]
        }
    },
    components: { Table, Pagination },
    computed: {
        ...mapGetters({ isAuthenticated: 'auth/isAuthenticated' }),
        getPagedGroups() {
            return this.pagedGroups || {};
        }
    },
    beforeMount() {
        this.load();
    },
    methods: {
        ...mapActions({
            loadGroups: 'group/loadPagedGroups',
            deleteGroup: 'group/deleteGroup',
        }),
        remove(id: Number) {

            if(!this.isAuthenticated){
                return this.$router.push({name: 'login'})
            }

            this.deleteGroup({ id })
            .then(res => {
                this.load(this.page);
            })
            .catch(err => {
                alert('You Can\'t delete this group right now!, please try again later.');
            })
        },
        load(page: number = 1) {
            this.page = page;
            this.loadGroups({ page })
                .then(data => {
                    this.pagedGroups = data;
                })
        }
    }
}
</script>

<template>
    <main>
        <div class="table-header">
            <h1>groups List</h1>
            <span>
                <router-link class="btn" to="/groups/create">Create group</router-link>
            </span>
        </div>
        <hr>
        <br>
        <Table :items="getPagedGroups.items" :columns="columns">
            <template v-slot:actions="slotProps">
                <span><router-link class="btn" :to="`/groups/edit/${slotProps.item.id}`">Edit</router-link></span>
                <span><router-link class="btn" :to="`/groups/show/${slotProps.item.id}`">Show</router-link></span>
                <button @click="remove(slotProps.item.id)" class="btn" type="button">Delete</button>
            </template>
        </Table>
        <Pagination :per-page="getPagedGroups.per_page" :count="getPagedGroups.count" @next="$index => load($index)"
            @prev="$index => load($index)"></Pagination>
    </main>
</template>

<style scoped>
.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    display: inline-block;
    padding: 8px;
    border: 1px solid #CCC;
    line-height: 1.2;
    margin: 5px;
}
</style>

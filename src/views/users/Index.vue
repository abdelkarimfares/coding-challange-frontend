<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Table from '@/components/Table/Table.vue';
import Pagination from '@/components/Pagination.vue';

export default {
    data() {
        return {
            page: 1,
            loading: false,
            pagedUsers: null,
            columns: [
                { key: 'firstname', label: 'first name' },
                { key: 'lastname', label: 'last name' },
                { key: 'phone', label: 'phone' },
                { key: 'email', label: 'email' },
                { key: 'age', label: 'age' },
                { key: 'type', label: 'type' }
            ]
        }
    },
    components: { Table, Pagination },
    computed: {
        ...mapGetters({ isAuthenticated: 'auth/isAuthenticated' }),
        getPagedUsers() {
            return this.pagedUsers || {};
        }
    },
    beforeMount() {
        this.load();
    },
    methods: {
        ...mapActions({
            loadUsers: 'user/loadUsers',
            deleteUser: 'user/deleteUser',
        }),
        remove(id: Number) {

            if (!this.isAuthenticated) {
                return this.$router.push({ name: 'login' })
            }

            this.deleteUser({ id })
                .then(res => {
                    this.load(this.page);
                })
                .catch(err => {
                    alert('You Can\'t delete this user right now!, please try again later.');
                })
        },
        load(page: number = 1) {
            this.page = page;
            this.loadUsers({ page })
                .then(data => {
                    this.pagedUsers = data;
                })
        }
    }
}
</script>

<template>
    <main>
        <div class="table-header">
            <h1>Users List</h1>
            <span>
                <router-link class="btn" to="/users/create">Create User</router-link>
            </span>
        </div>
        <hr>
        <br>
        <Table :items="getPagedUsers.items" :columns="columns">
            <template v-slot:actions="slotProps">
                <span><router-link class="btn" :to="`/users/edit/${slotProps.item.id}`">Edit</router-link></span>
                <span><router-link class="btn" :to="`/users/show/${slotProps.item.id}`">Show</router-link></span>
                <button @click="remove(slotProps.item.id)" class="btn" type="button">Delete</button>
            </template>
        </Table>
        <Pagination :per-page="getPagedUsers.per_page" :count="getPagedUsers.count" @next="$index => load($index)"
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

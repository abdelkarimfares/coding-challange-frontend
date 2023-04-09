<script lang="ts">
import { mapActions } from "vuex";
export default {
    data() {
        return {
            userData: null,
        }
    },
    computed: {
        getUserData() {
            return this.userData
        }
    },
    beforeMount() {
        this.loadUser({ id: this.$route.params.id })
            .then(user => {
                this.userData = user;
            })
            .catch(err => {
                this.$router.push({ name: '404' })
            })
    },
    methods: {
        ...mapActions({
            loadUser: 'user/loadUser',
        })
    }
}
</script>

<template>
    <h1>User Details</h1>
    <table v-if="getUserData">
        <tr>
            <th>Fist Name:</th>
            <td>{{ getUserData.firstname }}</td>
        </tr>
        <tr>
            <th>Last Name:</th>
            <td>{{ getUserData.lastname }}</td>
        </tr>
        <tr>
            <th>Phone:</th>
            <td>{{ getUserData.phone }}</td>
        </tr>
        <tr>
            <th>Email:</th>
            <td>{{ getUserData.email }}</td>
        </tr>
        <tr>
            <th>Age:</th>
            <td>{{ getUserData.age }}</td>
        </tr>
        <tr>
            <th>Type:</th>
            <td>{{ getUserData.type }}</td>
        </tr>
    </table>
    <h3>Groups</h3>
    <ul>
        <li v-for="group in getUserData.groups" :key="group.id">
            <h5>{{ group.name }}</h5>
            <p>{{ group.description }}</p>
            <hr>
        </li>
    </ul>
</template>
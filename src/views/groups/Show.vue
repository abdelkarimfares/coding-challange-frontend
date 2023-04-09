<script lang="ts">
import { mapActions } from "vuex";
export default {
    data() {
        return {
            groupData: null,
        }
    },
    computed: {
        getUserData() {
            return this.groupData
        }
    },
    beforeMount() {
        this.loadGroup({ id: this.$route.params.id })
            .then((group: any) => {
                this.groupData = group;
            })
            .catch(err => {
                this.$router.push({ name: '404' })
            })
    },
    methods: {
        ...mapActions({
            loadGroup: 'group/loadGroup',
        })
    }
}
</script>

<template>
    <h1>Group Details</h1>
    <table v-if="groupData">
        <tr>
            <th>Name:</th>
            <td>{{ groupData.name }}</td>
        </tr>
        <tr>
            <th>Description:</th>
            <td>{{ groupData.description }}</td>
        </tr>
    </table>
</template>
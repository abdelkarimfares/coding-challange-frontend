<script lang="ts">
import { mapActions } from "vuex";
import InputText from "@/components/form/InputText.vue";
import Button from "@/components/Button/Index.vue";
import Alert from "@/components/Alert/Index.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import TextArea from "@/components/form/TextArea.vue";

export default {
    data() {
        return {
            isUpdateMode: false,
            groupId: null,
            errors: null,
            message: '',
            form: {
                name: '',
                description: ''
            }
        }
    },
    components: {
        InputText,
        Button,
        Alert,
        Checkbox,
        TextArea
    },
    computed: {
        isValid() {
            return !!this.form.name
                && !!this.form.description
        }
    },
    beforeMount() {
        if (this.$route.name === 'edit-group') {
            this.isUpdateMode = true;
            this.loadGroup({ id: this.$route.params.id })
                .then(group => {
                    this.form.name = group.name;
                    this.form.description = group.description;
                    this.groupId = group.id
                })
                .catch(error => {
                    this.$router.push({ name: "404" })
                })
        }

    },
    methods: {
        ...mapActions({
            createGroup: 'group/createGroup',
            editGroup: 'group/editGroup',
            loadGroup: 'group/loadGroup',
        }),
        onSubmit(event: any) {
            event.preventDefault();
            this.processSubmit()
                .then(() => this.$router.push({ name: 'groups' }))
                .catch((error: any) => {
                    if (error.statusCode === 403) {
                        this.errors = error.body.errors
                    } else {
                        this.message = 'Internal server error'
                    }
                })
        },
        processSubmit() {
            return this.isUpdateMode
                ? this.editGroup({ id: this.groupId, data: this.form })
                : this.createGroup(this.form)
        },
        getError(key: string) {
            return this.errors && this.errors[key] ? this.errors[key][0] : '';
        }
    }
}
</script>

<template>
    <h1 class="headline">{{ isUpdateMode ? 'Edit Group' : 'Create Group' }}</h1>
    <form class="group-form" @submit="onSubmit">
        <InputText type="text" label="Name" v-model="form.name" :value="form.name" :error="getError('name')" />
        <TextArea label="Description" v-model="form.description" :value="form.description"></TextArea>
        <Button type="submit" text="Save" :disabled="!isValid"></Button>
    </form>
</template>

<style scoped>
.headline {
    text-align: center;
}

.group-form {
    max-width: 600px;
    margin: auto;
    margin-top: 50px;
    background: #FFF;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
}
</style>
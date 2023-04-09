<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import InputText from "@/components/form/InputText.vue";
import Button from "@/components/Button/Index.vue";
import Alert from "@/components/Alert/Index.vue";
import Checkbox from "@/components/form/Checkbox.vue";

export default {
    data() {
        return {
            isUpdateMode: false,
            userId: null,
            errors: null,
            message: '',
            groups: [],
            form: {
                firstname: '',
                lastname: '',
                username: '',
                phone: '',
                email: '',
                password: '',
                age: null,
                groups: []
            }
        }
    },
    components: {
        InputText,
        Button,
        Alert,
        Checkbox
    },
    computed: {
        isValid() {
            return !!this.form.username
                && !!this.form.firstname
                && !!this.form.lastname
                && !!this.form.phone
                && !!this.form.age
                && (this.isUpdateMode || !!this.form.password)
        }
    },
    beforeMount() {
        this.loadAllGroups({page: 1, perPage: -1})
        .then(res => {
            this.groups = res.items
        });

        if (this.$route.name === 'edit-user') {
            this.isUpdateMode = true;
            this.loadUser({ id: this.$route.params.id })
                .then(user => {
                    this.form.username = user.username;
                    this.form.firstname = user.firstname;
                    this.form.lastname = user.lastname;
                    this.form.phone = user.phone;
                    this.form.email = user.email;
                    this.form.age = user.age;
                    this.form.groups = user.groups.map((group: any) => group.id);
                    this.userId = user.id
                })
                .catch(err => {
                this.$router.push({ name: '404' })
            })
        }

    },
    methods: {
        ...mapActions({
            loadAllGroups: 'group/loadPagedGroups',
            createUser: 'user/createUser',
            editUser: 'user/editUser',
            loadUser: 'user/loadUser',
        }),
        onSubmit(event: any) {
            event.preventDefault();
            this.processSubmit()
                .then(() => this.$router.push({ name: 'users' }))
                .catch(error => {
                    if (error.statusCode === 403) {
                        this.errors = error.body.errors
                    } else {
                        this.message = 'Internal server error'
                    }
                })
        },
        processSubmit() {
            return this.isUpdateMode
                ? this.editUser({ id: this.userId, data: this.form })
                : this.createUser(this.form)
        },
        getError(key: string) {
            return this.errors && this.errors[key] ? this.errors[key][0] : '';
        }
    }
}
</script>

<template>
    <h1 class="headline">{{ isUpdateMode ? 'Edit User' : 'Create User' }}</h1>

    <form class="user-form" @submit="onSubmit">
        <div class="row">
            <div class="col-1">
                <InputText type="text" label="Username" v-model="form.username" :value="form.username"
                    :error="getError('username')" />
                <InputText type="text" label="First Name" v-model="form.firstname" :value="form.firstname"
                    :error="getError('firstname')" />
                <InputText type="text" label="Last Name" v-model="form.lastname" :value="form.lastname"
                    :error="getError('lastname')" />
                <InputText type="text" label="Phone" v-model="form.phone" :value="form.phone" :error="getError('phone')" />
                <InputText type="number" label="Age" v-model="form.age" :value="form.age" :error="getError('age')" />
                <InputText type="email" label="Email" v-model="form.email" :value="form.email" :error="getError('email')" />
                <InputText type="password" label="Password" v-model="form.password" :value="form.password"
                    :error="getError('password')" />
            </div>
            <div class="col-2">
                <h3>Attach to Groups</h3>
                <div class="checkbox-wrapper" v-for="group in groups">
                    <input :id="'group-' + group.id" v-model="form.groups" type="checkbox" :value="group.id">
                    <label :for="'group-' + group.id">{{ group.name }}</label>
                </div>
            </div>
        </div>
        <Button type="submit" text="Save" :disabled="!isValid"></Button>
    </form>
</template>

<style scoped>
.headline {
    text-align: center;
}

.user-form {
    max-width: 600px;
    margin: auto;
    margin-top: 50px;
    background: #FFF;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
}

.row {
    display: flex;
}

.col-1 {
    min-width: 300px;
}

.col-2 {
    padding-left: 20px;
}
</style>
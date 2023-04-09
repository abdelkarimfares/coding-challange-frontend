<script lang="ts">
import { mapActions, mapMutations } from "vuex";
import InputText from "@/components/form/InputText.vue";
import Button from "@/components/Button/Index.vue";
import Alert from "@/components/Alert/Index.vue";

export default {
    data() {
        return {
            message: '',
            errors: null,
            form: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        InputText,
        Button,
        Alert
    },
    computed: {
        isValid() {
            return !!this.form.email && !!this.form.password
        }
    },
    methods: {
        ...mapActions({ signin: 'auth/signin' }),
        ...mapMutations({ setAuthenticatedUser: 'auth/SET_CURRENT_USER' }),
        onSubmit(event: any) {
            event.preventDefault();
            if (!this.isValid) { return }

            this.signin(this.form)
                .then(res => {
                    this.$router.push('/')
                })
                .catch(error => {
                    if (error.statusCode === 401) {
                        this.message = 'Email Or Password is invalid!'
                    } else if (error.statusCode === 403) {
                        this.errors = error.body.errors;
                    } else {
                        this.message = 'Internal Server error!'
                    }
                })
        },
        getError(key: string) {
            return this.errors && this.errors[key] ? this.errors[key][0] : '';
        }
    }
}
</script>

<template>
    <div class="login-wrapper">
        <h1>Login</h1>
        <Alert  v-if="message" :text="message" type="error"></Alert>
        <form @submit="onSubmit">
            <InputText type="email" label="Email" v-model="form.email" :value="form.email" :error="getError('email')">
            </InputText>
            <InputText type="password" label="Password" v-model="form.password" :value="form.password"
                :error="getError('password')"></InputText>
            <Button text="Login" type="submit" :disabled="!isValid" />
        </form>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
}

.login-wrapper {
    max-width: 300px;
    margin: 100px auto;
    padding: 25px;
    background-color: #FFF;
    border: 1px solid #EEE;
}
</style>
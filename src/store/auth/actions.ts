import { auth } from "@/core/auth"

export default {
    signin: (context: {commit: any}, payload: {email: string, password: string}) => {
        return auth.signin(payload)
    },
}
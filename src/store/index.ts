import { createStore } from 'vuex'
import userModule from "./user"
import groupModule from "./group"
import authModule from "./auth"

export default createStore({
    modules: {
        user: userModule,
        group: groupModule,
        auth: authModule
    }
})

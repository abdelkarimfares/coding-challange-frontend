import { userService } from "@/core/data-resolver";

export default {
    loadUsers: ({commit}: {commit: any}, payload: {page: Number}): Promise<any> => {
        return userService.loadUsers({page: payload?.page || 1})
    },

    loadUser: (context: {commit: any}, payload: {id:any}): Promise<any> => {
        return userService.loadUser(payload.id)
    },

    createUser: ({commit}: {commit: any}, payload:any): Promise<any> => {
        return userService.createUser(payload)
    },

    editUser: ({commit}: {commit: any}, payload: {id: Number, data: any}): Promise<any> => {
        return userService.editUser(payload.id, payload.data)
    },

    deleteUser: (context: {state:any, commit: any, dispatch: any}, payload: {id: Number}): Promise<any> => {
        return userService.deleteUser(payload.id)
    }
}
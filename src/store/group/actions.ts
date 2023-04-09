import { groupService } from "@/core/data-resolver";
import { MutationTypes } from "./mutations";

const baseUrl = 'http://localhost:8000/api';

export default {
    loadPagedGroups: ({commit}: {commit: any}, payload: {page: number, perPage?: number}): Promise<any> => {
        return groupService.loadPagedGroups(payload)
    },

    deleteGroup: (context: {state:any, commit: any}, payload: {id: Number}): Promise<any> => {
        return groupService.deleteGroup(payload.id)
    },

    loadGroup: (context: {commit: any}, payload: {id:any}): Promise<any> => {
        return groupService.loadGroup(payload.id)
    },

    createGroup: ({commit}: {commit: any}, payload:any): Promise<any> => {
        return groupService.createGroup(payload)
    },

    editGroup: ({commit}: {commit: any}, payload: {id: Number, data: any}): Promise<any> => {
        return groupService.editGroup(payload.id, payload.data)
    },
}
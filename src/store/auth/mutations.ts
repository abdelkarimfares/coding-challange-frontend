export enum MutationTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    SET_AUTHENTICATED = 'SET_AUTHENTICATED',
}

export default {
    [MutationTypes.SET_CURRENT_USER]: (state:any, payload:any) => { state.currentUser = payload },
    [MutationTypes.SET_AUTHENTICATED]: (state:any, payload:any) => { state.authenticated = payload }
}
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import state from './state'

export const KEY = 'user'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      items: [],
    },
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      setHealthRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('items', ref)
      })
    },
    getters: {
      getHealth: (state) => {
        return state.items
      },
    },
  })
}

export default createStore
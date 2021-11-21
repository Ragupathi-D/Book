import { sampleData } from '../../models/user'

const list = [...sampleData]
const autoIncrement = list ? list.length + 1 : 1;

export const user = {
  namespaced: true,
  state: {
    users : [...list],
    currentUser : {},
    autoIncrement  : autoIncrement
  },
  mutations: {
    addUser: (state, payload) => state.users.push(payload),
    logout: (state) => state.currentUser = {},
    autoIncrement : state => state.autoIncrement += 1,
    setCurrentUser : (state, payload) => state.currentUser = {...payload}
  },
  actions: {
    logout : ({commit}) => {
      commit('logout');
    },
    verifyLogin : async ({commit, state}, payload) => {
      const userName = payload.userName.trim()
      const userPassword = payload.pass.trim()
      const result = await state.users.find( x => x.userName == userName && x.pass == userPassword )
      if(result !== undefined)
        commit('setCurrentUser', result)
      return result
    },
    addUser: async ({ commit, state }, payload) => {
      const item = {...payload}
      if(!item.userId) {
        item.userId = state.autoIncrement
        await commit('autoIncrement')
      }
      await commit('addUser', item)
    },
  },
  getters: {
    getUsers: state => state.users,
    getCurrentUser : state => state.currentUser,
    getUserNameOnly : state => state.users.map( x => x.userName )
  }
};
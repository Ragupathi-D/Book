import { sampleData } from '../../models/user'

const list = [...sampleData]
const autoIncrement = list ? list.length + 1 : 1;

export const user = {
  namespaced: true,
  state: {
    users : [...list],
    currentUser : {},
    autoIncrement  : autoIncrement,
    navItem : {
      admin : [
        { title: 'Book', path: '/book', icon: 'mdi-book' },
        { title: 'Order', path: '/order', icon: 'mdi-alarm' },
      ],
      user : [
        { title: 'User', path: '/user', icon: 'mdi-book' },
        { title: 'Order', path: '/order', icon: 'mdi-alarm' },
      ]
    }
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
        await commit('setCurrentUser', result)
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
    getTypeUserOnly : state => state.users.map( x => { return {userId : x.userId, userName : x.userName, type : x.type}} ).filter( x => x.type != 'admin' ),
    getUserNameOnly : state => state.users.map( x => x.userName ),
    getNavItems : (state) => {
      if( state.currentUser.type === undefined  ) return []
      return state.navItem[ state.currentUser.type ]
    }
  }
};
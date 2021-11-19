import { sampleData } from '../../models/user'
import { getObjectData } from '../../helper/common'

const list = [...sampleData]

export const user = {
  namespaced: true,
  state: {
    users : [...list],
    currentUser : 1
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getUsers: state => state.users,
    getCurrentUser : state => {
      const user = getObjectData( state.users, state.currentUser, 'userId' )
      return user;
    }
  }
};
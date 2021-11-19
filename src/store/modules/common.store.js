import Common from '@/services/common.service'
import { errorHandling } from '@/helper/common.helper'

export const common = {
  namespaced: true,
  state: {
    overlay : false,
    drawer : false,
    checkPayout : 1,
  },
  mutations: {
    setOverlayer: (state, boolean) => state.overlay = boolean,
    setDrawer: (state, boolean) => state.drawer = boolean,
    setCheckPayout: (state, boolean) => state.checkPayout = boolean,      
  },
  actions: {
    fetchPayoutLock: async ({commit, dispatch}, payload) => {
      return await Common.checkPayoutLock(payload)
        .then(result => {
          commit('setCheckPayout', result.data[0].Locked)
          return result.data
        })
        .catch(error => {
          dispatch('MESSAGE/statusUpdate', errorHandling( error ), {root: true})
          commit('setCheckPayout', 1)
          return [];
        })
    },
    setOverlayer: ({ commit }, boolean) => commit('setOverlayer', boolean),
    setDrawer: ({ commit }, boolean) => commit('setDrawer', boolean),
  },
  getters: {
    getOverlay: state => state.overlay,
    getDrawer: state => state.drawer,
    getCheckPayout: state => state.checkPayout,
  }
};
import { getAlertIcon, statusHandle  } from '@/helper/common.helper'
import { messageModel } from '@/models/common.model'

export const message = {
    namespaced: true,
    state: {
      snackbar : false,
      timeout : 3000,
      text : '',
      x : null,
      y : null,
      color : null,
      vertical: null,
      icon : null
    },
    mutations: {
      setSnackbar: (state, boolean) => state.snackbar = boolean,
      updateALL: (state, payload) => {
        state = Object.assign(state, payload)
      }
    },
    actions: {
      setSnackbar: ({ commit }, boolean) => commit('setSnackbar', boolean),  
      updateALL: ({ commit }, payload) => {
        payload = Object.assign( {}, messageModel(), payload )
        if(payload.icon === null || payload.icon === undefined ){
          payload.icon =  getAlertIcon(payload.color)
        }
        commit('updateALL', payload)
      },
      statusUpdate : ({dispatch}, payload) => {
        let details = {
          color : 'success',
        };
        
        details = Object.assign(details, statusHandle(payload.status))
        dispatch('updateALL', Object.assign({}, details, payload))
      }
    },
    getters: {
        getALL: state => state,
    }
};
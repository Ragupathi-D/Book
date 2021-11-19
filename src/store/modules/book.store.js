import { bookModel, sampleData } from '../../models/book'
// import { uuid } from '../../helper/common'

const list = [...sampleData]
const autoIncrement = list ? list.length + 1 : 1;

export const book = {
  namespaced: true,
  state: {
    bookList : [...list],
    orderBooks : [],
    autoIncrement  : autoIncrement // reason for list set default 
  },
  mutations: {
    setOrderBook : (state, payload) => state.orderBooks = [...payload],
    autoIncrement : state => state.autoIncrement += 1,
    addBook: (state, payload) => state.bookList.push(payload),
    deleteBook : (state, index) => {
      let book = state.bookList
      book[index].delete = true
      state.bookList = [...book]
    },
    updateBook : (state, payload) => {
      let book = [...state.bookList]
      book[payload.index] = Object.assign({...bookModel}, payload.item)
      state.bookList = [...book]
    }
  },
  actions: {
    setOrderBook : ({commit}, payload) => commit('setOrderBook', payload),
    addBook: ({ commit, state }, payload) => {
      const item = payload.item
      if(!item.bookId) {
        item.bookId = state.autoIncrement
        commit('autoIncrement')
      }
      commit('addBook', item)
    },
    deleteBook: ( {commit}, payload ) => commit('deleteBook', payload.index),
    updateBook: ({commit}, payload) => commit('updateBook', payload) 
  },
  getters: {
    getBooks: state => {
      const book = state.bookList.filter( x => x.delete === false)
      return book
    },
    getOrderBook : state => state.orderBooks 
  }
};
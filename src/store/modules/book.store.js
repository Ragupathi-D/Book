import { bookModel, sampleData, sampleOrder } from '../../models/book'

// import { uuid } from '../../helper/common'

const list = [...sampleData]
const autoIncrement = list ? list.length + 1 : 1;
const sampleOrderList = [...sampleOrder]

export const book = {
  namespaced: true,
  state: {
    bookList : [...list],
    orderBooks : [...sampleOrderList],
    autoIncrement  : autoIncrement // reason for list set default 
  },
  mutations: {
    setOrderBook : (state, payload) => state.orderBooks.push({...payload}),
    autoIncrement : state => state.autoIncrement += 1,
    addBook: (state, payload) => state.bookList.push({...payload}),
    deleteBook : (state, index) => {
      let book = state.bookList
      book[index].delete = true
      state.bookList = [...book]
    },
    updateBook : (state, payload) => {
      let book = [...state.bookList]
      book[payload.index] = Object.assign({...bookModel}, payload.item)
      state.bookList = [...book]
    },
    deleteOrderBook : (state, index) => state.orderBooks = state.orderBooks.filter((_, i) => i != index )
  },
  actions: {
    deleteOrderBook : ({commit}, payload) => commit('deleteOrderBook', payload),
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
    updateBook: ({commit}, payload) => commit('updateBook', payload),
    validationBuy : (item) => {
      console.log(item)
      return ''
    }
  },
  getters: {
    getBooks: state => {
      const book = state.bookList.filter( x => x.delete === false)
      return book
    },
    getOrderBook : state => state.orderBooks 
  }
};
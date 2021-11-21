import { orderModel, sampleData } from '../../models/order'
import { getObjectData, nowDate } from '../../helper/common' 

const list = [...sampleData]

const autoIncrement = list ? list.length + 1 : 1;

export const order = {
  namespaced: true,
  state: {
    orders : [...list],
    autoIncrement  : autoIncrement // reason for list set default 
  },
  mutations: {
    autoIncrement : ( state ) => state.autoIncrement += 1,
    addBook: (state, payload) => state.orders = [...state.orders, ...payload],
    deleteBook : (state, index) => state.orders = state.orders.filter((_, k) =>  k != index),
    updateBook : (state, payload) => {
      let book = [...state.orders]
      book[payload.index] = Object.assign({...orderModel}, payload.item)
      state.orders = [...book]
    }
  },
  actions: {
    addBook: ({ commit, state }, payload) => {
      const item = payload
      const now = nowDate()
      item.forEach(element => {
        if(!element.orderId) {
          element.orderId = state.autoIncrement
          element.orderDate = now
          element.amount = element.qty * element.price
          commit('autoIncrement')
        }
      });
      commit('addBook', item)
    },
    deleteBook: ( {commit}, payload ) => commit('deleteBook', payload.index),
    updateBook: ({commit}, payload) => commit('updateBook', payload) 
  },
  getters: {
    displayOrders: (state, _, __, rootGetters) => {
      const book =  rootGetters['BOOK/getBooks']
      let tempBook = {};
      const user = rootGetters['USER/getUsers']
      let tempUser = {}
      const orders = state.orders
      let result = [];
      
      orders.forEach(element => {
        if(element.delete === true) {
          return;
        }
        if(!tempBook[element.bookId]){
          tempBook[element.bookId] = getObjectData( book, element.bookId, 'bookId' );
        }
        if(!tempUser[element.userId]){
          tempUser[element.userId] = getObjectData( user, element.userId, 'userId' );
        }
        const bookDetails = tempBook[element.bookId]
        const userDetails = tempUser[element.userId]
        result.push( Object.assign({}, element, 
          {
            userName : userDetails.userName,
            email : userDetails.email,
            bookName : bookDetails.title,
            authorName : `${bookDetails.authorName} (${bookDetails.edition})`,
          } 
        ));
      });
      return result
    },
  }
};
import { nowDate } from "../helper/common"

export const orderModel =  {
  amount : '',
  orderDate : '',
  qty : '',
  price : '',
  orderId : null,
  bookId : null,
  userId : null,
  delete : false
}

export const sampleData =  [
  {
    amount : 250,
    orderDate : nowDate(),
    qty : 5,
    price : 250,
    orderId : 1,
    bookId : 1,
    userId : 2, 
    delete : false
  }
]
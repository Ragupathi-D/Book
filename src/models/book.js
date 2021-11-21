// export const bookModel =  {
//   image : "@/assets/logo.png",
//   title : '',
//   description : '',
//   authorName : '',
//   bookId : null,
//   delete : false,
//   editions : []
// }

// export const bookEditionModel = {
//   edition : '',
//   price : '',
//   description : '',
//   stock : '',
//   delete : false
// }

export const bookModel =  {
  image : "@/assets/logo.png",
  title : '',
  edition : "",
  description : '',
  authorName : '',
  bookId : null,
  delete : false,
  price : '',
  stock : ''
}

export const sampleData = [
  {
    image : "/img/docks.jpg",
    title : 'Finibus',
    edition : 'Dummy',
    description : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    authorName : 'Lorem',
    stock : 5,
    price : 100,
    bookId : 1,
    delete : false
  },
  {
    image : "/img/docks.jpg",
    title : 'Bonorum',
    edition : 'Layout',
    description : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    authorName : 'Ipsum',
    stock : 5,
    price : 150,
    bookId : 2,
    delete : false
  }
]

export const sampleOrder = [
  {
    userId : 2,
    title : 'Finibus',
    price : 150,
    qty : 5, 
    bookId : 1
  },
  {
    userId : 2,
    title : 'Bonorum',
    price : 300,
    qty : 6,
    bookId : 2
    
  }
]
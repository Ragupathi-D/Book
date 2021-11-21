<template>
  <Fragment>
      <!-- <v-toolbar
      v-if="true === true"
    dark
    color="teal"
  >
    <v-toolbar-title>Select </v-toolbar-title>

    <v-spacer></v-spacer>
      <v-autocomplete
      
        v-model="selectedBooks"
        :items="getUniqueBooks"
        filled
        dense
        color="blue-grey lighten-2"
        label="Select"
        item-text="title"
        item-value="bookId"
        solo-inverted
        multiple
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-avatar left>
              <v-img src="@/assets/logo.png"></v-img>
            </v-avatar>
            {{ data.item.title }}
          </v-chip>
        </template>


        <template v-slot:item="data">
          <v-list-item-avatar>
            <img src="@/assets/logo.png">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="data.item.authorName"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
      
    </v-toolbar> -->
    <v-card elevation="0" >
      <crud-data-table
        :headers="headers"
        :defaultItem="defaultValue"
        :value="getOrderBook"
        :items="getSelectedBooks"
        itemKey="bookId"
        :setEditedItem.sync="setEditedItem"
        @selectedValue="setOrderBook"
        @AddItem="addItem"
        @DeleteItem="deleteItem"
        @UpdateItem="updateItem"
      >

          <!-- @DeleteItem="fetchDropDown"
        @EditItem="EditPPIInfo"
            @AddItem="addItem"

        @UpdateItem="EditPPIInfo" -->
        <!-- <template v-slot:body >
            {{ $slots }}

        </template> -->
      <template v-slot:forms="{ editedItem }" >
        <v-row
          class="justify-end"
          dense
        >
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="editedItem.title"
              label="Book Name"
              type="text"
            >
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="editedItem.authorName"
              label="Author Name"
              type="text"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.edition"
              label="Edition"
              type="text"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.description"
              label="Description"
              type="text"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="editedItem.price"
              label="Price"
              type="text"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="editedItem.stock"
              label="Stock"
              type="text"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </template>
      </crud-data-table>
    </v-card>
  </Fragment>
</template>

<script>
import CrudDataTable from '../common/CrudDataTable.vue'
import { bookModel } from '../../models/book.js'
import { mapActions, mapGetters } from 'vuex';

import { Fragment } from 'vue-fragment'

export default {
  components : {
    CrudDataTable,
    Fragment,
  }, // getBookByUser
  async created() {
    let meta = this.$route.meta;
    if(meta.type) {
      if(meta.type != this.getCurrentUser.type) {
        await this.logoutProcess()
        this.$router.push('/login')
      }
    } 
  },
  computed:{
    ...mapGetters('BOOK', {
      getBooks : 'getBooks',
      getOrderBook : 'getOrderBook'
    }),
    ...mapGetters('USER', {
      getCurrentUser : 'getCurrentUser'
    }),
    getUniqueBooks () {
      let result = {};
      let data = [];
      this.getBooks.forEach(function(x){
        if(result[x.bookId] === undefined) {
          result[x.bookId] = {}
        }
        if(result[x.bookId][x.authorName] !== undefined) {
          return
        }        
        result[x.bookId][x.authorName] = true;
        data.push(x)
      })
      return data
    },
    getSelectedBooks () {
      
      if(this.selectedBooks.length === 0 ) {
        return this.getBooks
      }
      return this.getBooks.filter((x) => { return this.selectedBooks.includes( x.bookId )})
    }
  },
  methods: {

    ...mapActions('BOOK', {
      addItem : 'addBook',
      deleteItem : 'deleteBook',
      updateItem : 'updateBook',
      setOrderBook : 'setOrderBook',
    }),
    ...mapActions('USER',{
      'logoutProcess' : 'logout' 
    }),
    remove (item) {
      const index = this.selectedBooks.indexOf(item.bookId)
      if (index >= 0) this.selectedBooks.splice(index, 1)
    },
  },
  data: () => ({
    searchBookId : null,
    search : '',
    defaultValue : Object.assign({...bookModel}),
    setEditedItem : {},
    selectedBooks : [],
    headers : [
      {text : 'Title', value : 'title'},
      {text : 'Edition', value : 'edition'},
      {text : 'Author Name', value : 'authorName'},
      {text : 'Price', value : 'price'},
      {text : 'Available', value : 'stock'},
      {text : 'Edit', value : 'Edit'},
      {text : 'Delete',  value : 'Delete'}
    ],
  }),
}
</script>
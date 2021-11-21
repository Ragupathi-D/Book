<template>
  <Fragment>
    <crud-data-table
      :headers="headers"
      :defaultItem="defaultValue"
      :value="getOrderBook"
      :items="getBooks"
      :showSelect="true"
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
        <v-col>
          <h2 class="font-weight-bold black--text" >Book</h2>
        </v-col>
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
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="editedItem.description"
            label="book descrition"
            type="text"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" >
          <h2 class="font-weight-bold pink--text" >Edition</h2>
          <v-row v-for="(item, index) in editedItem.editions" :key="index" >
            <v-col cols="12" class="pb-0" >
              <v-divider class="mb-6 " v-if="index !== 0" ></v-divider>
              <h4 class="black--text" >Edition : {{ index + 1 }}</h4>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="item.edition"
                label="edition name"
                type="text"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="item.description"
                label="edition description"
                type="text"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="item.price"
                label="Price"
                type="text"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="item.qty"
                label="Qty"
                type="text"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="text-right" >
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="editedItem.editions.push({...bookEditionModel})" class="mr-2" >Add</v-btn>
              <v-btn v-show="index !== 0" color="pink" >Delete</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    </crud-data-table>
    <Buy

    ></Buy>
  </Fragment>
</template>

<script>
import CrudDataTable from '../common/CrudDataTable.vue'
import { bookModel, bookEditionModel } from '../../models/book.js'
import { mapActions, mapGetters } from 'vuex';

import { Fragment } from 'vue-fragment'
import Buy from './buy.vue';

export default {
  components : {
    CrudDataTable,
    Fragment,
    Buy
  }, // getBookByUser
  mounted () {
    console.log(this.$slots)
  },
  computed:{
    ...mapGetters('BOOK', {
      getBooks : 'getBooks',
      getOrderBook : 'getOrderBook'
    }),
    ...mapGetters('USER', {
      getCurrentUser : 'getCurrentUser'
    }),
  },
  methods: {
    ...mapActions('BOOK', {
      addItem : 'addBook',
      deleteItem : 'deleteBook',
      updateItem : 'updateBook',
      setOrderBook : 'setOrderBook',
    }),
    async pushProcess(editedItem) {
      const details = editedItem
      await details.editions.push({...bookEditionModel})
    }
  },
  data: () => ({
    defaultValue : Object.assign({...bookModel}, {editions : [{...bookEditionModel}]}),
    bookEditionModel : {...bookEditionModel},
    setEditedItem : {},
    headers : [
      {text : 'Title', value : 'title'},
      {text : 'Description', value : 'description'},
      {text : 'Author Name', value : 'authorName'},
      {text : 'Price', value : 'price'},
      {text : 'Available', value : 'stock'},
      {text : 'Action', value : 'Action'}
    ],
  }),
}
</script>
<template>
  <Fragment>
    <crud-data-table
      :headers="headers"
      :defaultItem="defaultValue"
      :value="getOrderBook"
      :items="getBooks"
      :showSelect="true"
      itemKey="bookId"
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
        <!-- <v-col
          cols="6"
          md="3"
        >
          <v-autocomplete
            v-model="editedItem.BuyOutFARID"
            :items="FARInfo"
            item-text="iboss_preferred_name"
            item-value="iboss_personal_info_id"
            label="BuyOut FARName"
          >
          </v-autocomplete>
        </v-col> -->
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="editedItem.title"
            label="Title"
            type="text"
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="editedItem.description"
            label="Description"
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
            v-model="editedItem.stock"
            label="Stock"
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="editedItem.price"
            label="Price"
            type="number"
          >
          </v-text-field>
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
import { bookModel } from '../../models/book.js'
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
      setOrderBook : 'setOrderBook'
    }),
  },
  data: () => ({
    defaultValue : Object.assign({...bookModel}),
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
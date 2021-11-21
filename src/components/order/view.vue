<template>
  <Fragment>
    <v-toolbar v-if="getCurrentUser.type == 'admin'" >
      <v-autocomplete
        v-model="selectedUser"
        class="mt-2"
        dense
        label="User Name"
        :items="getTypeUserOnly"
        item-text="userName"
        item-value="userId"
        clearable
        multiple
      >
      </v-autocomplete>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-toolbar>

    <crud-data-table
      :headers="headers"
      :items="filterUserDetails"
      :editBtn="false"
      :addBtn="false"
      :deleteBtn="false"
    >
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
  </Fragment>
</template>

<script>
import CrudDataTable from '../common/CrudDataTable.vue'
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment'

export default {
  components : {
    CrudDataTable,
    Fragment
  },
  created () {
    if(this.getCurrentUser.type == 'user') {
      this.selectedUser = [this.getCurrentUser.userId];
    }
  },
  computed:{
    ...mapGetters('ORDER', {
      displayOrders : 'displayOrders',
    }),
    ...mapGetters('USER', {
      getCurrentUser : 'getCurrentUser',
      getTypeUserOnly : 'getTypeUserOnly'
    }),
    filterUserDetails () {
      if(this.selectedUser.length === 0) {
        return this.displayOrders
      }
      return this.displayOrders.filter((x) => { return this.selectedUser.includes( x.userId )})
    }
  },
  data: () => ({
    headers : [
      {text : 'Order Id', value : 'orderId'},
      {text : 'Buyer Email', value : 'email'},
      {text : 'Book Name', value : 'bookName'},
      {text : 'Author (Edition)', value : 'authorName'},
      {text : 'Quantity', value : 'price'},
      {text : 'Order Date/Time', value : 'orderDate'},
      {text : 'Total amount', value : 'amount'}
    ],
    selectedUser : []
  }),
}
</script>
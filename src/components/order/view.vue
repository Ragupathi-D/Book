<template>
  <crud-data-table
    :headers="headers"
    :items="displayOrders"
    :editBtn="false"
    :addBtn="false"
    :deleteBtn="false"
  >
      <!-- @DeleteItem="fetchDropDown"
    @EditItem="EditPPIInfo"
        @AddItem="addItem"

    @UpdateItem="EditPPIInfo" -->
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
</template>

<script>
import CrudDataTable from '../common/CrudDataTable.vue'
import { mapGetters } from 'vuex';

export default {
  components : {
    CrudDataTable
  },
  created () {
    const header = [
      {text : 'Order Id', value : 'orderId'},
      {text : 'Buyer Email', value : 'email'},
      {text : 'Book Name', value : 'bookName'},
      {text : 'Quantity', value : 'price'},
      {text : 'Order Date/Time', value : 'orderDate'},
      {text : 'Total amount', value : 'amount'}
    ]
    this.headers = [...header]
  },
  computed:{
    ...mapGetters('ORDER', {
      displayOrders : 'displayOrders'
    }),
    // ...mapGetters('USER', {
    //   displayOrders : 'displayOrders'
    // }),
  },
  data: () => ({
    headers : []
  }),
}
</script>
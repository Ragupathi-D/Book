<template>
  <v-container fluid>

      <v-row>
        <v-col
          v-for="item in getBooks"
          :key="item.bookId"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-img
              class="white--text align-end ma-2"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img>
            <v-card-title >
              {{ item.title }}
            </v-card-title>
            <v-card-subtitle class="v-list-item__subtitle pt-0" >
              {{ item.authorName }}
            </v-card-subtitle>
            <v-divider>
            </v-divider>
            <v-card-actions>
              <v-btn
                color="teal"
                text
              >
                ${{item.price}}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="orange"
                @click="details(item)"
                icon
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    <v-navigation-drawer
      v-model="drawer"
      primary
      width="400"
      right
      fixed
      temporary
    >
      <v-card
        elevation="0"
      >
                  <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img>

        <v-card-title class="pink--text pb-2" >
          {{ needed.title }}
        </v-card-title>
        <v-card-subtitle class="pt-1" >
          {{ needed.authorName }}
        </v-card-subtitle>
        <!-- <v-card-text>
          {{ needed.description }}

        </v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
          >
          ${{needed.price}}
            buy
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-title class="mt-10 small font-weight-black blue--text" >Order Details</v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Title
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  Qty
                </th>
                <th class="text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in getOrderBook"
                :key="item.bookId"
              >
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.price * item.qty }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-right" >Total</th>
                <th>{{ totalAmount() }}</th>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-card>
    </v-navigation-drawer>
  </v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';


  export default {
    data () {
      return {
       drawer : false,
       needed : {},
      }
    },
    computed: {
      ...mapGetters('BOOK', {
        getBooks : 'getBooks',
        getOrderBook : 'getOrderBook'
      }),
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      totalAmount () {

        return this.getOrderBook.reduce((a, item) => (item.price * item.qty) + a, 0);
      },
      ...mapActions('BOOK', {
        setOrderBook : 'setOrderBook'
      }),
      details (item) {
        this.drawer = true;
        this.needed = Object.assign({}, item); 
      },
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
  }
</script>

<style scoped>
  .overflow-hidden {
    overflow: hidden;
    overflow-wrap : break-word
  }
</style>
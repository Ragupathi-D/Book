<template>
  <Fragment>
    <!-- {{ getOrderBook }}
    <nav-right-side
      :dialog="dialog"
      :items="getOrderBook"
      @update:dialog="dialog = $event"

    >
    </nav-right-side> -->
    <v-dialog
      v-model="dialog"
      width="360"
    >
      <v-card
        class=""
        outlined
      >
      
        <v-card-title class="text-h5 grey lighten-2">
          Buy Book
        </v-card-title>

      
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
                <td>1</td>
                <td>{{ item.price }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" ></th>
                <th>150.11</th>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>

          <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="buyProduct()"
          >
            Buy
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-fab-transition>

      <v-btn
        v-show="getOrderBook.length !== 0"
        @click="dialog = true"
        color="pink"
        dark
        fixed
        bottom
        right
        fab
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-fab-transition>
  </Fragment>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import NavRightSide from '../common/NavRightSide.vue';
import { Fragment } from 'vue-fragment'
import { nowDate } from "../../helper/common"


export default {
  components : {
    Fragment
  },
  computed:{
    ...mapGetters('BOOK', {
      getOrderBook : 'getOrderBook'
    }),
    ...mapGetters('USER', {
      getCurrentUser : 'getCurrentUser'
    }),
    ...mapGetters('ORDER', {
      displayOrders : 'displayOrders'
    }),
    
  },
  methods: {
    ...mapActions('BOOK', {
      setOrderBook : 'setOrderBook'
    }),
    ...mapActions('ORDER', {
      addBook : 'addBook'
    }),
    async buyProduct () {
      const now = nowDate();
      const userId = this.getCurrentUser.userId
      const result = await this.getOrderBook.map(function(value){
        const qty = 1
        return {
          orderId : null,
          qty : qty,
          price : value.price,
          bookId : value.bookId,
          userId : userId,
          amount : value.price * qty,
          delete : false,
          orderDate : now
        }
      });

      await this.addBook(result)
      this.dialog = false
      this.$router.push({ path: '/order/view' })
    }
  },
  data: () => ({
    dialog : false,
    headers : [
      {item: 'Book',  value: 'bookId'}
    ],
    items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
  }),
}
</script>
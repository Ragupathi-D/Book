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
          <v-card   @click="details(item)" >
            <v-img
              class="white--text align-end ma-2"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img>
            <v-card-title >
              {{ item.title }}
            </v-card-title>
            <v-card-subtitle class="v-list-item__subtitle small pt-0 font-italic" >
              {{ item.authorName }} ({{item.edition}})
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
                text
              >
                Add to Cart
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
        <div v-show="product" >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>

        <v-card-title class="pink--text pb-2" >
          {{ needed.title }}
        </v-card-title>
        <v-card-subtitle class="pt-1 font-italic" >
          {{ needed.authorName }}
          ({{ needed.edition }})
        </v-card-subtitle>
        <v-card-text>
          {{ needed.description }}

        </v-card-text>
        <v-card-actions>
          <v-badge
            bordered
            color="green"
            :content="needed.stock"
            overlap
            
          >

            <v-btn
              color="primary"
              small
            >
            ${{needed.price}}
              
            </v-btn>
          </v-badge>
          <v-spacer></v-spacer> 
          <v-btn-toggle>
          <v-btn
            x-small
            color="pink"
            text
            elevation="0"
            fab
            :disabled="qty == 1"
            @click="qty= qty - 1"
          >
          -
            
          </v-btn>
          <v-btn
            x-small
            fab
            text
          >
            {{qty}}
          </v-btn>
          <v-btn
            color="success"
            x-small
            elevation="0"
            fab
            text
            :disabled="qty >= needed.stock"
            @click="qty= qty + 1"
          >
          +
            
          </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            class="white--text"
            @click="addToCart(needed)"
          >
            Add to Cart
          </v-btn>
        </v-card-actions>
        </div>
        <v-divider></v-divider>
        <v-card-title class=" small font-weight-bold" >Order Details</v-card-title>
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
                <th class="text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="getOrderBook.length === 0" >
                <td colspan="5" class="text-center" >No Record Found</td>
              </tr>
              <tr
                v-for="(item, index) in getOrderBook"
                :key="index"
              >
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.price * item.qty }}</td>
                <td>
                  <v-btn
                    icon
                    color="primary"
                    @click="deleteOrderBook(index)"
                  >
                    <v-icon
                      small
                      color="red"
                    >
                      mdi-delete
                    </v-icon> 
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="4" class="text-right" >Total</th>
                <th>{{ totalAmount() }}</th>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            class="white--text"
            @click="buyAll"
          >
            Buy now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
    <v-btn
      bottom
      right
      color="pink"
      fixed
      elevation="2"
      fab
      @click="showCartDetails"
    >
      <v-icon color="white" >mdi-cart</v-icon>
    </v-btn>
  </v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import { nowDate } from '../../helper/common'

  export default {
    data () {
      return {
        drawer : false,
        needed : {},
        product : true,
        qty : 1
      }
    },
    async created() {
      let meta = this.$route.meta;
      if(meta.type) {
        if(meta.type != this.getCurrentUser.type) {
          await this.logoutProcess()
          this.$router.push('/login')
        }
      } 
    },
    watch : {
      drawer  (value) {
        this.qty = 1
        if(value === false) {
          this.product = true
        } 
      }
    },
    computed: {
      ...mapGetters('BOOK', {
        getBooks : 'getBooks',
        getOrderBook : 'getOrderBook'
      }),
      ...mapGetters('USER', {
        getCurrentUser : 'getCurrentUser'
      }),
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      ...mapActions('ORDER', {
        addBook : 'addBook'
      }),
      ...mapActions('BOOK', {
        validationBuy : 'validationBuy'
      }),
      ...mapActions('USER',{
        'logoutProcess' : 'logout' 
      }),
      async addToCart(item) {
        const now = nowDate();
        const userId = this.getCurrentUser.userId
        await this.setOrderBook({...item, qty : this.qty, orderDate : now, userId : userId})
      },
      async buyAll() {
        const error = await this.validationBuy( this.getOrderBook )
        if(error != '') {
          this.$alert("sorry ");
          return;
        }

        await this.addBook(this.getOrderBook)
        this.$router.push('/order/view');
      },
      showCartDetails () {
        this.product = false
        this.drawer = true
      },
      totalAmount () {
        return this.getOrderBook.reduce((a, item) => (item.price * item.qty) + a, 0);
      },
      ...mapActions('BOOK', {
        setOrderBook : 'setOrderBook',
        deleteOrderBook : 'deleteOrderBook'
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
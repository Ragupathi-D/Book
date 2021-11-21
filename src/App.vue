<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="@/assets/logo.svg"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Inventory</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        icon
        v-if="getCurrentUser.userId !== undefined"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main >
      <router-view/>
    </v-main>
    <v-footer app >
      @Ragupathi-D
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name : 'app',
    methods : {
      ...mapActions('USER',{
        'logoutProcess' : 'logout' 
      }),
      async logout(){
        await this.logoutProcess()
        this.$router.push('/login')
      }
      
    },
    computed: {
      ...mapGetters('USER', {
        getCurrentUser : 'getCurrentUser'
      })
    },
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Login', path: '/login', icon: 'mdi-book' },
          { title: 'User', path: '/user', icon: 'mdi-book' },
          { title: 'Book', path: '/book', icon: 'mdi-book' },
          { title: 'Order', path: '/order', icon: 'mdi-alarm' },
        ],
      }
    },
  }
</script>
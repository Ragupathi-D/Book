<template>
  <v-app>
    <div v-if="getCurrentUser.userId !== undefined" >
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
            <v-list-item-title>Inventory </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="item in navItems"
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
        <v-btn text target="_blank" href="https://github.com/Ragupathi-D/books" >Raguathi-D </v-btn>
      </v-footer>
    </div>
    <div v-else >
      <router-view/>
    </div>
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
        getCurrentUser : 'getCurrentUser',
        navItems : 'getNavItems'
      })
    },
    data () {
      return {
        drawer: null,
      }
    },
  }
</script>
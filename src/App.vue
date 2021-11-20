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
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main >
      <router-view/>
    </v-main>
    <v-footer app >
      @ragupathi asdfasdf asdfasdf asdfasdf
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name : 'app',
    data () {
      return {
        drawer: null,
        items: [
          { title: 'User', path: '/user', icon: 'mdi-book' },
          { title: 'Book', path: '/book', icon: 'mdi-book' },
          { title: 'Order', path: '/order', icon: 'mdi-alarm' },
        ],
      }
    },
  }
</script>
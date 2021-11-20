<template>
  <v-navigation-drawer
    primary
    width="400"
    v-model="ContolDrawer"
    right
    fixed
    temporary
  >
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="index"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="index"
        >
        <v-list-item-action>

          <!-- <v-badge
        bordered
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn
          class="white--text"
          color="error"
          depressed
        >
          Lock Account
        </v-btn>
      </v-badge> -->
      <!-- <v-badge
        bordered
        overlap
        small
      >
          <template v-slot:badge>
            {{ item.qty || 1 }}     
          </template>

          <v-avatar size="40">
            <v-img src="@/assets/logo.svg"></v-img>
          </v-avatar>
        </v-badge>
 -->
        </v-list-item-action>


          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
              <v-divider />
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>        
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      defaults: function(){
        return []
      }
    },
    drawer: {
      type: Boolean,
      defaults: false
    }
  },
  computed:{
    ContolDrawer:{
      set ( val ) {
        this.$emit('update:drawer', val);
      },
      get() {
        return this.drawer
      }
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    getImgUrl(q) {
      console.log(q)
      const images = require.context('@/assets/', false, /\.png$/)
      return images( 'logo.png' )
    }
  },
  data: () => ({

  })
}
</script>
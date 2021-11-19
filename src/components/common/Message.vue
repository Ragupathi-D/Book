<template>
  <v-snackbar
    v-model="snackbar"
    :value="message.value"
    :timeout="message.timeout"
    :color="message.color"

    :left="message.x === 'left'"
    :right="message.x === 'right'"
    :centered="message.x === 'center'"

    :top="message.y === 'top'"
    :bottom="message.y === 'bottom'"
  >
    <template v-if="message.icon" >
      <v-icon left >{{message.icon}}</v-icon>
    </template>

    {{ message.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click.stop="setSnackbar(false)"
        icon
      >
        <v-icon >mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Message',
  computed: {
    ...mapGetters('MESSAGE', {
      message : 'getALL',
    }),
    snackbar : {
      get() {
        return this.message.snackbar
      },
      set( val ) {
        this.setSnackbar( val )
      },
    }
  },
  methods : {
    ...mapActions('MESSAGE', {
      setSnackbar : 'setSnackbar'
    })
  },
}
</script>

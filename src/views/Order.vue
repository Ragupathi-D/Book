<template>
  <v-container fluid>
    <h3>Order Details</h3>
    <v-tabs v-show="false" fixed-tabs>
      <v-tab to="/order/view">Form</v-tab>
      <v-tab to="/order/order">View</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  
}
</script>
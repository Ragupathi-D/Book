<template>
  <v-container fluid  >
        <h2>Book Order</h2>
        <!-- <v-card> -->
          <v-tabs v-if="false" fixed-tabs >
            <v-tab to="/book/form">Form</v-tab>
            <v-tab to="/book/view">View</v-tab>
          </v-tabs>
          <router-view></router-view>
        <!-- </v-card> -->
  </v-container>
</template>

<script>

// import NavRightSide from "../components/common/NavRightSide.vue";

export default {
  components : {
    // NavRightSide
  }
}
</script>
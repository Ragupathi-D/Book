<template>

 <v-navigation-drawer 
     app v-model="drawer" color="blue-grey darken-4" dark expand-on-hover class="navigation_drawer" elavation="20"
    >
      <v-card
        color="primary"
        dark
        elevation="3"
        class="rounded-0"
      >
        <v-list-item class="px-2">

          <v-list-item-avatar>
            <v-img src="@/assets/ThinkBiGicon.png"></v-img>
          </v-list-item-avatar>
    
          <v-list-item-content>
            <v-list-item-title class="title">
              Ragupathi
            </v-list-item-title>
            
          </v-list-item-content>
        </v-list-item>

      </v-card>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
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
</template>
<script>
export default {
    name: 'navbar',
    data() {
        return {
            drawer: false,
             sheet: false,
              menu: false,
              menuu:false,
              hover:'',
            items: [
                { title: 'Visitor Management',icon: 'mdi-account-question',link:'/visitor' },
                { title: 'Attendance Report',icon: 'mdi-calendar-check',link:'/attendance' },
                { title: 'Training Department',icon: 'mdi-account-clock',link:'' },
                { title: 'Emergency Medicare/Medicare Innsurance',icon: 'mdi-account-settings',link:'' },
                { title: 'Human Resources',icon: 'mdi-briefcase-account-outline',link:'/applicantdata' },
                { title: 'Leave Management',icon: 'mdi-calendar-alert',link:'/ApplyLeave' },
                { title: 'Asset Management',icon: 'mdi-responsive',link:'' },
                { title: 'Stationery Management',icon: 'mdi-shopping',link:'' },
                { title: 'Travel Management',icon: 'mdi-airplane',link:'' },
                { title: 'Financial Management',icon: 'mdi-bank',link:'' },
                { title: 'Employee Details',icon: 'mdi-account-box-outline',link:'/employee' },
                { title: 'Company Policy',icon: 'mdi-tie',link:'' },
                { title: 'Help',icon: 'mdi-help-circle-outline',link:'' },

            ],
        }
    },
}
</script>
<style>
/* .v-list-group--active,.v-list-item--active{
color: teal !important;
} */

</style>
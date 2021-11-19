<template>
    <v-app-bar app absolute flat color="transparent" light class="change-font mt-2" >   
        <v-btn v-if="drawer" icon @click.stop="$emit('toggle-drawer')"  @click="drawer = !drawer" class="app_background ml-1">
            <v-icon >mdi-menu</v-icon>
        </v-btn> 
        <v-btn  v-else icon @click.stop="$emit('toggle-drawer')"  @click="drawer = !drawer" class="app_background ml-1">
            <v-icon >mdi-dots-vertical</v-icon>
        </v-btn> 

        <div class="d-flex flex-column ">
            <v-toolbar-title class="header_title ml-5">
               {{ title }}
            </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
             
    
    
    
        <v-btn icon class="breadcrumbs app_background" medium >
            <v-icon>mdi-bell</v-icon>
        </v-btn>


        <v-menu
           v-model="menu"
           :close-on-content-click="false"
           :nudge-width="200"
           offset-x
        >
    
            <template v-slot:activator="{ on, attrs }">

                <v-list-item-avatar 
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-img src="@/assets/ak.jpg"></v-img>
                </v-list-item-avatar>
          
            </template>
  
        <v-card>
            <v-list class="teal" dark elevation="12">
                <v-list-item>
                    <v-list-item-avatar>
                        <img src="@/assets/ak.jpg" alt="Thulasi">
                    </v-list-item-avatar>
                        
                    <v-list-item-content >
                        <v-list-item-title class="header_title">Ak Ashok</v-list-item-title>
                
                        <v-list-item-subtitle class="sub_title"><strong> Programmer</strong> </v-list-item-subtitle>

                    </v-list-item-content>                
                </v-list-item>
            </v-list>
            
            <v-divider></v-divider>
       
            <v-list class="grey lighten-3">
                <div class="listitem" >
                    <v-list-item v-for="item in profileitemsmob" :key="item.title" :to="item.link" link >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content >
                            <v-list-item-title >{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
                
                <v-list-item v-for="item in profileitems" :key="item.title" :to="item.link" link >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>   
                        <v-list-item-title class="app_bar">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>    
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</v-app-bar>
  
</template>
<script>
export default {
   name: 'appbar',
  props:['items'],

    data() {
        return {
            drawer: 'false',
             sheet: false,
              menu: false,
  
          
  profileitemsmob:[
                { title: 'Notification', icon: 'mdi-bell' },   
            ],
            profileitems:[
                { title: 'Messages', icon: 'mdi-message-reply-text' },
                { title: 'Settings', icon: 'mdi-wrench' },
                { title: 'Feedback', icon: 'mdi-clipboard' },
                { title: 'Logout', icon: 'mdi-power-settings',link:'/' },
            ],
 
      //      items: [
      //   {
      //     text: 'Dashboard',
      //     disabled: false,
      //     href: 'breadcrumbs_dashboard',
      //   },
      //   {
      //     text: 'Link 1',
      //     disabled: false,
      //     href: 'breadcrumbs_link_1',
      //   },
      //   {
      //     text: 'Link 2',
      //     disabled: true,
      //     href: 'breadcrumbs_link_2',
      //   },
      // ],
            
        }
    },
created(){
    this.title=this.$route.name;
}
}
</script>
<style>
.listitem{
display: none;
}

@media only screen 
  and (min-device-width: 360px) 
  and (max-device-width: 720px)
  and (orientation: portrait) {
.breadcrumbs{
display: none;
}
.listitem{
display:block;
}
}
</style>

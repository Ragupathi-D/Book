<template>
  <v-data-table
    v-model="data"
    :value="value"
    :headers="headers"
    :items="items"
    :show-select="showSelect"
    sort-by="calories"
    class="elevation-1"
    :item-key="itemKey"
    return-object
  >
    <template v-for="(_,slot) in $scopedSlots"  v-slot:[slot]="props" >
      <slot :name="slot" v-bind="props"   ></slot>
    </template>

    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
        >
          <template 
            v-slot:activator="{ on, attrs }" 
            v-if="addBtn" 
          >
            <v-btn
              color="teal"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="form" >
                  <slot name="forms" :editedItem="editedItem" ></slot>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    

    <template v-slot:[`item.Action`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
        v-if="editBtn"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
        v-if="deleteBtn"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props:{
      setEditedItem : {
        type: Object,
        default: function(){
          return {}
        }
      },
      headers: {
        type: Array,
        default: function(){
          return []
        }
      },
      itemKey: {
        type: String,
        default: function(){
          return ''
        }
      },
      items: {
        type: Array,
        default: function(){
          return []
        }
      },
      value: {
        type: Array,
        default: function(){
          return []
        }
      },
      showSelect:{
        type: Boolean,
        default: false
      },
      defaultItem:{
        type: Object,
        default: function(){
          return {}
        }
      },
      addBtn:{
        type:Boolean,
        default: true
      },
      editBtn:{
        type:Boolean,
        default: true
      },
      deleteBtn:{
        type:Boolean,
        default: true
      },
      fetchItem:{
        type:Object,
        default:null
      }
    },
    data: () => ({
      form: true,
      data : [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New' : 'Edit'
      },
      editedItem : {
        get() {
          return this.setEditedItem
        },
        set( val ) {
          this.$emit('update:setEditedItem', val)
        }, 
      }
    },
    watch: {
      data(value){
        this.$emit('selectedValue', value)
      },
      dialog (val) {
        if(val) {
         const form = this.$refs.form;
         if(form)
            form.resetValidation()

        } else {
          this.close()
        }
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.editedItem = Object.assign({},this.editedItem, this.defaultItem)
      },

      async editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        if(this.fetchItem){
          await this.$emit('EditItem', {item : item})
        } else {
          this.editedItem = Object.assign({}, item)
        }
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await this.$emit('DeleteItem', { item:  this.items[this.editedIndex], index: this.editedIndex})
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      hasFooterSlot() {
        console.log( this );
        return !!this.$slots.body
      },
      async save () {
        const validate = await this.$refs.form.validate();
        if(!validate) {
          return false; 
        }
        if (this.editedIndex != -1) {
          await this.$emit('UpdateItem', { item: this.editedItem, index : this.editedIndex})
        } else {
          await this.$emit('AddItem', { item: this.editedItem})
        }
        this.close()
      },
    },
  }
</script>
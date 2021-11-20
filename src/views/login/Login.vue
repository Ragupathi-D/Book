<template>
  <v-container class="fill-height" justify-center >
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <v-card>
                <v-tabs v-model="tab" small show-arrows background-color="primary accent-4" icons-and-text dark grow>
                    <v-tab v-for="i in tabs" :key="i">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="register.firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="register.lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <!-- <v-col cols="12">
                                            <v-text-field dense v-model="address" label="Address" maxlength="20"></v-text-field>
                                        </v-col> -->
                                        <v-col cols="12">
                                            <v-text-field dense v-model="register.email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense v-model="register.userName" :rules="[rules.required, checkUserName]" label="User Name" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense v-model="register.pass" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense block v-model="pass2" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-dialog>
  </v-container>
</template>

<script>
  import { userModel } from "../../models/user";
  import { mapGetters } from "vuex";
  export default {
  computed: {
      passwordMatch() {
        return () => this.password === this.verify || "Password must match";
      },
      ...mapGetters('USER', {
        getUserNameOnly : 'getUserNameOnly'
      }),
      checkUserName () {
        return () => this.getUserNameOnly.include(this.userName) || 'user name already exits'
      }
    },
    methods: {
      validate() {
        if (this.$refs.loginForm.validate()) {
          // submit form to server/API here...
        }
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      }
    },
    data: () => ({
      dialog: true,
      tab: 0,
      tabs: [
          {name:"Login", icon:"mdi-account"},
          {name:"Register", icon:"mdi-account-outline"}
      ],
      register : Object.assign({...userModel}) ,
      pass2 : '',
      valid: true,
      loginEmail : '',
      loginPassword : '',
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      }
    })
  }
</script>

<style>

</style>
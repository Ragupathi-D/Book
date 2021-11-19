import Vue from "vue";
import Vuex from "vuex";

// Common
import { book as BOOK } from "@/store/modules/book.store.js";
import { user as USER } from "@/store/modules/user.store.js";
import { order as ORDER } from "@/store/modules/order.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    BOOK,
    USER,
    ORDER
  }
});

import Vue from 'vue';
import Vuex from "vuex";
import { auth } from "./auth.module";
import { createStore } from 'vuex-extensions';

Vue.use(Vuex);

export default createStore(Vuex.Store, {
  modules: {
    auth,
  }
});


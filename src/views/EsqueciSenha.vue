<template>
<v-main>
  <v-container class="login" align="center" >
    <v-row  justify="center" no-gutters>
      <v-col cols="12" sm="8" md="4" lg="4" xl="4">
      <v-card class="elevation-6 px-3 py-3">
      <div class="cardtit">
      <h1 class="py-2">ESQUECI MINHA SENHA</h1>
      </div>
      <v-form v-model="isValid">
      <v-row  justify="center">
          <v-col>
            <v-text-field dense outlined
              label="Email"
              name="email"
              append-icon="mdi-account"
              type="text"
              ref=email
              v-model="email"
              :rules="[v => !!v || 'Obrigatório',
              v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail Inválido' ]"
              required
              class="form-control"
            ></v-text-field>

          </v-col>
      </v-row>
      <v-row align="center" justify="center">
          <v-col col="8" sm="8"  md="8" lg="8" xl="8">
            <v-btn :disabled="!isValid" @click="esqueciSenha()" class="btn-login px-15" v-show="!loading">
            Enviar
          </v-btn>

           <v-progress-circular v-show="loading" indeterminate color="primary"></v-progress-circular>
          </v-col>
      </v-row>
      </v-form>
      </v-card>
    </v-col>
    </v-row>
    <modal
      :titulo = this.tituloModal
      :rota = this.rotaModal
      :btnshow = true
      :isModalVisible = this.isModalVisible
      @close = "closeModal()"
    />
  </v-container>
  </v-main>
</template>

<script>

import modal from '@/components/modal.vue'
import axios from 'axios';
import { API_URL } from '@/main.js'

export default {
  name: 'EsqueciSenha',
  components: {
    modal
  },
  data: () => ({
      tituloModal: '',
      rotaModal: null,
      isModalVisible: false,
      loading: false,
      email: '',
      isValid: false,
  }),
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    esqueciSenha()  {
      this.loading=true;
      axios.post(API_URL + '/api/auth/esqueci-minha-senha', {
      email: this.email,
      }).then(
            () => {
             this.tituloModal = "Está Funcionalidade ainda não foi finalizada."
             this.rotaModal = "/";
             this.loading = false;
             this.isModalVisible = true;
            },
            error => {
              this.loading = false;
              if (error.response.status == 404) {
                this.tituloModal = "Email Não Encontrado."
                this.loading = false;
                this.isModalVisible = true;
                this.emailInvalido = true;
              }
            }
          );
    },
  }
};
</script>

<style scoped>

.v-btn {

	color: rgb(255, 255, 255);
  height: 40px!important;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
	background: rgb(0, 0, 0)!important;
	transition: all 200ms ease;
	border-radius: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 40px!important;
  padding-right: 40px!important;
}
</style>
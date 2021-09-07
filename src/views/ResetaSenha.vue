<template>
<v-main>
  <v-container class="login" align="center" >
    <v-row  justify="center" no-gutters>
      <v-col cols="12" sm="8" md="4" lg="4" xl="4">
      <v-card class="elevation-6 px-3 py-3">
      <div class="cardtit">
      <h1  v-if="codValidado" class="py-2">NOVA SENHA</h1>
      <h1  v-else class="py-2">CÓDIGO DE VALIDAÇÃO</h1>
      </div>
      <v-form>
        <v-row  v-if="!codValidado" justify="center">
          <v-col>
             <v-text-field dense outlined
              ref="password"
              type="password"
              v-model="pass"
                  :rules="[v => !!v || 'Obrigatório',
                      v => (v && v.length >= 8) || 'Senha deve conter no mínimo 8 caracteres.',
                      v => /(?=.*[A-Z])/.test(v) || 'Senha deve conter um caracter maiúsculo.',
                      v => /(?=.*\d)/.test(v) || 'Senha deve conter um número',
                      v => /([!@$%])/.test(v) || 'Senha deve conter um caracter especial [!@#$%]'
              ]"
              label="Código"
              data-vv-as="Senha"
              data-vv-name="pass"
              required
            ></v-text-field>
          </v-col>
      </v-row>
      <v-row v-if="codValidado" justify="center">
          <v-col>
             <v-text-field dense outlined
              ref="password"
              type="password"
              v-model="pass"
                  :rules="[v => !!v || 'Obrigatório',
                      v => (v && v.length >= 8) || 'Senha deve conter no mínimo 8 caracteres.',
                      v => /(?=.*[A-Z])/.test(v) || 'Senha deve conter um caracter maiúsculo.',
                      v => /(?=.*\d)/.test(v) || 'Senha deve conter um número',
                      v => /([!@$%])/.test(v) || 'Senha deve conter um caracter especial [!@#$%]'
              ]"
              label="Senha"
              data-vv-as="Senha"
              data-vv-name="pass"
              required
            ></v-text-field>
          </v-col>
      </v-row>
      <v-row  v-if="codValidado" align="center" justify="center">
          <v-col >
        <v-text-field dense outlined
          v-model="pass2"
          type="password"
          data-vv-as="Confirmação de Senha"
          label="Confirmação de Senha"
          data-vv-name="pass"
          required
        ></v-text-field>
          </v-col>
      </v-row>
      <v-row align="center" justify="center">
          <v-col col="8" sm="8"  md="8" lg="8" xl="8">
            <!-- <v-btn @click="submit()" class="btn-login px-15" v-show="!loading"> FUNCIONALIDADE AINDA NÃO IMPLEMENTADA -->
            <v-btn class="btn-login px-15" v-show="!loading">
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
import axios from 'axios';
import modal from '@/components/modal.vue'
import { CLIENT_URL } from "@/main.js"

export default {
  name: 'resetaSenha',
  data: () => ({
      pass: '',
      pass2: '',
      loading: false,
      tituloModal: '',
      rotaModal: null,
      isModalVisible: false,
      codValidado: false,
      userid: null,
  }),
  components: {
    modal
  },
  created(){
    this.userid = this.$route.params.id;
    this.$router.push('/reseta-Senha')
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    submit() {

      this.loading = true;
      const config = {
      headers: {
          'content-type': 'application/json'
      }}


      this.$validator.validateAll()
        .then(result => {
          if(result) {
             axios.post(CLIENT_URL + "/api/auth/reseta-senha", JSON.stringify({"token": this.token, "senha": this.pass}), config).then(
              () => {
                this.isModalVisible = true;
                this.tituloModal= "Senha alterada com sucesso!."
                this.rotaModal = '/login'
              },
              (err) => {
                console.log(err)
                this.tituloModal= "Não foi possível alterar a senha."
                this.isModalVisible = true;
               }
            );
          }
        })

       this.loading=false;
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

<template>
<v-main >
  <v-container   >
    <v-row  class="login" align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="4" lg="4" xl="3">
      <v-card class="elevation-6 px-3 py-3">
      <div class="cardtit">
      <h1 class="py-2">LOGIN</h1>
      </div>
      <v-form @submit.prevent="handleLogin">
      <v-row  justify="center">
          <v-col>
            <v-text-field @keyup.enter.native="handleLogin()"  dense outlined
              label="Email"
              name="email"
              append-icon="mdi-email"
              type="text"
              v-model="user.email"
               :rules="[
                      (v) => !!v || 'Obrigatório',
                      (v) =>
                        !v ||
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        'E-mail Inválido',
                    ]"
              class="form-control"
            ></v-text-field>
             <div
            v-if="emailInvalido"
            >Email Inválido!</div>

          </v-col>
      </v-row>
      <v-row  align="center" justify="center">
          <v-col >
            <v-text-field  @keyup.enter.native="handleLogin()" dense outlined
            id="password"
            label="Senha"
            name="password"
            append-icon="mdi-lock"
            type="password"
            v-model="user.password"

            class="form-control"
          ></v-text-field>
            <div
            v-if="senhaInvalida"
            >Senha Inválida!</div>
          </v-col>
      </v-row>
            <router-link style="text-decoration:none" to="esqueci-a-senha">Esqueceu a senha ?</router-link>
      <v-row align="center" justify="center">
          <v-col col="8" sm="8"  md="8" lg="8" xl="8">
            <v-btn @click="handleLogin()" class="btn-login px-15" v-show="!loading">
            Login
          </v-btn>
           <v-progress-circular v-show="loading" indeterminate color="primary"></v-progress-circular>
          </v-col>
      </v-row>
      </v-form>
      <p>Ainda não possui uma conta ?
          <router-link to="registrar">Crie uma conta</router-link>
      </p>
      </v-card>
    </v-col>
    </v-row>
      <modal
      :titulo = this.tituloModal
      :btnshow = true
      :isModalVisible = this.isModalVisible
      @close = "closeModal()"
    />
  </v-container>
  </v-main>
</template>

<script>
import User from '../models/user';
import modal from '@/components/modal.vue'
export default {
  name: 'Login',
  components: {
    modal
  },
  data: () => ({
      user: new User(),
      senhaInvalida: false,
      emailInvalido: false,
      loading: false,
      isModalVisible: false,
      tituloModal: null,
  }),
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    handleLogin() {

      this.user.email == null || this.user.email.length == 0 ? this.emailInvalido = true : this.emailInvalido = false;
      this.user.password == null || this.user.password.length == 0? this.senhaInvalida = true : this.senhaInvalida = false;

        if (this.user.email && this.user.password) {
          this.loading = true;
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/home');
            },
            error => {
              this.loading = false;
              if (error.response.status == 404) this.emailInvalido = true;
              if (error.response.status == 403) this.senhaInvalida = true;
              if (error.response.status == 401) {
                this.tituloModal = error.response.data.message
                this.isModalVisible = true;
              }
            }
          );
        }
    }
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
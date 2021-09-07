<template>
  <v-main>
    <v-container class="login">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" sm="8" md="10" lg="8" xl="8">
          <v-card class="inputs-container elevation-6 px-3 py-3">
            <div class="cardtit">
              <h1 class="py-2">CRIAR CONTA</h1>
            </div>
            <v-form v-model="isValid">
              <v-col>
                <h2>DADOS LOGIN</h2>
              </v-col>
              <v-row align="center" justify="center">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    append-icon="mdi-email"
                    label="Email"
                    name="email"
                    type="email"
                    v-model="user.email"
                    :rules="[
                      (v) => !!v || 'Obrigatório',
                      (v) =>
                        !v ||
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        'E-mail Inválido',
                    ]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    id="password"
                    label="Senha"
                    name="password"
                    append-icon="mdi-lock"
                    type="password"
                    v-model="user.password"
                    :rules="[
                      (v) => !!v || 'Obrigatório',
                      (v) =>
                        (v && v.length >= 8) ||
                        'Senha deve conter no mínimo 8 caracteres.',
                      (v) =>
                        /(?=.*[A-Z])/.test(v) ||
                        'Senha deve conter um caracter maiúsculo.',
                      (v) =>
                        /(?=.*\d)/.test(v) || 'Senha deve conter um número',
                      (v) =>
                        /([!@$%])/.test(v) ||
                        'Senha deve conter um caracter especial [!@#$%]',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-radio-group v-model="user.tipo" label="Tipo" row mandatory>
                  <v-radio label="Empresa" value="pj"></v-radio>
                  <v-radio label="Profissional" value="pf"></v-radio>
                </v-radio-group>
              </v-row>

              <v-row justify="center" v-if="user.tipo == 'pf'">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    label="Nome"
                    name="nome"
                    type="text"
                    v-model="user.nome"
                    :rules="[(v) => !!v || 'Obrigatório']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    dense
                    outlined
                    label="CPF"
                    name="cpf"
                    v-mask="'###.###.###-##'"
                    type="text"
                    v-model="user.documento"
                    :rules="[(v) => !!v || 'Obrigatório']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    label="Razão Social"
                    name="nome"
                    type="text"
                    v-model="user.nome"
                    :rules="[(v) => !!v || 'Obrigatório']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    dense
                    outlined
                    label="CNPJ"
                    v-mask="'##.###.###/####-##'"
                    name="documento"
                    type="text"
                    v-model="user.documento"
                    :rules="[(v) => !!v || 'Obrigatório']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col> <h2>ENDEREÇO</h2> </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    class="btnAddEndereco"
                    @click="addEndereco()"
                    dark
                  >
                    Adicionar Novo Endereço
                  </v-btn>
                </v-col>
              </v-row>
              <div v-for="(loop, index) in enderecos" :key="index">
                <cadastro-endereco
                  v-model="enderecos[index]"
                ></cadastro-endereco>
                <v-divider v-if="enderecos.length > 1 && index < enderecos.length - 1"></v-divider>
                              <v-row v-if="enderecos.length > 1 && index < enderecos.length - 1">
                <v-col>
                  <v-btn
                    class="btnRemoveEndereco"
                    @click="removeEndereco(index + 1)"
                    dark
                    plain
                  >
                   Remover Endereço
                  </v-btn>
                </v-col>
              </v-row>

              </div>
            </v-form>
            <v-row align="center" justify="center">
              <v-col col="8" sm="8" md="8" lg="8" xl="8">
                <v-progress-circular
                  v-show="loading"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <v-btn
                  class="btnRegistro"
                  @click="handleRegister()"
                  :disabled="!isValid"
                >
                  REGISTRAR
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <modal
      :titulo="this.tituloModal"
      :rota="this.rotaModal"
      :btnshow="true"
      :isModalVisible="this.isModalVisible"
      @close="closeModal()"
    />
  </v-main>
</template>

<script>
import UserCadastro from "@/models/userCadastro";

import modal from "@/components/modal.vue";
import cadastroEndereco from "@/components/cadastroEndereco.vue";

export default {
  name: "Registro",
  components: {
    modal,
    cadastroEndereco,
  },
  data: () => ({
    user: new UserCadastro(),
    submitted: false,
    successful: false,
    message: "",
    loading: false,
    isModalVisible: false,
    tituloModal: null,
    rotaModal: null,
    isValid: false,
    enderecos: [{}],
  }),
  methods: {
    addEndereco() {
      this.enderecos.push({});
    },
    removeEndereco(value){
      this.enderecos.splice(value, 1)
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleRegister() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.user.endereco = this.enderecos;
      this.user.documento = this.user.documento.replace(/\D/g, "");
      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.tituloModal = data.message;
          this.rotaModal = "/"
          this.isModalVisible = true;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
          this.tituloModal = error.response.data.message;
          this.isModalVisible = true;
        }
      );
    },
  },
};
</script>

<style scoped>
.btnRegistro {
  color: rgb(255, 255, 255);
  height: 40px !important;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0) !important;
  transition: all 200ms ease;
  border-radius: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 40px !important;
  padding-right: 40px !important;
}

.btnAddEndereco {
  background: rgb(38, 67, 231) !important;
}

.btnRemoveEndereco {
  color: rgb(0,0,0);
  height: 40px !important;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent !important;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 40px !important;
  padding-right: 40px !important;
}

</style>
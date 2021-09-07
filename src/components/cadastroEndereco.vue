<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-text-field
          dense
          outlined
          label="Residência, Trabalho, Outros..."
          name="rua"
          type="text"
          v-model="end.nome"
          :rules="[(v) => !!v || 'Obrigatório']"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-text-field
          dense
          outlined
          label="Rua, Avenida, Travessa, Alameda..."
          name="rua"
          type="text"
          v-model="end.rua"
          :rules="[(v) => !!v || 'Obrigatório']"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          outlined
          label="N°"
          name="numeros"
          type="number"
          v-model="end.numero"
          :rules="[(v) => !!v || 'Obrigatório']"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center"> </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <v-text-field
          dense
          outlined
          label="Complemento"
          name="comp"
          type="text"
          v-model="end.complemento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field
          dense
          outlined
          label="Bairro"
          name="bairro"
          type="text"
          :rules="[(v) => !!v || 'Obrigatório']"
          v-model="end.bairro"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          outlined
          v-mask="'#####-###'"
          label="CEP"
          name="cep"
          v-model="end.cep"
          :rules="[(v) => !!v || 'Obrigatório']"
          @blur="pesquisaCEP()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          outlined
          label="Cidade"
          name="cidade"
          type="text"
          :rules="[(v) => !!v || 'Obrigatório']"
          v-model="end.cidade"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          outlined
          label="Estado"
          name="estado"
          v-mask="'AA'"
          type="text"
          :rules="[(v) => !!v || 'Obrigatório']"
          v-model="end.estado"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CadastroService from "../services/cadastro.service";

export default {
  name: "cadastroEndereco",
  props: ["value"],
  computed: {
    end: {
      get() {
        return this.value;
      },
    },
  },

  methods: {
    async pesquisaCEP() {
      var result = await CadastroService.pesquisaCep(this.end.cep);
      this.end.rua = result.logradouro;
      this.end.bairro = result.bairro;
      this.end.cidade = result.localidade;
      this.end.estado = result.uf;
      this.$forceUpdate();
    },
  },
};
</script>
<template>
  <v-row justify="center">
    <v-dialog transition="scale-transition"
      v-model="isModalVisible"
      persistent
      max-width="500"
      align="center"
    >

     <v-card  class="elevation-6 px-3 py-3">

      <h3 style="white-space: pre-line"> {{ titulo }} </h3>

       <v-progress-circular v-show="loading" indeterminate color="primary"></v-progress-circular>
       <v-btn v-show="btnshow"
            color="#3da688"
            text
            @click="close"
          >
            Fechar
          </v-btn>
      </v-card>

    </v-dialog>
  </v-row>
</template>
<script>
  export default {
      data: () => {
        return {
          narq: null,
        }
      },
      created(){
        this.btnshow = true
      },
      props:{
        titulo: String,
        loading: null,
        btnshow: null,
        isModalVisible: {
          required: true
        },
        rota: null
      },
    methods: {
      close() {
        if (this.rota) this.$router.push(this.rota);
        this.$emit('close');
      }


    },
  }
</script>
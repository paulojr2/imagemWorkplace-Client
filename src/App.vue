<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      Imagem - WorkPlace
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:ital,wght@0,300;0,400;1,100;1,300;1,400");

#app {
  font-family: "Oswald", sans-serif;
  text-align: center;
  color: #2c3e50;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgb(196, 206, 214) 100%
  );
  user-select: none;
}
</style>

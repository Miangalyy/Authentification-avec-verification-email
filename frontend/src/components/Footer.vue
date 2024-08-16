<template>
    <v-footer style="position: fixed; bottom: 0px; width: 100%; height: 100px;"
      class="bg-indigo-lighten-1 text-center d-flex flex-column"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          variant="text"
        ></v-btn>
      </div>
  
      <div class="pt-0">
        Follow the link
      </div>
  
      <v-divider></v-divider>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </template>
  <script>
    export default {
      data: () => ({
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }),
    }
  </script>
<template>
    <div class="container" style="margin-top: 10%;">
        <v-sheet
        class="pa-4 text-center mx-auto"
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
      >
        <v-icon
          class="mb-5"
          color="success"
          icon="mdi-check-circle"
          size="112"
        ></v-icon>
    
        <h2 class="text-h5 mb-6">You reconciled this account</h2>
    
        <p class="mb-4 text-medium-emphasis text-body-2">
          To see a report on this reconciliation, click <a class="text-decoration-none text-info" href="https://mail.google.com/mail/u/0/#inbox/" target="_blank">Check your mailBox.</a>
    
          <br>
    
          Otherwise, you're done!
        </p>
    
        <v-divider class="mb-4"></v-divider>
    
        <div class="text-end">
          <v-btn
            @click="login"
            class="text-none"
            color="success"
            variant="flat"
            width="90"
            rounded
          >
            Done
          </v-btn>
        </div>
      </v-sheet>
    </div>
  </template>
  <script>
  export default {
    name: 'EmailVerification',
     data() {
        return {

        }
    },
    methods: {
        login () {
            this.$router.push('/login')
        }
    }

  }
  </script>
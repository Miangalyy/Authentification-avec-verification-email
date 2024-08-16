<template>
  <!--<div>
    <h1>Welcome, {{ user.lastName }}</h1>
    <p>Email: {{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>-->
      <v-container class="bg-deep-white pl-0 py-0" style="margin-top: 100px; box-shadow:  0 .1rem .4rem #0002;">
        <v-row no-gutters>
          <v-col>
            <img
                class="bg-white cover"
                src="../assets/fond4.jpg"
                width="500"
                cover>
              
            
          </v-col>
          <v-col class="align-content-center justify-center text-center">
            <div class="d-flex justify-center mb-4">
              <v-card width="100%" class="bg-white text-center">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4">Welcome, {{ user.lastName }}</v-card-title>
                <v-card-text>
                  dans notre application
                </v-card-text>
              </v-card>
            </div>
            <v-stepper model-value="2" class="mb-9">
              <v-stepper-header>
                <v-stepper-item
                color="light-blue-darken-3"
                  title="Select campaign settings"
                  value="1"
                ></v-stepper-item>
          
                <v-divider></v-divider>
          
                <v-stepper-item
                color="light-blue-darken-3"
                  title="Create an ad group"
                  value="2"
                ></v-stepper-item>
          
                <v-divider></v-divider>
          
                <v-stepper-item
                  color="light-blue-darken-3"
                  title="Create an ad"
                  value="3"
                ></v-stepper-item>
              </v-stepper-header>
            </v-stepper>
            <div class="text-center">
              <v-btn
                color="primary"
                prepend-icon="mdi-open-in-new"
              >
                <template v-slot:prepend>
                  <v-icon color="white"></v-icon>
                </template>
          
                Get started
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    this.getUserDetails();
  },
  methods: {
    async getUserDetails() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:9191/user/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.user = response.data;
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          console.log("No token");
          return;
        }

        const response = await axios.post('http://localhost:9191/test/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Logout successful:', response.data);
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion ou effectuer d'autres actions
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }
};
</script>

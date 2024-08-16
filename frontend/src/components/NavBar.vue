<template>
    <v-card>
      <v-layout>
        <v-app-bar
          class="bg-indigo-lighten-1"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>My app</v-toolbar-title>
  
          <v-spacer></v-spacer>
  
          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>
  
            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>
          <v-menu
          transition="scale-transition"
            min-width="200px"
            rounded
          >
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar size="large" color="warning">
                    <span class="text-h5">{{ user.lastName.charAt(0) }}</span>
                </v-avatar>
                <h3 class="mt-2">{{ user.lastName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <div class="text-start">
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                     prepend-icon="mdi-account"
                      variant="text"
                      rounded
                    >
                      Edit Account
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                    prepend-icon="mdi-logout"
                      variant="text"
                      @click="logout"
                      rounded
                    >
                      Disconnect
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                    prepend-icon="mdi-help"
                    class="ml-0"
                      variant="text"
                      rounded
                    >
                      Aide
                    </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list
            :items="items"
          ></v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>
  <script>
  import axios from 'axios';
    export default {
      data: () => ({
        drawer: false,
        user: {},
        group: null,
        items: [
          {
            title: 'Foo',
            value: 'foo',
          },
          {
            title: 'Bar',
            value: 'bar',
          },
          {
            title: 'Fizz',
            value: 'fizz',
          },
          {
            title: 'Buzz',
            value: 'buzz',
          },
        ],
      }),
      mounted() {
    this.getUserDetails();
  },
  methods: {
    async getUserDetails() {
      console.log("Hello.");
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:9191/user/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.user = response.data;
          console.log("User : "+this.user.lastName);
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
        this.$router.push('/Login');
        console.log('Logout successful:', response.data);
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion ou effectuer d'autres actions
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
  
      watch: {
        group () {
          this.drawer = false
        },
      },
    }
  </script>
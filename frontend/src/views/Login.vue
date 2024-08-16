<template>

   <!---- <div class="row">
    
    <div class="col-sm-4" >
     <h2 align="center"> Login</h2>
   
     <form @submit.prevent="LoginData">
     
   
     <div class="form-group" align="left">
       <label>Email</label>
       <input type="email" v-model="employee.email" class="form-control"  placeholder="Email">
     </div>


    <div class="form-group" align="left">
    <label>Password</label>
    <input type="password" v-model="employee.password" class="form-control"  placeholder="Password">
  </div>
  <br/>

     <button type="submit" class="btn btn-primary">Login</button>
     </form>
   </div>
   </div>-->

   <v-form v-model="form" method="POST" @submit.prevent="LoginData" class="form">
    <div class="d-flex text-start mb-3">
      <v-icon icon="mdi mdi-clipboard-account"></v-icon>
      <h2>S'inscrire</h2>
    </div>
    <div class="form-group d-block text-center px-0 py-0">
      <v-text-field
      v-model="employee.email"
      prepend-inner-icon="mdi-email"
      :rules="[rules.required, rules.min, rules.email]"
      :readonly="loading"
      hint="At least 8 characters"
      class="input-group--focused"
      label="Email"
      type="email"
      name="email"
      required
    ></v-text-field>
    <span v-if="errorEmail" class="spanError">* {{ errorEmail }}</span>
    </div>

   <div class="form-group">
    <v-text-field
    v-model="employee.password"
    :readonly="loading"
    :rules="[rules.required, rules.min]"
    prepend-inner-icon="mdi-lock-outline"
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    label="Password"
    class="input-group--focused mt-2"
    hint="At least 8 characters"
    placeholder="Enter your password"
    name="password"
    @click:append-inner="visible = !visible"
  ></v-text-field> 
   </div>
   <v-btn 
   :disabled="!form"
   type="submit" 
   class="btn"
   color="primary"
   size="large"
  :loading="loading"
  variant="elevated"
  block
   >Enregistrer
 </v-btn>

   <p class="link">Do have an account<br><br>
   <router-link to="/">Login </router-link> here</p>
</v-form>

</template>
   
   <script>
   import axios from 'axios';
   import swal from "sweetalert2";

   export default {
       name: 'Registation',
       data() {
           return {
               result: {},
               employee: {
                   email: '',
                   password: ''
               },
               form: false,
               errorEmail: '',
               rules: {
                   required: value => !!value || 'Required.',
                   min: v => v.length >= 6 || 'Min 6 characters',
                   minNom: v => v.length >= 4 || 'Min 4 characters',
                   email: v => /.+@.+\..+/.test(v) || 'Veuillez saisir un email valide',
                   emailMatch: () => (`The email and password you entered don't match`),
               },
               loading: false,
               visible: false
           }
       },
       created() {
       },
       mounted() {
           console.log("mounted() called.......");
       },
       methods: {
           async LoginData() {
               this.loading = true;
               try {
                   const response = await axios.post("http://localhost:9191/login", {
                       email: this.employee.email,
                       password: this.employee.password
                   });
                   const token = response.data;
                   console.log(response.data.token);
                   localStorage.setItem("token", token); // Stockez le token JWT
                   setTimeout(() => (this.loading = false,
                       this.resetForm(),
                       this.$router.push('/Home')
                   ), 2000)
               } catch (error) {
                   
                   swal.fire({
                       toast: true,
                       position: 'top-end',
                       icon: 'error',
                       title: "Login failed. Please check your credentials.",
                       showConfirmButton: false,
                       timer: 2000
                   });
                   this.loading = false;
                   this.errorEmail = "Verifie bien votre email :(";
                  // alert("Login failed. Please check your credentials.");
               }
           },

           resetForm () {
            this.employee.email = null;
            this.employee.password = null;
        }
       }
   }
   </script>
   <style scoped>

   .form {
    width: 400px;
    top: 140px;
    left: 750px;
    position: absolute;
    border-radius: 10px;
    padding: 10px 25px;
    box-shadow:  0 .1rem .4rem #0002;
    background: #fff;
    text-align: center;
   }
   .spanError {
    margin-top: 0px;
    text-align: start;
    font-size: 14px;
    color: red;
  }
   .form h2 {
    width: 220px;
    color: #7380ec;
    font-size: 22px; 
    background: #fff;
    border-radius: 10px;
    padding: 8px;
   }
   .form input {
    width: 240px;
    height: 35px;
    background: transparent;
    border-bottom: 1px solid #7380ec;
    border-top: none;
    border-right: none;
    font-size: 15px;
    letter-spacing: 1px;
    margin-top: 30px;
    color: #7d8da1;
  
  
   }
  
   .form input:focus {
    outline: none;
   }
   .btn {
    width: 240px;
    height: 40px;
    color: #fff;
    margin-top: 30px;
    font-size: 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: .4s ease;
   }
   .btn a {
    text-decoration: none;
    font-weight: bold;
    
   }
   .form .link {
    font-size: 17px;
    padding-top: 20px;
    text-align: center;
   }
   .form .link a {
    text-decoration: none;
    color: #7380ec;
   }
   .liw {
    padding-top: 15px;
    padding-bottom: 10px;
    text-align: center;
   }
   .form-group {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
   }
   .form-group span{
    position: relative;
    margin-top: 26px;
    margin-right: 10px;
  
   }
   .v-icon {
    color: #7380ec;
    font-size: 30px;
    margin-top: 7px;
   }
   @media screen and (max-width: 768px) {
    .form {
      left: 120px;
      top: 250px;
    }
   }
  </style>
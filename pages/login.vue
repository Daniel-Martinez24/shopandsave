<template>
  <div class="container">
      <p>Entre mas ahorres, mas puntos juntas para comprarle diferentes estilos a tu cerdito.</p>
      
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-asombrado.png?alt=media&token=a449ca67-96dc-438c-adfd-37610effe402"></img>
    <div id="txtEmail">
      <el-input
        id="txtEmail"
        v-model="correo"
        placeholder="Please input"
        type="email"
        name="txtEmail"
      ></el-input>
    </div>
    <br />
    <div id="txtPassword">
      <el-input
        v-model="contrasenia"
        placeholder="Please input password"
        show-password
      ></el-input>
    </div>
     <el-button type="primary" @click="login()" id="singin">inicia sesión</el-button>
     
    
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase';

export default {
  asyncData() {
    return {
      authenticatedUser: null
    }
  },
  created() {
    auth.onAuthStateChanged(user => (this.authenticatedUser = user))
  },
  data() {
    return {
      correo: 'correo@yopmail.com',
      contrasenia: '',
    };
  },
  watch: {
    authenticatedUser: function () {
      this.$router.push({ path: '/panel' });
    }
  },
  methods: {
    async confirmar () {
      console.log('fun confirmar');
      await auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log('confirmado');
          return 'logeado';
        } else {
          return 'logeadon´t';
        }
      });
    },

    login() {
      auth
        .signInWithEmailAndPassword(this.correo, this.contrasenia)
        .then(res => {
          // Antetificar
          this.$router.push({ path: '/panel' });
        })
        .catch(err => {
          console.log('error');
          console.log(err.code);
        });

      this.confirmar();
    }
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 33% 30% 10% 10% 10% 7%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container img {
  grid-column-start: 2;
  grid-row-start: 2;
  width: 60%;
  display:block;
  margin:auto;
}

#txtEmail {
  grid-column-start: 2;
  grid-row-start: 3;
  width: 100%;
  display:block;
  margin:auto;
}
#txtPassword {
  grid-column-start: 2;
  grid-row-start: 4;
  
  width: 100%;
  display:block;
  margin:auto;
}
#singin {
  grid-column-start: 2;
  grid-row-start: 5;
  
  width: 80%;
  display:block;
  margin:auto;
}

.container p {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 100%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 2;
  grid-row-start: 0;
}
</style>

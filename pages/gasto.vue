<template>
    <div class="container" :style="regillas">
        <h1 class="title">{{tipo}}</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-alegre.png?alt=media&token=c815c0f6-872c-4019-8022-1d09e7bf3cd4" alt="">
        <el-button id="comida" type="primary" @click="tipo = 'Comida'" plain>Comida</el-button>
        <el-button id="transporte" type="primary" @click="tipo = 'Transporte'" plain>Transporte</el-button>
        <el-button id="especial" type="primary" @click="tipo = 'Especial'" plain>Especial</el-button>
        <el-button id="diario" type="primary" @click="tipo = 'Diario'" plain>Diario</el-button>
        <el-input class="input" placeholder="Ingresa la cantidad" v-model="gasto"></el-input>
        <el-button type="success" @click="guardar('panel')" class="continuar" :style="continuarStyle" icon="el-icon-check" circle></el-button>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            tipo:'Añadir gastos',
            gasto: '',
            continuarStyle: 'display:none;',
            regillas: ''
        }
    },
    methods: {
        guardar(ruta) {
            const numero = parseFloat(this.gasto);
            if (numero > 0) {
                console.log(ruta);
                this.$router.push({ path: '/' + ruta });
            } else {
                alert('debe ser un numero mayor a 0');
            }
        },
        verificar() {
            if (this.tipo != 'Añadir gastos' && this.gasto != '') {
                this.continuarStyle ='display:block;';
                this.regillas='grid-template-columns: 10% 40% 40% 10%; grid-template-rows: 30% 20% 10% 10% 10% 20%;';
            }
            else {
                this.continuarStyle ='display:none;'
                this.regillas='grid-template-columns: 10% 40% 40% 10%; grid-template-rows: 30% 30% 10% 10% 10% 10%;';
            }
        }
    },
    watch: {
      gasto: function () {
          this.verificar();
      },
      tipo: function () {
          this.verificar();
      }
    },
    mounted(){ 
        this.regillas='grid-template-columns: 10% 40% 40% 10%; grid-template-rows: 30% 30% 10% 10% 10% 10%;';
    }
}
</script>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: 30% 30% 10% 10% 10% 10%;
  justify-content: center;
  align-items: center;
  text-align: center;
}


.container img {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  width: 40%;
  display:block;
  margin:auto;
}

.continuar {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 6;
  display:block;
  margin:auto;
}

#comida {
  grid-column-start: 2;
  grid-row-start: 3;
  
  width: 80%;
  display:block;
  margin:auto;
}
#transporte {
  grid-column-start: 3;
  grid-row-start: 3;
  
  width: 80%;
  display:block;
  margin:auto;
}
#especial {
  grid-column-start: 2;
  grid-row-start: 4;
  
  width: 80%;
  display:block;
  margin:auto;
}
#diario {
  grid-column-start: 3;
  grid-row-start: 4;
  
  width: 80%;
  display:block;
  margin:auto;
}

.input {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 5;
  width: 80%;
  display:block;
  margin:auto;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 200%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 0;;
}
</style>

<template>
    <h1>Añadir gastos</h1>
</template>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 23% 50% 10% 0% 10% 7%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container img {
  grid-column-start: 2;
  grid-row-start: 2;
  width: 80%;
  display:block;
  margin:auto;
}

#login {
  grid-column-start: 2;
  grid-row-start: 3;
  
  width: 80%;
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

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 200%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 2;
  grid-row-start: 0;
}
</style>

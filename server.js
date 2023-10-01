const express = require('express');

const app = express();

app.get('/',(req, res)=>
{
  //res.end('Bienvenido al servidor backend NODE')
  //console.log(__dirname),
  res.sendFile(__dirname+'/public/index.html')
})
//se agrega para acceder a las rutas 
app.use('/public', express.static(__dirname + '/public'));//Para buscar las imagenes y sonidos
app.use('/src', express.static(__dirname + '/src'));//Para buscar los script
app.use('/node_modules',express.static(__dirname + '/node_modules'));//Para phaser

//configurar server basico
app.listen(5002, function()
{
    //mensaje a traves de node server.js en la terminal
 console.log("Servidor esta corriendo correctamente");
});
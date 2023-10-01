import Escena1 from "./escenas/Escena1.js";//Busca de donde viene Escena1
import Escena2 from "./escenas/Escena2.js";
import Menu from "./escenas/Menu.js";
import Victoria from "./escenas/Victoria.js";
import Derrota from "./escenas/Derrota.js";

let config = {
    type: Phaser.AUTO,
    width: 800,//ancho
    height: 600,//alto
    physics:
    {
     default:'arcade',
      arcade:
      {
      gravity:{y:300},
      debug:true
      }
    },
    scene:[Menu, Escena1,Escena2,Victoria,Derrota]//Vector donde se guardara las escenas, victoria,derrota y escena
};
let game = new Phaser.Game(config);
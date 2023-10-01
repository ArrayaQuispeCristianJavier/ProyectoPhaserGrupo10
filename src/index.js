import Escena1 from "./escenas/Escena1.js";//Busca de donde viene Escena1
import Menu from "./escenas/Menu.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
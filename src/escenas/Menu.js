class Menu extends Phaser.Scene{
 constructor(){
 super("Menu");
 }    
 /*Cargar imagenes de fondo y boton*/ 
 preload(){
 this.load.image('sky','../public/img/sky.png');

 this.load.image('boton','../public/img/boton.png');
 }
 create(){
  this.add.image(400,300,'sky');
  this.startButton = this.add.image(400,300,'boton').setInteractive();
  
 //Funcion que cambia de pantalla a la escena 1
 this.startButton.on('pointerdown',()=>{
    this.scene.start('Escena1');
 })
}

}
export default Menu;


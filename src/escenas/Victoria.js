class Victoria extends Phaser.Scene{
 constructor(){
    super({key: 'felicidades'});
 }

 preload(){
    this.load.image('felicidades', 'direccionDeLaImagen');
 }
 create(){
    this.add.image(410,250, 'background');
    this.felicidadesImage = this.add.image(400,90,'felicidades');
 }
}
export default Victoria;
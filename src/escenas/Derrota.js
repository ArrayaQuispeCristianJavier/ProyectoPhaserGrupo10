class Derrota extends Phaser.Scene{
    constructor(){
        super({key: 'gameover'});
       
    }
    preload(){
        this.load.image('gameover','dirreciondelaimagen.png');
    }
    create(){
        this.add.image(410,250,'background');
        this.gameoverImage = this.add.image(400,90,'gameover');
    }
}
export default Derrota;
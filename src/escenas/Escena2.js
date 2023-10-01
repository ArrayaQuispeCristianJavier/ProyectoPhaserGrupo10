class Escena2 extends Phaser.Scene{
constructor(){
super("Escena2");
this.scoreText = "";
this.score = 0;
}

/*Precarga de los archivos para escena actual y siguiente escena, los recursos tiene un nombre e unico*/ 
preload(){
    this.load.image('sky','../public/img/sky.png');
    this.load.image('ground', '../public/img/platform.png');
    this.load.image('star','../public/img/star.png');
    this.load.image('bomb', '../public/img/bomb.png');
    //Es el ancho y alto de la imagen del sprite
    this.load.spritesheet('dude','../public/img/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
  

    /*Va a poder ejecutar las escena de preload() y agregar elementos a la escena*/ 
    create(){
    //Agrega al jugador con fisicas y definido como un sprite
    this.player = this.physics.add.sprite(100,100,'dude');

    this.add.image(400, 300, 'sky');
    //La plataforma se comportara como un obejto fisico que lo afectara las leyes de la fisica, gravedad y colisiones
    //En este caso se le esta agregando fisica a las plataforma
    this.platforms = this.physics.add.staticGroup();
    //El ground se le asigna el nombre plataforma
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(150, 450, 'ground');
    this.platforms.create(600, 350, 'ground');
    this.platforms.create(250, 250, 'ground');
    this.platforms.create(750,220,'ground');
    this.platforms.create(100,100,'ground');
    this.platforms.create(700,100,'ground');
    
    //Agrega al jugador con fisicas y definido como un sprite
    this.player = this.physics.add.sprite(100,100,'dude');

     /*Define el rebote entre el sprite y el objeto o el piso, su funcion es (0.2) el 0 signfica que no hay rebote y el 2 si hay rebote*/
     this.player.setBounce(0.2);

     /*Metodo que se utiliza si el sprite colisiona con los objeto del mundo osea en este caso con el sprite y no podra atraverzalo*/
     this.player.setCollideWorldBounds(true);
     
     /*Es un modulo que se encarga de controlar las animaciones y se le asignara a un sprite de un juego*/
     //Esta funcion se va a encargar se crear la animacion hacia la izquierda
     this.anims.create({
      key: 'izquierda', 
      //Va ir hacia el sprite del jugador y va a contar los frames que va a utilizar para hacer la animacion
      frames: this.anims.generateFrameNumbers('dude',{start:0, end:3}), 
      frameRate:10,
      //El valor es negativo para que se repita todo el tiempo
      repeat:-1
     });

     //Esta funcion va hacer que el sprite se quede en reposo
     this.anims.create({
      key: 'reposo',
      frames: [{key:'dude', frame: 4}],
      frameRate:20   
     });

     //Esta funcion se va a encargar de mover el sprite hacia la derecha
     this.anims.create({
        key: 'derecha',
        frames: this.anims.generateFrameNumbers('dude',{start:5, end:8}),
        repeat: -1
     });

     /*Este metodo se va a encargar de detectar la colision entre dos objetos*/
     this.physics.add.collider(this.player,this.platforms);

     /*Con esta linea se esta diciendo que va a utilizar el teclado para mover*/
     this.cursors = this.input.keyboard.createCursorKeys();
     


     /*Se agrega estrellas*/

     this.stars = this.physics.add.group({
        key: 'star',
        // cantidad de estrellas
        repeat: 3,
        //empieza en la posición x e y, se repite cada 70 en x
        setXY: { x: 100, y:300, stepX: 150 } 
        });
        //width: 800,//ancho
        //height: 600,//alto

        //Se agrega el rebote entre el grupo de estrelas
        this.stars.children.iterate(function (child) {
         child.setCollideWorldBounds(true);
                    //Valores aleatorio del rebote de la estrellas
        child.setBounceY(Phaser.Math.FloatBetween(1,1));
         
        });




        //Habilita las colisiones de las entrellas con la plataforma
        this.physics.add.collider(this.stars, this.platforms);
        
        //Choque entre las estrellas y el jugador
        //El metodo this.physics.add.overlap verifica si dos objeto estan chocando y si es verdadero se ejecuta la funcion
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        
        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#000' });

        //Para agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        
  }
  /*Es un metodo que se va actualizar todo el tiempo osea es un bucle infinito que espera que se ejecute alguna accion, en este caso se encargara de realizar los movimiento del personaje*/
  update(){
    if (this.cursors.left.isDown) {
       this.player.setVelocityX(-160);
       this.player.anims.play('izquierda', true);
       }
       else if (this.cursors.right.isDown) {
       this.player.setVelocityX(160);
       this.player.anims.play('derecha', true);
       }
       else {
       this.player.setVelocityX(0);
       this.player.anims.play('reposo');
       }
       if (this.cursors.up.isDown && this.player.body.touching.down) {
       this.player.setVelocityY(-330);
       }
       
       if (this.score == 180) {
          this.scene.start('Victoria');
                   
         }
         
       
 }
 //Colisión entre el jugador y las estrellas
 collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
 
    if (this.stars.countActive(true) === 0) {
       this.stars.children.iterate(function (child) {
       child.enableBody(true, child.x, 0, true, true);
       });
       //Si se hagarra toda la estrellas genera las bombas
       for(let i = 0; i < 4; i++){
       let x = Phaser.Math.Between(100,700);//Genera una posicion aleatoria entre 100 y 700
       let bomb = this.bombs.create(x,0,'bomb');//Se crea y lanza una bomba aleatoreamente en la posicion X 
       bomb.setBounce(1);//Rebote de la bomba
       bomb.setCollideWorldBounds(true);//Sirve para que la bomba choque con los limite del mundo
       bomb.setVelocity(Phaser.Math.Between(-200,200),20);//direccion y velocidad de la bomba
       }
    }
 }
    
    
    hitBomb(player, bomb) {
       this.physics.pause();
       player.setTint(0xff0000);
       player.anims.play('turn');
       this.scene.start('Derrota');
       }
}

    

export default Escena2;
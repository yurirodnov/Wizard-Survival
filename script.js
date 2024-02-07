window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1100;
    canvas.height = 780;

    class GameState {

    }

    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
               if ((    e.key === 's' ||
                        e.key === 'w' ||
                        e.key === 'a' ||
                        e.key === 'd')
                        && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
            });
            window.addEventListener('keyup', e => {
                if (    e.key === 's' ||
                        e.key === 'w' ||
                        e.key === 'a' ||
                        e.key === 'd'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                 }
                 console.log(e.key, this.keys);
            });
        }

    }

    class Mage {
        constructor(){            
            this.image = document.getElementById('mage');
            this.xPosition = 0;
            this.yPosition = 0;
            this.width = 70;
            this.height = 70;
            this.speed = 3;
        }
        draw(context){
            context.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
        }
        move(input){
            if (input.keys.includes('w')) {                
                this.yPosition--;
            } else if (input.keys.includes('a')) {
                this.xPosition--;
            } else if (input.keys.includes('s')) {
                this.yPosition++;
            } else if (input.keys.includes('d')) {
                this.xPosition++;
            } else if (input.keys.includes('w') && input.keys.includes('d')) {
                this.yPosition--;
                this.xPosition++;
                console.log('!!!');sssss
            } else if (input.keys.includes('d') && input.keys.includes('s')) {
                this.yPosition++;
                this.xPosition++;
                console.log('Mmmm');
            } else if (input.keys.includes('s') && input.keys.includes('a')) {
                this.yPosition++;
                this.xPosition--;
            } else if (input.keys.includes('a') && input.keys.includes('w')) {
                this.yPosition--;
                this.xPosition--;
            }
        }
        
    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('grass');
            this.xPosition = 0;
            this.yPosition = 0;
            this.width = 720;
            this.height = 720;
        }
        draw(context){
            context.drawImage(this.image, this.xPosition, this.yPosition);
        }
    }

    class Enemy {
        constructor(){
            this.image = document.getElementById('monster');
            this.xPosition = 800;
            this.yPosition = 600;
            this.width = 70;
            this.height = 70;
            this.speed = 1;
        }
        draw(context){
            context.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
            
        }
        update(){
            this.xPosition -= this.speed;
            this.yPosition -= this.speed;

            if (this.yPosition < 300) {
                this.speed = -this.speed;
            } else if (this.yPosition > 500) {
                this.xPosition -= this.speed;
                this.yPosition -= this.speed;
            }

            
        }
        
    }

    class Projectile {
        
    }

    const background = new Background(canvas.width, canvas.height);
    const mage = new Mage(canvas.width, canvas.height);
    const enemy = new Enemy();
    const input = new InputHandler();

    function animate(){
        background.draw(ctx);
        mage.draw(ctx);
        mage.move(input, ctx);
        enemy.draw(ctx);
        enemy.update();
        



        requestAnimationFrame(animate);
    };
    animate();

});



    

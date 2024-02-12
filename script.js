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
            this.fireballTarget = [];
            this.fireballTargetX = 0;
            this.fireballTargetY = 0;
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
            window.addEventListener('mousedown', e => {
                if (e.target.id === "canvas") {
                    this.fireballTarget[0] = e.clientX;
                    this.fireballTarget[1] = e.clientY;

                    console.log(this.fireballTarget);
                    
                }
            });
            window.addEventListener('mouseup', e => {
                if (e.target.id === "canvas") {
                    this.fireballTarget.splice(0, this.fireballTarget.length);

                    console.log(this.fireballTarget);
                    
                }
            });
        }

    }

    class Mage {
        constructor(){            
            this.mage = document.getElementById('mage');            
            this.xPosition = 500;
            this.yPosition = 350;
            this.width = 70;
            this.height = 70;
            this.speed = 3;
        }
        draw(context){
            context.drawImage(this.mage, this.xPosition, this.yPosition, this.width, this.height);
        }
        move(input){
            if (input.keys.includes('w')) {                
                this.yPosition -= this.speed;
                console.log(this.yPosition);
            } else if (input.keys.includes('a')) {
                this.xPosition -= this.speed;
                console.log(this.xPosition);
            } else if (input.keys.includes('s')) {
                this.yPosition += this.speed;
                console.log(this.yPosition);
            } else if (input.keys.includes('d')) {
                this.xPosition += this.speed;
                console.log(this.xPosition);
            } else if (input.keys.includes('w') && input.keys.includes('d')) {
                this.yPosition -= this.speed;
                this.xPosition += this.speed;
                console.log(this.yPosition);
                console.log(this.xPosition);
            } else if (input.keys.includes('d') && input.keys.includes('s')) {
                this.yPosition += this.speed;
                this.xPosition += this.speed;
                console.log(this.yPosition);
                console.log(this.xPosition);
            } else if (input.keys.includes('s') && input.keys.includes('a')) {
                this.yPosition += this.speed;
                this.xPosition -= this.speed;
                console.log(this.yPosition);
                console.log(this.xPosition);
            } else if (input.keys.includes('a') && input.keys.includes('w')) {
                this.yPosition -= this.speed;
                this.xPosition -= this.speed;
                console.log(this.yPosition);
                console.log(this.xPosition);
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

    class Fireball {
        constructor(mage){
            this.fireball = document.getElementById('fireball');
            this.xPosition = mage.xPosition;
            this.yPosition = mage.yPosition;            
            this.width = 20;
            this.height = 20;
            this.speed = 6;
        }
        attack(input, context, mage){
            if (input.fireballTarget.length === 2) {
                context.drawImage(this.fireball, this.xPosition, this.yPosition + 30, this.width, this.height);
                this.xPosition += this.speed;
                console.log(`mage position: ${mage.xPosition}`);
            }
        }

        
    }

    const input = new InputHandler();
    const background = new Background(canvas.width, canvas.height);
    const mage = new Mage(canvas.width, canvas.height);
    const fireball = new Fireball(mage);
    const enemy = new Enemy();
    

    function animate(){
        background.draw(ctx);
        mage.draw(ctx);
        mage.move(input, ctx);
        fireball.attack(input, ctx, mage)
        
        //enemy.draw(ctx);
        //enemy.update();
        



        requestAnimationFrame(animate);
    };
    animate();

});



    

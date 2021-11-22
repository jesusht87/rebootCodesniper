
function CodeSniper() {
    //Starter values
    const self = this;
    var timer = 60000;

    this.player = {
        lives: 3
    }
    this.weapon = {
        magazine: 5,
        shot: function () {
            var shotAudio = new Audio('media/sound/shot-sound.mp3')
            var unloadedAudio = new Audio('media/sound/unloaded-sound.mp3')
            if (self.weapon.magazine > 0) {
                shotAudio.play();
                let bulletMagazine = document.getElementById('bullets');
                let bulletToRemove = document.getElementById(`bullet-JS${self.weapon.magazine}`)
                //console.log(bulletMagazine)
                //console.log(bulletToRemove)
                bulletMagazine.removeChild(bulletToRemove)
                self.weapon.magazine--;
            } else {
                unloadedAudio.play();
            }
        },

        reload: function () {
            var audio = new Audio('media/sound/reload.mp3')
            audio.play();

            let reloadBullets = document.getElementById('bullets')

            if (self.weapon.magazine > 0) {
                //remove any remaining bullet;
                let currentBullets = document.querySelectorAll('.bullet-JS')
                currentBullets.forEach(e => {
                    reloadBullets.removeChild(e)
                });
            }

            self.weapon.magazine = 5;

            for (var i = 0; i < self.weapon.magazine; i++) {
                let bulletsJS = document.createElement('img')
                bulletsJS.src = 'media/images/counters/bullet-JS.png'
                bulletsJS.classList.add('bullet-JS')
                bulletsJS.setAttribute('id', `bullet-JS${i + 1}`)
                reloadBullets.appendChild(bulletsJS)
            }
        }
    }
    this.enemy = {
        positionLimits: [140, 380, -30, 510],  // 0 = minY, 1 = maxY, 2 = minX, 3 = maxX
        dimensions: [30, 60], //  0 = width 1 = height
        create: function () {
            const stage = document.getElementById('stage')
            let newEnemy = document.createElement('div')
            newEnemy.classList.add('enemy')
            newEnemy.style.width = self.enemy.dimensions[0]+'px'
            newEnemy.style.height = self.enemy.dimensions[1]+'px'
            newEnemy.style.top = '200px'
            newEnemy.style.left = '200px'
            stage.appendChild(newEnemy)
        
            //   let enemyPositionTop = Math.floor(Math.random()*this.enemy.positionLimits[1]+this.enemy.positionLimits[0])
            //   let enemyPositionLeft = 0
            //     if (enemyPositionTop < 380) {
            //       if (Math.round(Math.random()) === 0) {
            //           enemyPositionLeft = -30
            //       } else {
            //           enemyPositionLeft = 510
            //       }

            //   } else {

            //   }

        }
    }

    this.init = function () {
        //mouse left click shot
        window.addEventListener('click', e => {
            if (e.target.getAttribute('id') == 'stage' || e.target.getAttribute('class') == 'enemy') {
                self.weapon.shot();
            }
        })

        //key R to reload magazine
        window.addEventListener('keydown', e => {
            if (e.key == 'r') {
                self.weapon.reload();
            }
        })

        //Insert initial lives, initial timer and initial bullets
        let initialLives = document.getElementById('lives')

        for (var i = 0; i < this.player.lives; i++) {
            let livesChild = document.createElement('img');
            livesChild.src = 'media/images/counters/heart-full.png';
            livesChild.classList.add('heart-full');
            initialLives.appendChild(livesChild);
        }

        let initialTimer = document.getElementById('time')
        let countDown = document.createElement('div')
        countDown.classList.add('timer')
        countDown.innerText = timer / 1000
        initialTimer.appendChild(countDown)

        let initialBullets = document.getElementById('bullets')

        for (var i = 0; i < this.weapon.magazine; i++) {
            let bulletsJS = document.createElement('img')
            bulletsJS.src = 'media/images/counters/bullet-JS.png'
            bulletsJS.classList.add('bullet-JS')
            bulletsJS.setAttribute('id', `bullet-JS${i + 1}`)
            initialBullets.appendChild(bulletsJS)
        }

        this.enemy.create()
    }
}

let game = new CodeSniper();

game.init();






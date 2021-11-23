
function CodeSniper() {
    const self = this;

    this.player = {
        //player properties
        health: 3,
        //player functions
        updateHealth: function () {
            //gets the lives counter from the DOM
            let healthPoints = document.getElementById('lives')
            //checks and removes any health counter currently placed.
            if (document.querySelectorAll('.heart-full').length > 0) {
                let currentHearts = document.querySelectorAll('.heart-full')
                currentHearts.forEach(e => {
                    healthPoints.removeChild(e)
                });
            }
            //adds as many hearts as health points
            for (var i = 0; i < self.player.health; i++) {
                let heart = document.createElement('img');
                heart.src = 'media/images/counters/heart-full.png';
                heart.classList.add('heart-full');
                healthPoints.appendChild(heart);
            }
        },

        kill: function() {
            //Kill must identify the id of enemy that has been clicked.
            //Must retrieve the id of the attack timeout of the enemy.
            //Must remove the div with id of the clicked enemy
            //Must stop the attack timeout.
            //Must remove enemy from enemy.enemyList array.
        }
    }
    this.weapon = {
        //weapon properties
        magazine: 5,
        //weapon functions
        shot: function () {
            //get the audio files
            var shotAudio = new Audio('media/sound/shot-sound.mp3')
            var unloadedAudio = new Audio('media/sound/unloaded-sound.mp3')
            
            //if there are bullets on the magazine, play the shot audio and remove a bullet from the DOM and the magazine, otherwise plays the "empty" sound
            if (self.weapon.magazine > 0) {
                shotAudio.play();
                self.weapon.updateBullets('shot');
            } else {
                unloadedAudio.play();
            }
        },
        reload: function () {
            var audio = new Audio('media/sound/reload.mp3')
            audio.play();
            self.weapon.updateBullets('reload');
        },
        updateBullets: function(type) {
            let bulletMagazine = document.getElementById('bullets');
            
            switch (type) {
                case 'shot':
                    let bulletToRemove = document.getElementById(`bullet-JS${self.weapon.magazine}`)
                    bulletMagazine.removeChild(bulletToRemove)
                    self.weapon.magazine--;
                    break;
                case 'reload':
                    if (document.querySelectorAll('.bullet-JS').length > 0) {
                        //remove any remaining bullet;
                        let currentBullets = document.querySelectorAll('.bullet-JS')
                        currentBullets.forEach(e => {
                            bulletMagazine.removeChild(e)
                        });
                    }
                    self.weapon.magazine = 5;
                    for (var i = 0; i < self.weapon.magazine; i++) {
                        let bulletsJS = document.createElement('img')
                        bulletsJS.src = 'media/images/counters/bullet-JS.png'
                        bulletsJS.classList.add('bullet-JS')
                        bulletsJS.setAttribute('id', `bullet-JS${i + 1}`)
                        bulletMagazine.appendChild(bulletsJS)
                    }
                    break;
            }
        },
    }
    this.enemy = {
        //enemy properties
        positionLimits: [140, 320, 0, 475],  // 0 = minY, 1 = maxY, 2 = minX, 3 = maxX
        dimensions: [35, 60], //  0 = width 1 = height
        enemyList: [],
        latestID: 0,
        //enemy functions
        create: function () {
            const stage = document.getElementById('stage')

            //get a random x and y for enemy
            // To get a number between a min num and max num, the formula is: math.floor(math.random() * (max - min + 1) + min)
            // We do this to ensure the enemy appears inside the screen and standing in the floor (max and min x and y are in the positionLimits variable)
            let randX = Math.floor(Math.random() * (self.enemy.positionLimits[3] - self.enemy.positionLimits[2] + 1) + self.enemy.positionLimits[2]);
            let randY = Math.floor(Math.random() * (self.enemy.positionLimits[1] - self.enemy.positionLimits[0] + 1) + self.enemy.positionLimits[0]);
            let randTimeOut = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000)

            //push a new enemy into the enemyList with their initial positions.
            self.enemy.enemyList.push({id:self.enemy.latestID, x: randX, y: randY, attackTimeout: randTimeOut})
            //increase the latestID by 1
            self.enemy.latestID++

            //creates the enemy in DOM.
            let newEnemy = document.createElement('div')
            newEnemy.classList.add('enemy')

            //An enemy is always unique, and only may appear 1 time on screen, so it always picks the latest enemy object in the array.
            newEnemy.id = `enemy${self.enemy.enemyList[self.enemy.enemyList.length - 1].id}`
            newEnemy.style.width = self.enemy.dimensions[0]+'px'
            newEnemy.style.height = self.enemy.dimensions[1]+'px'
            newEnemy.style.left = self.enemy.enemyList[self.enemy.enemyList.length - 1].x + 'px'
            newEnemy.style.top = self.enemy.enemyList[self.enemy.enemyList.length - 1].y + 'px'
            stage.appendChild(newEnemy)
        },
        move: function() {
            //enemy must be able to move around the stage
        },
        attack: function() {
            //Enemy must attack at a variable time between 3 to 5 seconds.
            //After attacking, the enemy won't attack again and will just disappear.
                    //Enemy must retrieve timeoutid and stop it
                    //Enemy must retrieve div id and remove from DOM after 1 more second.
            //Attack must check if player.health == 0, in which case it will play game.over()
            //Attack must update player.health and must update DOM to remove hearts.
        },
    }
    this.stage = {
        //stage properties
        level: 0,
        timer: 60000,
        stageCleared: false,
        //stage functions
        updateTimer: function() {
            //this code sets up the timer on the page. Timer has +5s per level. 
            //Level increases each time a stage is cleared.
            let countDownTimer = document.getElementById('time')
        
            //this paramater will increase the timer by 5s in the next level only at level start.
            //self.stage.timer += (5000 * self.stage.level)

            //checks if there's already a timer, in which case, removes the timer from the screen to add the new one.
            if(document.getElementsByClassName('timer').length > 0) {
                let currentTimer = document.querySelectorAll('.timer')
                        currentTimer.forEach(e => {
                            countDownTimer.removeChild(e)
                        });
            }

            let countDown = document.createElement('div')
            countDown.classList.add('timer')
            countDown.innerText = (self.stage.timer / 1000)
            countDownTimer.appendChild(countDown)
        },
        setCountdown: function() {
            //Need a function that will start a countdown in seconds.
            //If timer reaches 0, calls game.clear()
            this.interval = setInterval( () => {
                self.stage.timer -= 1000;
                self.stage.updateTimer();
                if(self.stage.timer === 0) {
                    clearInterval(this.interval);
                    self.game.clear();
                }
            },1000);

        },
        enemyAppear: function() {
           let enemyIntervalTimer = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000);
           this.enemyInterval = setInterval(() => {
               self.enemy.create();
               if (self.stage.stageCleared == true) {
                   clearInterval(this.enemyInterval)
               } else {
                   clearInterval(this.enemyInterval)
                   self.stage.enemyAppear();
               }

            },enemyIntervalTimer);
        }
    }
    this.game = {
        //game properties
        countDown: 0,
        //game functions
        start: function () {
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
    
            //Initial Lives
            self.player.updateHealth();
            //Start Stage Timer CountDown
            self.stage.setCountdown();
            //Load Weapon
            self.weapon.reload()
            //Create enemy
            self.stage.enemyAppear()
        },
        clear: function () {
            //Show Game Clear, number of enemies killed and prepare next level.
            //don't launch next level until "next level" button is shot.
            window.alert('Te has pasado la fase');
            self.stage.stageCleared = true;
        },
        over: function() {
            //Show game over and a count down with Continue?.
            //If continue button is pressed then restart level at the same level.
            //if continue button is not pressed until countdown = 0, then game is over and returns to main page
        }
    }

}

let sniper = new CodeSniper();

sniper.game.start();






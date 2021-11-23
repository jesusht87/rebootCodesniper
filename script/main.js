const stages = [{
        level: 1,
        enemyRate: [3000, 5000], //1 new enemy between 3 and 5 seconds (random)
        timer: 60000, //level timer is 1 minute
        cleared: false,
        class: 'level-one'
    },
    {
        level: 2,
        enemyRate: [2500, 4000], 
        timer: 70000,
        cleared: false
    }]
    
function Stage(level) {
    this.stage = stages.filter(e => { return e.level === level })[0]
    this.timeDown = this.stage.timer;

    this.timer = () => {
        const countDown = document.getElementById('time')

        if(document.getElementsByClassName('timer').length > 0) {
            let currentTimer = document.querySelectorAll('.timer')
                    currentTimer.forEach(e => {
                        countDown.removeChild(e)
                    });
        }

        let counter = document.createElement('div')
        counter.classList.add('timer')
        counter.innerText = (this.timeDown / 1000)
        countDown.appendChild(counter)

    }

    this.clear = () => {
        //Show Game Clear, number of enemies killed and prepare next level.
        //don't launch next level until "next level" button is shot.
        window.alert('Te has pasado la fase');
        this.stage.cleared = true;
    }

    this.screen = () => {
        let screen = document.getElementById('stage')
        screen.classList.add(this.stage.class)
    }
}

function CodeSniper() {
    const self = this;
    this.player = new Player();
    this.level = new Stage(1);
    this.enemyList = []
    
    this.setCountdown = () => {
            this.interval = setInterval( () => {
                self.level.timeDown -= 1000;
                self.level.timer()
                if(self.level.timeDown === 0) {
                    clearInterval(this.interval);
                    self.level.clear();
                }
            },1000);
        }
    
    this.enemyAppear = () => {
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

    this.game = () => {
        //game properties
        countDown = 0,
        //game functions
 
        over = () => {
            //Show game over and a count down with Continue?.
            //If continue button is pressed then restart level at the same level.
            //if continue button is not pressed until countdown = 0, then game is over and returns to main page
        }
    }
    
    this.start = () => {
        self.level.screen();
        //Initial Lives
        self.player.updateHP();
        //Start Stage Timer CountDown
        self.setCountdown();
        //Load Weapon
        self.player.reload()
        //Create enemy
        self.stage.enemyAppear()
    }
}

// let sniper = new CodeSniper();

// sniper.start();






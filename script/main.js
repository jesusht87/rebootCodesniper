var gameIsOn = false;

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
        cleared: false,
        class: 'level-two'
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
           let enemyIntervalTimer = Math.floor(Math.random() * (this.level.stage.enemyRate[1] - this.level.stage.enemyRate[0] + 1) + this.level.stage.enemyRate[0]);
           this.enemyInterval = setInterval(() => {
               
               this.enemyList.push(new Enemy);
               this.enemyList[this.enemyList.length-1].create();

               if (self.level.stage.cleared == true) {
                   clearInterval(this.enemyInterval)
               } else {
                   clearInterval(this.enemyInterval)
                   self.enemyAppear();
               }

            },enemyIntervalTimer);
        }
    
    this.start = () => {
        self.level.screen();
        //Initial Lives
        self.player.updateHP();
        //Start Stage Timer CountDown
        self.setCountdown();
        //Load Weapon
        self.player.reload()
        //Create timer to introduce new enemies.
        self.enemyAppear();

        window.addEventListener('click', e => {
            if (e.target.getAttribute('id') == 'stage' || e.target.getAttribute('class') == 'enemy') {
                if (this.player.magazine > 0) { // Aditional condition checking if magazine have bullets before the shot. If not, plays empty magazine sound.
                this.player.shot(e.target)
                
                } else {
                    this.player.unloaded()
                }
            }
        })
    
        window.addEventListener('keydown', e => {
            if (e.key == 'r') {
               this.player.reload();
            }
        })
    }
}

let sniper = new CodeSniper();

window.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'start') {
        if (gameIsOn === false) {sniper.start(); gameIsOn=true;}
    }
})






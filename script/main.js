

var gameIsOn = false;

const stages = [{
        level: 1,
        enemyRate: [1000, 5000], //1 new enemy between 1 and 5 seconds (random)
        timer: 60000, //level timer is 1 minute
        cleared: false,
        class: 'level-one',
        maplimits: [190, 320, 0, 475],
        bgm: new Audio('media/sound/stage-music-1.mp3')
    },
    {
        level: 2,
        enemyRate: [500, 4500], 
        timer: 70000,
        cleared: false,
        class: 'level-two',
        maplimits: [190, 320, 0, 475],
        bgm: new Audio('media/sound/stage-music-2.mp3')
    },
    {
        level: 3,
        enemyRate: [500, 4500], 
        timer: 70000,
        cleared: false,
        class: 'level-two',
        maplimits: [190, 320, 0, 475],
        bgm: new Audio('media/sound/stage-music-3.mp3')
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
        let indicators = document.getElementById('indicators')
        indicators.style.visibility = 'visible';
    }
}

function CodeSniper() {
    const self = this;
    this.stagelevel = 1; //Game starts on level 1.
    this.player = new Player();
    this.level = new Stage(this.stagelevel);
    this.enemyList = []
    
    this.setCountdown = () => {
            this.interval = setInterval( () => {
                self.level.timeDown -= 1000;
                self.level.timer()
                if(self.level.timeDown === 0) {
                    clearInterval(this.interval);
                    self.level.clear();
                    self.level.stage.bgm.pause();
                    clearInterval(this.enemyInterval);
                }
            },1000);
        }
    
    this.enemyAppear = () => {
           let enemyIntervalTimer = Math.floor(Math.random() * (this.level.stage.enemyRate[1] - this.level.stage.enemyRate[0] + 1) + this.level.stage.enemyRate[0]);
           this.enemyInterval = setInterval(() => {
               
               this.enemyList.push(new Enemy(this.stagelevel, this.player))
               this.enemyList[this.enemyList.length-1].create()
               this.enemyAttack()
             
               if (self.level.stage.cleared == true) {
                   clearInterval(this.enemyInterval)
               } else {
                   clearInterval(this.enemyInterval)
                   self.enemyAppear();
               }
            },enemyIntervalTimer);
        }

    this.enemyAttack = () => {
        let randCountdown = this.enemyList[this.enemyList.length-1].timeOut
        this.enemyList[this.enemyList.length-1].attackTimer = setTimeout(this.enemyList[this.enemyList.length-1].attack, randCountdown)
    }
    
    this.start = () => {
        self.level.screen();
        self.level.stage.bgm.play();
        console.log(document.getElementsByTagName('audio')[0].remove())
        
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
                
                if (e.target.getAttribute('class') == 'enemy') {
                    if (this.player.magazine > 0) {
                        let parent = document.getElementById('stage')
                        parent.removeChild(e.target)
                        let targetIndex = this.enemyList.indexOf(this.enemyList.find(f => 
                            f.enemyTag === e.target.getAttribute('id')
                            ))
                        clearTimeout(this.enemyList.find(f => 
                        f.enemyTag === e.target.getAttribute('id')
                        ).attackTimer) 
                        this.enemyList.splice(targetIndex, 1)
                        console.log(this.enemyList)
                    }
                }
                this.player.shot(e.target)
            }
        })
    
        window.addEventListener('keydown', e => {
            if (e.key == 'r') {
               this.player.reload();
            }
        })
    }

    this.gameOver = () => {
        
    }

    this.nextStage = () => {

    }
}

window.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'start') {
        if (gameIsOn === false) {
            let sniper = new CodeSniper();
            sniper.start(); 
            gameIsOn=true;
        }
    }
})
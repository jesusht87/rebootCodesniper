
function CodeSniper() {
    const self = this;
    this.stagelevel = 1; //Game starts on level 1.
    this.enemyList = []

    this.start = () => {
        this.level = new Stage();
        this.player = new Player();

        this.setCountdown();
        this.enemyAppear();

        document.getElementById('stage').addEventListener('click', function (e) {
            if (e.target.getAttribute('class') == 'enemy' && this.player.magazine > 0) {

                let enemyToDelete = this.enemyList.find(enemy =>
                    enemy.enemyTag === e.target.getAttribute('id')
                )
                enemyToDelete.die()
                this.enemyList = this.enemyList.filter(e => e.enemyTag !== enemyToDelete.enemyTag)
            }
            this.player.shot()
        })

        window.addEventListener('keydown', e => {
            if (e.key == 'r') {
                this.player.reload();
            }
        })
    }

    this.setCountdown = () => {
        this.interval = setInterval(function () {
            this.level.timeDown -= 1000;
            this.level.timer()
            if (this.level.timeDown === 0) {
                clearInterval(this.interval);
                clearInterval(this.enemyInterval);
                this.level.clear();
                this.level.stage.bgm.pause();
            }
        }.bind(this), 1000);
    }

    this.enemyAppear = () => {
        let enemyIntervalTimer = Math.floor(Math.random() * (this.level.stage.enemyRate[1] - this.level.stage.enemyRate[0] + 1) + this.level.stage.enemyRate[0]);
        this.enemyInterval = setInterval(() => {

            this.enemyList.push(new Enemy(this.stagelevel, this.player))
            this.enemyAttack()

            if (self.level.stage.cleared == true) {
                clearInterval(this.enemyInterval)
            } else {
                clearInterval(this.enemyInterval)
                self.enemyAppear();
            }
        }, enemyIntervalTimer);
    }

    this.enemyAttack = () => {
        let enemy = this.enemyList[this.enemyList.length - 1]        
        enemy.attackTimer = setTimeout(this.player.receiveShot.bind(this), enemy.timeOut)
    }

    this.gameOver = () => {

    }

    // Checks if:
    // 1. Stops music,attack & enemy timers OK
    // 2. Creates new DIV showing the screen "continue-screen" OK
    // 4. In that screen, when player clicks in "Continue"...
    //      5. Level goes up to the next number (+1)
    //      6. Enemies array will be cleared and will dissapear from DOM
    //      7. Changes background 
    //      8. We call to a new CodeSniper game
    this.endOfStage = () => {
        self.level.stage.bgm.pause()
        clearInterval(this.enemyInterval)
        this.enemyList.forEach(enemy => {
            clearInterval(enemy.attackTimer)
        });

        const oldStage = document.getElementById('screen')
        let newScreen = document.createElement('div')
        newScreen.classList.add('stage')
        newScreen.id = `continue-screen`
        oldStage.appendChild(newScreen)

        const stages = document.getElementById('stage')
        stages.removeChild('div')  // Eliminar enemigos del DOM?

        window.addEventListener('click', e => {
            if (e.target.getAttribute('id') === 'continue') {
                this.newStage()
            }
        })

    }

    // Prepares and clears everything, so we can build after the new stage.
    this.newStage = () => {
        this.stage = stages.filter(e => { return e.level === level })[1]
        this.enemyList = []



    }
}


//Starts the game
var gameIsOn = false;
document.getElementById('start').addEventListener(e => {
    if (!gameIsOn) {
        let sniper = new CodeSniper();
        sniper.start();
        gameIsOn = true;
    }
})
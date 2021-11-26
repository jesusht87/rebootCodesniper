var gameIsOn = false;

function CodeSniper() {
    const self = this;
    this.player = new Player();
    this.level = new Stage();
    this.enemyList = []

    this.setCountdown = () => {
        this.interval = setInterval(() => {
            self.level.timeDown -= 1000;
            self.level.timer()
            if (self.level.timeDown === 0) {
                clearInterval(this.interval);
                this.stageClear()
            }
        }, 1000);

        this.checkHealth = setInterval(function () {
            if (this.player.health == 0) {
                this.gameOver();
                clearInterval(this.checkHealth)
            }
        }.bind(this),100)
    }

    this.stageClear = () => {
        self.level.clear();
        self.level.stage.bgm.pause();
        clearInterval(this.enemyInterval);
        document.getElementById('continue').addEventListener('click', () => {
            if (this.level.stage.cleared == true) {
                this.level.newStage()
                this.start()
            }
        })
        let parent = document.getElementById('stage')
        let enemies = document.querySelectorAll('.enemy')
        enemies.forEach(enemy => {
            parent.removeChild(enemy)
        });
        this.enemyList.forEach(enemy => {
            clearTimeout(enemy.attackTimer)
        })
        this.enemyList = []
    }

    this.enemyAppear = () => {
        let enemyIntervalTimer = Math.floor(Math.random() * (this.level.stage.enemyRate[1] - this.level.stage.enemyRate[0] + 1) + this.level.stage.enemyRate[0]);
        this.enemyInterval = setInterval(() => {

            this.enemyList.push(new Enemy(this.level.currentLevel, this.player))
            this.enemyList[this.enemyList.length - 1].create()
            this.enemyAttack()

            if (self.level.stage.cleared == true) {
                clearInterval(this.enemyInterval)
            } else {
                clearInterval(this.enemyInterval)
                self.enemyAppear();
            }
        }, enemyIntervalTimer)
    }

    this.enemyAttack = () => {
        let randCountdown = this.enemyList[this.enemyList.length - 1].timeOut
        this.enemyList[this.enemyList.length - 1].attackTimer = setTimeout(this.enemyList[this.enemyList.length - 1].attack, randCountdown)
    }

    this.start = () => {
        self.level.screen();
        self.level.stage.bgm.play();
        document.getElementsByTagName('audio')[0].pause()

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
                    }
                }
                this.player.shot(e.target)
            }
            this.player.shot(e.target)
        })


        window.addEventListener('keydown', e => {
            if (e.key == 'r') {
                this.player.reload();
            }
        })

    }


    this.gameOver = () => {

        clearInterval(this.interval)
        clearInterval(this.enemyInterval)

        let stageParent = document.getElementById('stage')
        this.enemyList.forEach(e => {
            clearTimeout(e.attackTimer)
            stageParent.removeChild(document.getElementById(e.enemyTag))
        })
        this.enemyList = []

        stageParent.classList.remove('level-one')
        stageParent.classList.add('game-over')

        this.level.stage.bgm.pause()

        document.getElementById('indicators').style.visibility = 'hidden'

    }

}

//Starts the game
window.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'start') {
        if (gameIsOn === false) {
            let sniper = new CodeSniper();
            sniper.start();
            gameIsOn = true;
        }
    }
})
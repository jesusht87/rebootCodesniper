let bgmPrincipal = document.getElementsByTagName('audio')
bgmPrincipal[0].volume = 0.1

function CodeSniper() {
    this.enemyList = []

    this.start = (level=1) => {
        bgmPrincipal[0].pause()
        this.stage = new Stage(level)
        this.player = new Player()
        //Start Stage Timer CountDown
        this.chronometer();
        //Create timer to introduce new enemies.
        this.enemyAppear();
        //Checks player health > 0 or game over
        this.checkHealth = setInterval(function () {
            if (this.player.health === 0) {
                console.log('game over')
                this.gameOver()
            }
            console.log(this.checkHealth)
        }.bind(this), 100)

        //listens to shot (click the mouse on the gaming screen)
        document.getElementById('stage').addEventListener('click', shot = function (e) {
            let parent = document.getElementById('stage')
            if (e.target.getAttribute('class') == 'enemy' && this.player.magazine > 0) {
                parent.removeChild(e.target)
                let targetIndex = this.enemyList.indexOf(this.enemyList.find(f =>
                    f.enemyTag === e.target.getAttribute('id')
                ))
                clearTimeout(this.enemyList.find(f =>
                    f.enemyTag === e.target.getAttribute('id')
                ).attackTimer)
                this.enemyList.splice(targetIndex, 1)
            }
            this.player.shot(e.target)
        }.bind(this))

        //listens to reload (r button on keyboard)
        window.addEventListener('keydown', reload = function (e) {
            if (e.key == 'r') {
                this.player.reload();
            }
        }.bind(this))
    }

    this.chronometer = () => {
        this.clock = setInterval(function() {
            this.stage.timeDown -= 1000;
            this.stage.refreshClock()
            if (this.stage.timeDown === 0) {
                clearInterval(this.clock);
                this.stageClear()
            }
        }.bind(this), 1000);
    }

    this.enemyAppear = () => {
        let maxRate = this.stage.map.enemyRate[1]
        let minRate = this.stage.map.enemyRate[0]
        let enemyIntervalTimer = Math.floor(Math.random() * (maxRate - minRate + 1) + minRate);

        this.enemyInterval = setInterval(() => {

            this.enemyList.push(new Enemy(this.stage.map.level))
            this.currentEnemy = this.enemyList[this.enemyList.length-1]
            this.enemyAttack(this.currentEnemy)

            if (this.stage.map.cleared == true) {
                clearInterval(this.enemyInterval)
            } else {
                clearInterval(this.enemyInterval)
                this.enemyAppear();
            }
        }, enemyIntervalTimer)
    }

    this.enemyAttack = (currentEnemy) => {
        currentEnemy.attackTimer = setTimeout(function () {
            this.player.receiveDamage();
        }.bind(this),this.currentEnemy.timeOut)
    } 

    this.stageClear = () => {
        document.getElementById('stage').removeEventListener('click',shot)
        window.removeEventListener('keydown',reload)

        this.stage.clear();
        
        clearInterval(this.enemyInterval);
        clearInterval(this.checkHealth)

        document.getElementById('indicators').style.visibility = 'hidden'

        let parent = document.getElementById('stage')
        let enemies = document.querySelectorAll('.enemy')
        enemies.forEach(enemy => {
            parent.removeChild(enemy)
        });

        this.enemyList.forEach(enemy => {
            clearTimeout(enemy.attackTimer)
        })
        this.enemyList = []

        document.getElementById('continue').addEventListener('click',contButton = function () {
            if (this.stage.map.cleared == true && this.stage.currentLevel < maps.length) {
                this.stage.newStage()
                this.start(this.stage.currentLevel)
                document.getElementById('continue').removeEventListener('click',contButton)
            }
        }.bind(this))
    }

    this.gameOver = () => {
        document.getElementById('stage').removeEventListener('click',shot)
        window.removeEventListener('keydown',reload)

        clearInterval(this.clock)
        clearInterval(this.enemyInterval)
        clearInterval(this.checkHealth)

        this.stageParent = document.getElementById('stage')
        this.enemyList.forEach(e => {
            clearTimeout(e.attackTimer)
            this.stageParent.removeChild(document.getElementById(e.enemyTag))
        })
        this.enemyList = []

        this.stageParent.classList.remove(this.stage.map.levelClass)
        this.stageParent.classList.add('game-over')

        this.stage.map.bgm.pause()
        let gameOverFanfare = new Audio('media/sound/russian-funeral.mp3')
        gameOverFanfare.play();
        gameOverFanfare.volume = 0.1

        document.getElementById('indicators').style.visibility = 'hidden'

        let counter = 10000
        this.continueCountDown = document.createElement('div')
        this.continueCountDown.classList.add('continue-counter')
        this.continueCountDown.innerText = `Continue? ${counter / 1000}`

        this.stageParent.appendChild(this.continueCountDown)
        this.continueText = setInterval(function() {
            counter -= 1000
            this.stageParent.removeChild(this.continueCountDown)
            this.continueCountDown.innerText = `Continue? ${counter / 1000}`
            this.stageParent.appendChild(this.continueCountDown)
        }.bind(this),1000)

        document.getElementById('continue').addEventListener('click', continueStage = function() {
            this.continue()
            this.stageParent.removeChild(this.continueCountDown)
            this.stageParent.classList.remove('game-over')
            clearInterval(this.continueText)
            clearTimeout(this.noContinue)
            gameOverFanfare.pause()
        }.bind(this))

        this.noContinue = setTimeout(() => {
            window.location.reload()
        },10000)

        }

    this.continue = () => {
        document.getElementById('continue').removeEventListener('click', continueStage)
        bgmPrincipal[0].pause()
        this.player.health = 3
        this.player.updateHP();
        this.player.reload();

        this.stage.timeDown = this.stage.map.mapTime
        this.stage.screen()
        this.stage.map.bgm.play()
        //Start Stage Timer CountDown
        this.chronometer();
        //Create timer to introduce new enemies.
        this.enemyAppear();
        //Checks player health > 0 or game over
        this.checkHealth = setInterval(function () {
            if (this.player.health === 0) {
                console.log('game over')
                this.gameOver()
            }
            console.log(this.checkHealth)
        }.bind(this), 100)

        //listens to shot (click the mouse on the gaming screen)
        document.getElementById('stage').addEventListener('click', shot = function (e) {
            let parent = document.getElementById('stage')
            if (e.target.getAttribute('class') == 'enemy' && this.player.magazine > 0) {
                parent.removeChild(e.target)
                let targetIndex = this.enemyList.indexOf(this.enemyList.find(f =>
                    f.enemyTag === e.target.getAttribute('id')
                ))
                clearTimeout(this.enemyList.find(f =>
                    f.enemyTag === e.target.getAttribute('id')
                ).attackTimer)
                this.enemyList.splice(targetIndex, 1)
            }
            this.player.shot(e.target)
        }.bind(this))

        //listens to reload (r button on keyboard)
        window.addEventListener('keydown', reload = function (e) {
            if (e.key == 'r') {
                this.player.reload();
            }
        }.bind(this))  
    }
}

//Starts the game
var gameIsOn = false;
window.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'start') {
        if (gameIsOn === false) {
            let sniper = new CodeSniper();
            sniper.start();
            gameIsOn = true;
        }
    }
})


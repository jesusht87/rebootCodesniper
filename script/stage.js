function Stage(level = 1) {
    this.map = maps[level - 1]
    this.timeDown = this.map.mapTime;
    this.currentLevel = level

    this.screen = () => {
        this.stage = document.getElementById('stage')
        this.stage.classList.add(this.map.levelClass)
        this.indicators = document.getElementById('indicators')
        this.indicators.style.visibility = 'visible';
    }

    this.refreshClock = () => {
        const countDown = document.getElementById('time')

        if (document.querySelector('.timer')) {
            let currentTimer = document.querySelector('.timer')
            countDown.removeChild(currentTimer)
        }

        let counter = document.createElement('div')
        counter.classList.add('timer')
        counter.innerText = (this.timeDown / 1000)
        countDown.appendChild(counter)
    }

    this.clear = () => {
        this.map.bgm.pause()
        this.stage.classList.remove(this.map.levelClass)
        if (this.map.level === maps.length) {
            this.stage.classList.add('end-game-screen')
            this.endMusic = new Audio('media/sound/MGSMT.mp3')
            this.endMusic.play()
            this.endMusic.volume = 0.1
        } else {
            this.stage.classList.add('next-stage')
        }
        
        this.map.cleared = true;  
    }
    // Prepares and clears everything, so we can build after the new stage.
    this.newStage = () => {
        this.currentLevel++
        this.map = maps[this.currentLevel - 1]
        this.timeDown  = this.map.mapTime
        const continueStage = document.getElementById('stage')
        continueStage.classList.remove('next-stage')
        continueStage.classList.add(this.map.levelClass)
    }

    this.gameOver = () => {
        this.stage.classList.remove(this.map.levelClass)
        this.stage.classList.add('game-over')

        this.map.bgm.pause()
        this.gameOverFanfare = new Audio('media/sound/russian-funeral.mp3')
        this.gameOverFanfare.play();
        this.gameOverFanfare.volume = 0.1
    }

    this.continue = () => {
        let counter = 10000
        this.continueCountDown = document.createElement('div')
        this.continueCountDown.classList.add('continue-counter')
        this.continueCountDown.innerText = `Continue? ${counter / 1000}`

        this.stage.appendChild(this.continueCountDown)

        this.continueText = setInterval(function() {
            counter -= 1000
            this.stage.removeChild(this.continueCountDown)
            this.continueCountDown.innerText = `Continue? ${counter / 1000}`
            this.stage.appendChild(this.continueCountDown)
        }.bind(this),1000)

        this.noContinue = setTimeout(() => {
            window.location.reload()
        },10000)
    }

    this.screen()
    this.map.bgm.play()
    this.map.bgm.volume = 0.1
}
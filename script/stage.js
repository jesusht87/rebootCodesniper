function Stage(level = 1) {
    this.map = maps[level - 1]
    this.timeDown = this.map.mapTime;
    this.currentLevel = level

    this.screen = () => {
        let screen = document.getElementById('stage')
        screen.classList.add(this.map.levelClass)
        let indicators = document.getElementById('indicators')
        indicators.style.visibility = 'visible';
    }
    this.refreshClock = () => {
        const countDown = document.getElementById('time')

        if (document.querySelectorAll('.timer').length > 0) {
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
        this.map.bgm.pause()
        const continueStage = document.getElementById('stage')
        continueStage.classList.remove(this.map.levelClass)
        continueStage.classList.add('next-stage')
        this.map.cleared = true;  
    }
    // Prepares and clears everything, so we can build after the new stage.
    this.newStage = () => {
        this.currentLevel++
        //this.map = maps[this.currentLevel - 1]
        //this.timeDown  = this.map.mapTime
        const continueStage = document.getElementById('stage')
        continueStage.classList.remove('next-stage')
        continueStage.classList.add(this.map.levelClass)
    }

    this.screen()
    this.map.bgm.play()
    this.map.bgm.volume = 0.1
}
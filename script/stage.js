function Stage(level = 1) {
    this.stage = stages[level - 1]
    this.timeDown = this.stage.timer;
    this.currentLevel = level

    this.timer = () => {
        const countDown = document.getElementById('time')

        if (document.getElementsByClassName('timer').length > 0) {
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
        this.stage.bgm.pause()

        const continueStage = document.getElementById('stage')
        continueStage.classList.remove(this.stage.class)
        continueStage.classList.add('next-stage')

        this.stage.cleared = true;
        
    }

    // Prepares and clears everything, so we can build after the new stage.
    this.newStage = () => {
        this.currentLevel++
        this.stage = stages[this.currentLevel - 1]
        console.log(this.stage)
        this.timeDown  = this.stage.timer
        const continueStage = document.getElementById('stage')
        continueStage.classList.remove('next-stage')
        continueStage.classList.add(this.stage.class)
    }

    this.screen = () => {
        let screen = document.getElementById('stage')
        screen.classList.add(this.stage.class)
        let indicators = document.getElementById('indicators')
        indicators.style.visibility = 'visible';
    }
}
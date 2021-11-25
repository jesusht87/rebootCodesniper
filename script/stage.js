function Stage(level=1) {
    this.stage = stages[level-1]
    this.timeDown = this.stage.stageTime;
    
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

    this.screen();
    this.stage.bgm.play();
}
var enemyCount = 0 //used for the creation of the unique id of each enemy.

function Enemy(level, player) {
    this.levelPositions = stages.filter(e => { return e.level === level })[0].maplimits;
    //enemy properties
    this.dimensions = [35, 60] //  0 = width 1 = height
    this.posX = Math.floor(Math.random() * (this.levelPositions[3] - this.levelPositions[2] + 1) + this.levelPositions[2])
    this.posY = Math.floor(Math.random() * (this.levelPositions[1] - this.levelPositions[0] + 1) + this.levelPositions[0])
    this.timeOut = Math.floor(Math.random() * (3000 - 2000 + 1) + 2000)
    this.attackTimer
    this.player = player
    this.enemyTag = 'enemy' + enemyCount
    
    //enemy functions
    this.create = () => {
        const stage = document.getElementById('stage')

        //creates the enemy in DOM.
        let newEnemy = document.createElement('div')
        newEnemy.classList.add('enemy')

        //An enemy is always unique, and only may appear 1 time on screen, so it always picks the latest enemy object in the array.
        newEnemy.id = `enemy${enemyCount}`
        newEnemy.style.width = this.dimensions[0]+'px'
        newEnemy.style.height = this.dimensions[1]+'px'
        newEnemy.style.left = this.posX + 'px'
        newEnemy.style.top = this.posY + 'px'
        stage.appendChild(newEnemy)
        enemyCount++
    }

    this.move = () => {
        //enemy must be able to move around the stage
    }

    this.attack = () => {
        if (this.player.health > 0) {
            this.player.health--
            let hearts = document.getElementById('lives')
            let heartRemoved = document.getElementsByClassName('heart-full')
            hearts.removeChild(heartRemoved[0])
        }
    }
}

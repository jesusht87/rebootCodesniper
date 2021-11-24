const positionLimits = [140, 320, 0, 475]  // 0 = minY, 1 = maxY, 2 = minX, 3 = maxX
var enemyCount = 0

function Enemy() {
    //enemy properties
    this.dimensions = [35, 60] //  0 = width 1 = height
    this.posX = Math.floor(Math.random() * (positionLimits[3] - positionLimits[2] + 1) + positionLimits[2])
    this.posY = Math.floor(Math.random() * (positionLimits[1] - positionLimits[0] + 1) + positionLimits[0])
    this.timeOut = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000)
    
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
        //Enemy must attack at a variable time between 3 to 5 seconds.
        //After attacking, the enemy won't attack again and will just disappear.
                //Enemy must retrieve timeoutid and stop it
                //Enemy must retrieve div id and remove from DOM after 1 more second.
        //Attack must check if player.health == 0, in which case it will play game.over()
        //Attack must update player.health and must update DOM to remove hearts.
    }

    this.removeEnemy = () => {
        //Removes the specific enemy from the DOM after being shooted
        enemyDeleted = e.target.getAttribute('id')
        enemyDeleted.remove()
    }
}

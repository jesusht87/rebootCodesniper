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
        this.html = document.createElement('div')
        this.html.classList.add('enemy')

        //An enemy is always unique, and only may appear 1 time on screen, so it always picks the latest enemy object in the array.
        this.html.id = `enemy${enemyCount}`
        this.html.style.width = this.dimensions[0]+'px'
        this.html.style.height = this.dimensions[1]+'px'
        this.html.style.left = this.posX + 'px'
        this.html.style.top = this.posY + 'px'
        stage.appendChild(this.html)
        enemyCount++
    }

    this.move = () => {
        //enemy must be able to move around the stage
    }

    this.attack = () => {
        if (this.player.health  > 0){
            this.player.health--
            let hearts = document.getElementById('lives')
            let heartRemoved = document.getElementsByClassName('heart-full')
            hearts.removeChild(heartRemoved[0])
        } 
        //Enemy must attack at a variable time between 3 to 5 seconds.
        //After attacking, the enemy won't attack again and will just disappear.
                //Enemy must retrieve timeoutid and stop it
                //Enemy must retrieve div id and remove from DOM after 1 more second.
        //Attack must check if player.health == 0, in which case it will play game.over()
        //Attack must update player.health and must update DOM to remove hearts.
    }

    this.die = () => {
        // eliminar elemento del dom
        document.getElementById('stage').removeChild(this.html)        
        // parar ataque
        clearTimeout(this.attackTimer)
    }

    this.create()
}

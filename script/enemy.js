var enemyCount = 0 //used for the creation of the unique id of each enemy.

const genDirection = function () {
    let x = Math.floor(Math.random() * 100) > 50 ? 'right' : 'left'
    let y = Math.floor(Math.random() * 100) > 50 ? 'up' : 'down'
    let s = Math.floor(Math.random() * (10 - 5 + 5) + 5)

    return {x: x, y: y, speed: s}
}

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
        this.direction = genDirection();

        this.movement = setInterval(() => {
            let currentX = parseInt(this.html.style.left.replace(/px/g,''))
            let currentY = parseInt(this.html.style.top.replace(/px/g,''))
            switch (this.direction.x) {
                case 'right':
                    if(parseInt(this.html.style.left.replace(/px/g,'')) <= this.mapLimits[3]) {
                        currentX++
                        this.html.style.left = currentX + 'px';
                    } else {
                        this.direction.x = 'left'
                    }
                    break;
                case 'left':
                    if(parseInt(this.html.style.left.replace(/px/g,'')) >= this.mapLimits[2]) {
                        currentX--
                        this.html.style.left = currentX + 'px';
                    } else {
                        this.direction.x = 'right'
                    }
                    break;
            }
            switch (this.direction.y) {
                case 'up':
                    if(parseInt(this.html.style.top.replace(/px/g,'')) <= this.mapLimits[1]) { //bottom
                        currentY++
                        this.html.style.top = currentY + 'px';
                    
                    } else {
                        this.direction.y = 'down'
                    }
                    break;
                case 'down':
                    if(parseInt(this.html.style.top.replace(/px/g,'')) >= this.mapLimits[0]) { //top
                        currentY--
                        this.html.style.top = currentY + 'px';
                    
                    } else {
                        this.direction.y = 'up'
                    }
                    break;
            }        
        },this.direction.speed)
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

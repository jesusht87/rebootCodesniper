var enemyCount = 0 //used for the creation of the unique id of each enemy.

const genDirection = function () {
    let x = Math.floor(Math.random() * 100) > 50 ? 'right' : 'left'
    let y = Math.floor(Math.random() * 100) > 50 ? 'up' : 'down'
    let s = Math.floor(Math.random() * (10 - 5 + 5) + 5)

    return {x: x, y: y, speed: s}
}

function Enemy(level) {
    this.coordinates = generateCoordinates(level) // [x, y]
    
    // [minTop, maxTop, minLeft, maxLeft]
    this.mapLimits = maps[level-1].mapLimits

    //enemy properties
    this.dimensions = [35, 60] //  0 = width 1 = height
    this.timeOut = Math.floor(Math.random() * (3000 - 2000 + 1) + 2000)
    this.attackTimer
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
        this.html.style.left = `${this.coordinates[0]}px`
        this.html.style.top = `${this.coordinates[1]}px`
        stage.appendChild(this.html)
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

    this.create()
    this.move()
}

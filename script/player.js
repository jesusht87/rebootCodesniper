function Player() {
    //player parameters
    this.health = 3
    this.magazine = 5

    //player functions
    this.updateHP = () => {
            //gets the lives counter from the DOM
            let HP = document.getElementById('lives')
            //checks and removes any health counter currently placed.
            if (document.querySelectorAll('.heart-full').length > 0) {
                let current = document.querySelectorAll('.heart-full')
                current.forEach(e => {
                    HP.removeChild(e)
                });
            }
            //adds as many hearts as health points
            for (var i = 0; i < this.health; i++) {
                let heart = document.createElement('img')
                heart.classList.add('heart-full');
                heart.src = 'media/images/counters/heart-full.png'
                HP.appendChild(heart);
            }
    }
    
    this.shot = (target) => {
        
        if (this.magazine > 0) {
            var shotAudio = new Audio('media/sound/shot-sound.mp3')
            shotAudio.play();
            this.updateMagazine('shot');
            
        } else this.unloaded();
     
    }
    
    this.unloaded = () => {
        var unloadedAudio = new Audio('media/sound/unloaded-sound.mp3')
        unloadedAudio.play();
    }

    this.reload = () => {
        var audio = new Audio('media/sound/reload.mp3')
        audio.play();
        this.updateMagazine('reload');
    }

    this.updateMagazine = type => {
        let bulletMagazine = document.getElementById('bullets');

        switch (type) {
            case 'shot':
                let bulletToRemove = document.getElementById(`bullet-JS${this.magazine}`)
                bulletMagazine.removeChild(bulletToRemove)
                this.magazine--;
                break;
            case 'reload':
                if (document.querySelectorAll('.bullet-JS').length > 0) {
                    //remove any remaining bullet;
                    let currentBullets = document.querySelectorAll('.bullet-JS')
                    currentBullets.forEach(e => {
                        bulletMagazine.removeChild(e)
                    });
                }

                this.magazine = 5;

                for (var i = 0; i < this.magazine; i++) {
                    let bulletsJS = document.createElement('img')
                    bulletsJS.classList.add('bullet-JS')
                    bulletsJS.src = 'media/images/counters/bullet-JS.png'
                    bulletsJS.setAttribute('id', `bullet-JS${i + 1}`)
                    bulletMagazine.appendChild(bulletsJS)
                }
                break;
        }
    }

    this.receiveDamage = () => {
        if (this.health > 0) {
            this.health--
            let hearts = document.getElementById('lives')
            let heartRemoved = document.getElementsByClassName('heart-full')
            hearts.removeChild(heartRemoved[0])
        }
    }

    this.updateHP();
    this.reload();
}
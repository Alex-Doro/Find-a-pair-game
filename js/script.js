const findPairGame = {
    game: document.querySelector('.find-a-pair-game'),
    newGameBtn: document.querySelector('.new-game-btn'),
    iterator: 0, //maximum 2 as we are looking at two flipped card to check if they are the same

    setEvents() {
        this.newGameBtn.addEventListener('click', e => this.setPictures(e))
        this.game.addEventListener('click', e => this.rotateCard(e))
    },

    setPictures() {
        // Remove new game button
        this.newGameBtn.classList.toggle('active'); 
        // Show cards for the first time, after that cards will be hidden by 'found' class on each card
        if (!this.game.classList.contains('active')) this.game.classList.toggle('active');
        // Remove 'found' class from cards to start a new game
        if (document.querySelectorAll('.find-a-pair-game__card.found').length) {
            for (let item of document.querySelectorAll('.find-a-pair-game__card.found')) {
                item.classList.toggle('found')
            }
        }
        // Generate an array of numbers from 1 to 8 in a random order 
        // which represents files names of pictures that we will pull e.g. /img/food/food-5,
        // where 5 was randomly put at pictureIdArr[0]. There are two identical numbers of each number 
        // in array as we have to put 2 similar images on the game field
        let pictureIdArr = [];
        while (pictureIdArr.length !== 16) {
            let randomNum = Math.floor(Math.random() * 8) + 1
            if (pictureIdArr.filter(item => item === randomNum).length <= 1) pictureIdArr.push(randomNum)
        }
        
        // Iterating through 16 cards on a game field, putting a random image in each
        for (i = 1; i <= 16; i++) {
            document.getElementById(i).lastElementChild.setAttribute('style', `background-image: url(./img/food/food-${pictureIdArr[i - 1]}.jpg)`)
        }
    },

    cardsNotSame(e) {
        setTimeout(() => {
            document.querySelector('*').setAttribute('style', 'pointer-events: auto')
            const activeCards = document.querySelectorAll('.find-a-pair-game__card.active')
            activeCards[0].classList.toggle('active');
            activeCards[1].classList.toggle('active');
            this.iterator = 0
        }, 1500)
    },

    cardsAreSame(e) {
        setTimeout(() => {
            document.querySelector('*').setAttribute('style', 'pointer-events: auto')
            const activeCards = document.querySelectorAll('.find-a-pair-game__card.active')
            activeCards[0].classList.toggle('active');
            activeCards[1].classList.toggle('active');
            activeCards[0].classList.toggle('found');
            activeCards[1].classList.toggle('found');
            this.iterator = 0
            if (document.querySelectorAll('.find-a-pair-game__card.found').length === 16) this.newGameBtn.classList.toggle('active')
        }, 1500)
    },

    rotateCard(e) {
        if (e.target.classList.contains('find-a-pair-game__card-item')) {
            e.target.parentElement.classList.toggle('active');
            this.iterator++
        }
        
        const activeCards = document.querySelectorAll('.find-a-pair-game__card.active')
        if (this.iterator === 2) {
            document.querySelector('*').setAttribute('style', 'pointer-events: none')
            if (activeCards[0].lastElementChild.style.backgroundImage === activeCards[1].lastElementChild.style.backgroundImage) this.cardsAreSame(e)
            if (activeCards[0].lastElementChild.style.backgroundImage !== activeCards[1].lastElementChild.style.backgroundImage) this.cardsNotSame(e)
        }
    }
}

findPairGame.setEvents()
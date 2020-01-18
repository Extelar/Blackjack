let cards = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13]
let totalCards = cards.length;
const playerOneBoard = document.querySelector('.board__cards__one');
const playerTwoBoard = document.querySelector('.board__cards__two');
const deckCounter = document.querySelector('.deck__count span');
const hitButton = document.querySelector('.hit');
const stayButton = document.querySelector('.stay');
const foldButton = document.querySelector('.fold');

const changeCardPosition = (className) => {
    let card = document.querySelector(className)
    card.style.opacity = '1';
    card.style.top = '35rem';
    card.style.left = '20rem';
    card.style.visibility = 'visible';
}

const createCard = (sourceUrl,alternateText) => {
    let card = document.createElement('div');
    let image = document.createElement('img');
    card.classList.add("card");
    image.src = sourceUrl;
    image.alt = alternateText;
    card.appendChild(image);
    return card;
}

const getCard = (number) => {
    const card = createCard('./assets/images/2D.png','space-one')
    playerTwoBoard.appendChild(card);
    console.log(playerTwoBoard);
}

const updateDeckCounter = () => {
    deckCounter.innerHTML = totalCards;
}

hitButton.addEventListener('click', () => {
    changeCardPosition('.card img');
})

updateDeckCounter();
getCard(1);
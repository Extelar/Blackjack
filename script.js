let cards = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13]
let totalCards = cards.length;
let cardSectionCounter = 1;
let leftIncrement = 0.9;
let cardLeftPosition = 29.6;
let lastLeftPosition = 0;
let isPlayerOneTurn = true;
let isStayButtonClicked = false;
let playersTotalScore = [0,0];
const playerOneBoard = document.querySelector('.board__cards__one');
const playerTwoBoard = document.querySelector('.board__cards__two');
const deckCounter = document.querySelector('.deck__count span');
const hitButton = document.querySelector('.hit');
const stayButton = document.querySelector('.stay');
const foldButton = document.querySelector('.fold');


const changeCardPosition = (className) => {
    let card = document.querySelector(className)
    isPlayerOneTurn ? card.style.top = '6rem' : card.style.top = '35rem';
    if (isPlayerOneTurn)
    {
        cardLeftPosition += leftIncrement;
    }
    card.style.opacity = '1';
    card.style.left = cardLeftPosition.toString() + 'rem';
    card.style.visibility = 'visible';
}

const changePlayerIndicator = (boolean, sectionOne, sectionTwo) => {
    if (boolean) 
    {
        document.querySelector(sectionOne).style.cssText = 'color: yellow; background: #300606; border-radius: 5px';
        document.querySelector(sectionTwo).style.cssText = 'color: #fff; background: none';
    }
    else 
    {
        document.querySelector(sectionOne).style.cssText = 'color: #fff; background: none';
        document.querySelector(sectionTwo).style.cssText = 'color: yellow; background: #300606; border-radius: 5px';
    }  
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
    let card;
    switch(number) {
        case 1:
            card = createCard('./assets/images/AS.png','cards');
            break;
        case 2:
            card = createCard('./assets/images/2D.png','cards');
            break;
        case 3:
            card = createCard('./assets/images/3C.png','cards');
            break;
        case 4:
            card = createCard('./assets/images/4H.png','cards');
            break;
        case 5:
            card = createCard('./assets/images/5S.png','cards');
            break;
        case 6:
            card = createCard('./assets/images/6D.png','cards');
            break;
        case 7:
            card = createCard('./assets/images/7C.png','cards');
            break;
        case 8:
            card = createCard('./assets/images/8S.png','cards');
            break;
        case 9:
            card = createCard('./assets/images/9D.png','cards');
            break;
        case 10:
            card = createCard('./assets/images/10H.png','cards');
            break;
        case 11:
            card = createCard('./assets/images/JC.png','cards');
            break;
        case 12:
            card = createCard('./assets/images/QD.png','cards');
            break;
        case 13:
            card = createCard('./assets/images/KH.png','cards');
            break;
        default:
            card = createCard('./assets/images/2D.png','cards');
            break;
    }
    playerTwoBoard.appendChild(card);
    console.log(playerTwoBoard);
}

const updateAllCounter = () => {
    let nullCounter = 0;
    for (el of cards)
    {
        if (el === null)
        {
            nullCounter += 1;
        }
    }
    deckCounter.innerHTML = totalCards - nullCounter;
    cardSectionCounter += 1;
    isPlayerOneTurn ? isPlayerOneTurn = false : isPlayerOneTurn = true;
}

const updateScore = (increment) => {
    isPlayerOneTurn ? playersTotalScore[0] += increment : playersTotalScore[1] += increment;
    playerOneBoard.querySelector('.board__score').innerHTML =  playersTotalScore[0];
    playerTwoBoard.querySelector('.board__score').innerHTML = playersTotalScore[1];
}

hitButton.addEventListener('click', () => {
    let cardIndex;
    let cardValue;
    let cardOfType = `.card:nth-of-type(${cardSectionCounter}) img`;
    isStayButtonClicked = false;
    do
    {
        cardIndex = Math.floor(Math.random() * 52);
        cardValue = cards[cardIndex];
    }
    while (cardValue === null)
    updateScore(cardValue)
    getCard(cards[cardIndex]);
    cards[cardIndex] = null; 
    setTimeout(() => {
        changeCardPosition(cardOfType)
        console.log(cardLeftPosition)
    },10);
    setTimeout(() => {
        updateAllCounter();
        changePlayerIndicator(isPlayerOneTurn,'.board__cards__one p', '.board__cards__two p');
        // console.log(cards)
    },20)
})

stayButton.addEventListener('click', () => {
    isPlayerOneTurn ? isPlayerOneTurn = false : isPlayerOneTurn = true;
    changePlayerIndicator(isPlayerOneTurn,'.board__cards__one p', '.board__cards__two p');
    lastLeftPosition = cardLeftPosition;
    console.log(cardLeftPosition)
})



//Code which run individually without event listeners

changePlayerIndicator(isPlayerOneTurn,'.board__cards__one p', '.board__cards__two p');
deckCounter.innerHTML = totalCards;
updateScore(0)

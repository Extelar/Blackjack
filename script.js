let cards = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13]
let totalCards = cards.length;
let cardSectionCounter = 1;
let leftIncrement = 0.9;
let cardLeftPosition = [29.6, 29.6];
let isPlayerOneTurn = true;
let isStayButtonClicked = false;
let playersTotalScore = [0,0];
let formResponses = [];
const playerOneBoard = document.querySelector('.board__cards__one');
const playerTwoBoard = document.querySelector('.board__cards__two');
const deckCounter = document.querySelector('.deck__count span');
const hitButton = document.querySelector('.hit');
const stayButton = document.querySelector('.stay');
const foldButton = document.querySelector('.fold');
const registerForm = document.querySelector('.register');
const playerOneField = document.querySelector('#player_one');
const playerTwoField = document.querySelector('#player_two');
const scoreOptions = document.querySelectorAll('.score__choice');
const registerSubmitButton = document.querySelector('.form__button');
const playerNames = document.querySelectorAll('.player__name');
const playerCapitals = document.querySelectorAll('.player__bet')
const facebookButton = document.querySelector('.facebook');
const linkedinButton = document.querySelector('.linkedIn');
const playerOneBetField = document.querySelector('#bet_one');
const playerTwoBetField = document.querySelector('#bet_two');



const changeCardPosition = (className) => {
    let card = document.querySelector(className)
    isPlayerOneTurn ? card.style.top = '6rem' : card.style.top = '35rem';
    if (isPlayerOneTurn)
    {
        cardLeftPosition[0] += leftIncrement;
        card.style.left = cardLeftPosition[0].toString() + 'rem';
    }
    else
    {
        cardLeftPosition[1] += leftIncrement;
        card.style.left = cardLeftPosition[1].toString() + 'rem';
    }
    card.style.opacity = '1';
    card.style.visibility = 'visible';
}

const changePlayerIndicator = (boolean, sectionOne, sectionTwo) => {
    if (boolean) 
    {
        document.querySelector(sectionOne).style.cssText = 'color: #ba3c23; background: #fff; border-radius: 5px';
        document.querySelector(sectionTwo).style.cssText = 'color: #fff; background: none';
    }
    else 
    {
        document.querySelector(sectionOne).style.cssText = 'color: #fff; background: none';
        document.querySelector(sectionTwo).style.cssText = 'color: #ba3c23; background: #fff; border-radius: 5px';
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

const displayErrorMessage = (number, section, textField, message) => {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add(`error__message__${number}`)
    errorMessage.textContent = message;
    section.appendChild(errorMessage);
    textField.style.borderColor = '#ba362d';
    errorMessage.style.cssText = 'color: #ba362d; font-size: .7rem; position: absolute';
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
}

const recordResponses = (event, index) => {
    formResponses[index] = event.target.value;
}

const resetErrorMessage = () => {
    if (formResponses[0])
    {
        if (document.querySelector('.error__message__1'))
        {
            document.querySelector('.form__player1').removeChild(document.querySelector('.error__message__1'));
            playerOneField.style.borderColor = 'rgb(185, 181, 181)';
        }
        else {
            playerOneField.style.borderColor = 'rgb(185, 181, 181)';
        }
    }
    if (formResponses[1])
    {
        if (document.querySelector('.error__message__2'))
        {
            document.querySelector('.form__player2').removeChild(document.querySelector('.error__message__2'));
            playerTwoField.style.borderColor = 'rgb(185, 181, 181)';
        }
        else {
            playerOneField.style.borderColor = 'rgb(185, 181, 181)';
        }
    }
    if (formResponses[3])
    {
        if (document.querySelector('.error__message__3'))
        {
            document.querySelector('.betting__form1').removeChild(document.querySelector('.error__message__3'));
            playerOneBetField.style.borderColor = 'rgb(185, 181, 181)';
        }
        else {
            playerOneField.style.borderColor = 'rgb(185, 181, 181)';
        }
    }
    if (formResponses[4]) 
    {
        if (document.querySelector('.error__message__4'))
        {
            document.querySelector('.betting__form2').removeChild(document.querySelector('.error__message__4'));
            playerTwoBetField.style.borderColor = 'rgb(185, 181, 181)';
        }
        else {
            playerOneField.style.borderColor = 'rgb(185, 181, 181)';
        }
    }
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


//Event listeners
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
    console.log(cardLeftPosition)
})

window.addEventListener('load', () => {
    registerForm.style.cssText = 'opacity: 1; transform: translateY(0)';
})

playerOneField.addEventListener('change', () => {
    recordResponses(event, 0);
    console.log(formResponses);
})

playerTwoField.addEventListener('change', () => {
    recordResponses(event, 1);
    console.log(formResponses);
})

for (el of scoreOptions)
{
    el.addEventListener('change', () => {
        recordResponses(event, 2)
        console.log(formResponses);
    })
}

playerOneBetField.addEventListener('change', () => {
    recordResponses(event, 3);
    console.log(formResponses);
})

playerTwoBetField.addEventListener('change', () => {
    recordResponses(event, 4);
    console.log(formResponses);
})

registerForm.querySelector(".register__form").addEventListener('submit', (event) => {
    event.preventDefault();
    resetErrorMessage();
    if ((!formResponses[0] && !formResponses[1]) && (!formResponses[3] && !formResponses[4]))
    {  
        if ((!document.querySelector('.error__message__1') && !document.querySelector('.error__message__2')) && (!document.querySelector('.error__message__3') && !document.querySelector('.error__message__4')))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if (formResponses[0] && ((!formResponses[1] && !formResponses[3]) && !formResponses[4]))
    {
        if ((!document.querySelector('.error__message__2') && !document.querySelector('.error__message__3')) && (!document.querySelector('.error__message__4')))
        {
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if (formResponses[1] && ((!formResponses[0] && !formResponses[3]) && !formResponses[4]))
    {
        if ((!document.querySelector('.error__message__1') && !document.querySelector('.error__message__3')) && (!document.querySelector('.error__message__4')))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if (formResponses[3] && ((!formResponses[0] && !formResponses[1]) && !formResponses[4]))
    {
        if ((!document.querySelector('.error__message__1') && !document.querySelector('.error__message__2')) && (!document.querySelector('.error__message__4')))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if (formResponses[4] && ((!formResponses[0] && !formResponses[1]) && !formResponses[3]))
    {
        if ((!document.querySelector('.error__message__1') && !document.querySelector('.error__message__2')) && (!document.querySelector('.error__message__3')))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
        }    
    }
    else if ((formResponses[0] && formResponses[1]) && (!formResponses[3] && !formResponses[4]))
    {
        if (!document.querySelector('.error__message__3') && !document.querySelector('.error__message__4'))
        {
            displayErrorMessage(1,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
            displayErrorMessage(2,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if ((formResponses[1] && formResponses[3]) && (!formResponses[0] && !formResponses[4]))
    {
        if (!document.querySelector('.error__message__1') && !document.querySelector('.error__message__4'))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if ((formResponses[3] && formResponses[4]) && (!formResponses[0] && !formResponses[1]))
    {
        if (!document.querySelector('.error__message__1') && !document.querySelector('.error__message__2'))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
        }    
    }
    else if ((formResponses[0] && formResponses[4]) && (!formResponses[1] && !formResponses[3]))
    {
        if (!document.querySelector('.error__message__2') && !document.querySelector('.error__message__3'))
        {
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
        }    
    }
    else if ((formResponses[0] && formResponses[3]) && (!formResponses[1] && !formResponses[4]))
    {
        if (!document.querySelector('.error__message__2') && !document.querySelector('.error__message__4'))
        {
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }    
    }
    else if ((formResponses[1] && formResponses[4]) && (!formResponses[0] && !formResponses[3]))
    {
        if (!document.querySelector('.error__message__1') && !document.querySelector('.error__message__3'))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
        }    
    }
    else if (!formResponses[0] && ((formResponses[1] && formResponses[3]) && formResponses[4]))
    {
        if (!document.querySelector('.error__message__1'))
        {
            displayErrorMessage(1,document.querySelector('.form__player1'), playerOneField, `field cannot be blank`);
        } 
    }  
    else if (!formResponses[1] && ((formResponses[0] && formResponses[3]) && formResponses[4]))
    {
        if (!document.querySelector('.error__message__2'))
        {
            displayErrorMessage(2,document.querySelector('.form__player2'), playerTwoField, `field cannot be blank`);
        }
    }
    else if (!formResponses[3] && ((formResponses[0] && formResponses[1]) && formResponses[4]))
    {
        if (!document.querySelector('.error__message__3'))
        {
            displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `field cannot be blank`);
        }
    }
    else if (!formResponses[4] && ((formResponses[0] && formResponses[1]) && formResponses[3]))
    {
        if (!document.querySelector('.error__message__4'))
        {
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `field cannot be blank`);
        }
    }
    else
    {
        playerNames[0].textContent = formResponses[0];
        playerNames[1].textContent = formResponses[1];
        if (isNaN(parseInt(formResponses[3])))  
        {
            if (isNaN(parseInt(formResponses[4])))
            {
                displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `Please enter only numbers`);
                displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `Please enter only numbers`);
            }
            else
            {
                displayErrorMessage(3,document.querySelector('.betting__form1'), playerOneBetField, `Please enter only numbers`);
            }
        }
        else if(isNaN(parseInt(formResponses[4])))
        {
            displayErrorMessage(4,document.querySelector('.betting__form2'), playerTwoBetField, `Please enter only numbers`);
        }
        else
        {
            playerCapitals[0].textContent = parseInt(formResponses[3]);
            playerCapitals[1].textContent = parseInt(formResponses[4]);
            registerForm.style.opacity = 0;
            document.querySelector('.overlay').style.cssText =  'z-index: -100';
            document.querySelector('.overlay').style.transform = 'translateX(-100rem)';
        }
    }
    console.log(formResponses)
})

//Code which run individually without event listeners

changePlayerIndicator(isPlayerOneTurn,'.board__cards__one p', '.board__cards__two p');
deckCounter.innerHTML = totalCards;
updateScore(0);

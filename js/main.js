/*---------constants---------*/
let suits = ["H", "S", "D", "C"];
let cardValues = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
];

/*---------app's state (variables)---------*/

//to determine if this is the first user clicks Deal
let firstPlay = false;
//to determine if this is the second time a user clocks Deal
let secondDeal = false;
//win multiplier
let win = 0;

//cards to be displayed to user
let displayCards = [
  { card: "", selected: false },
  { card: "", selected: false },
  { card: "", selected: false },
  { card: "", selected: false },
  { card: "", selected: false },
];

//init function to create deck and take inputs from modal
let init = {
  cardDeck: [],
  name: "",
  totalCredits: 0,
  currentBet: 0,
  createDeck: function () {
    suits.forEach((suit) =>
      cardValues.forEach((value) => init.cardDeck.push(suit.concat(value)))
    );
  },
};

/*---------cached element references---------*/
let cardC = document.querySelectorAll(".card");
let dealButton = document.querySelector("#Deal");
let messageC = document.querySelectorAll(".message");
let winMessage = document.querySelector(".win-display");
let betNum = document.querySelector(".bet span");
let betUpButton = document.querySelector("#B-up");
let betDownButton = document.querySelector("#B-down");
let cashOut = document.querySelector("#quit");
let initButton = document.querySelector(".modal-content button");
let modalDisp = document.querySelector(".init-modal");
let betCredits = document.querySelector(".credits span");
let endOfTurnMessage = document.querySelector(".play-again");

/*---------event listener---------*/
function createEventListeners() {
  for (let i = 0; i < cardC.length; i++) {
    cardC[i].addEventListener("click", function (e) {
      if (secondDeal) return;
      if (displayCards[i].selected) {
        displayCards[i].selected = false;
        messageC[i].textContent = "";
        cardC[i].classList.remove("outline");
      } else {
        displayCards[i].selected = true;
        messageC[i].textContent = "Hold";
        cardC[i].classList.add("outline");
      }
    });
  }
}

initButton.addEventListener("click", initFunction);

dealButton.addEventListener("click", mainGame);

betUpButton.addEventListener("click", betFunction);
betDownButton.addEventListener("click", betFunction);

cashOut.addEventListener("click", quitFunction);

/*---------functions---------*/
//function to take values from the modal and store them
function initFunction() {
  let nameInp = document.querySelector("#name-input").value;
  let totalInp = document.querySelector("#total-input").value;
  init.name = nameInp;
  init.totalCredits = totalInp;
  betCredits.textContent = init.totalCredits;
  modalDisp.style.display = "none";
}

//quit Function which stops the game and cashes out player
function quitFunction() {
  dealButton.disabled = true;
  betDownButton.disabled = true;
  betUpButton.disabled = true;
  winMessage.textContent = `Congratulations you have won ${
    init.totalCredits + init.currentBet
  } Credits!`;
  endOfTurnMessage.textContent = `Thanks for playing, come back with more Money!`;
}

//to dynamically change credits and bet function
function betFunction(e) {
  if (e.target.id == "B-up" && init.totalCredits !== 0) {
    init.currentBet++;
    init.totalCredits--;
  } else if (e.target.id == "B-down" && init.currentBet !== 0) {
    init.currentBet--;
    init.totalCredits++;
  }
  betNum.textContent = init.currentBet;
  betCredits.textContent = init.totalCredits;
}

//main function game will run in
function mainGame() {
  if (!firstPlay) {
    createEventListeners();
    firstPlay = true;
  }
  if (init.cardDeck.length == 0) {
    init.createDeck();
    chooseCards();
    cardFlip();
    betUpButton.disabled = true;
    betDownButton.disabled = true;
  } else if (betUpButton.disabled && betDownButton.disabled) {
    secondDeal = true;
    chooseCards();
    cardFlip();
    betUpButton.disabled = false;
    betDownButton.disabled = false;
  } else if (secondDeal) {
    resetCards();
    mainGame();
  }
}
//function to choose cards and store the numbers in displaycards 
function chooseCards() {
  for(let i=0; i < displayCards.length; i++){
    if (displayCards[i].selected === false) {
      if (displayCards[i].card !== "") {
        cardC[i].classList.replace(displayCards[i].card,"back-red");
      }
      let rInt = Math.floor(Math.random() * init.cardDeck.length);
      displayCards[i].card = init.cardDeck[rInt];
      init.cardDeck.splice(rInt, 1);
    }
  }
}

function cardFlip() {
  let cardsToChangeidx =[]
  for (let i=0; i < displayCards.length; i++){
    messageC[i].textContent =""
    if (displayCards[i].selected === false){
      cardsToChangeidx.push(i)
    }
  }
  let time = 0;
  let interval = setInterval(function () {
    if (time < cardsToChangeidx.length) {
      cardC[cardsToChangeidx[time]].classList.remove("back-red"); 
      cardC[cardsToChangeidx[time]].classList.add(displayCards[cardsToChangeidx[time]].card) 
      time++;
    } else {
      checkCards();
      clearInterval(interval);
      if(secondDeal){
        totalBet();
      }
    }
  }, 200);
}

//function to resetCards
function resetCards() {
  let i = 0;
  for (cards in displayCards) {
    cardC[i].classList.replace(displayCards[cards].card,"back-red");
    displayCards[cards].card = "";
    displayCards[cards].selected = false;
    messageC[i].textContent = "";
    i++;
  }
  init.cardDeck = [];
  win = 0;
  secondDeal = false;
  endOfTurnMessage.textContent = ''
}

function totalBet() {
  init.totalCredits = init.totalCredits + win * init.currentBet;
  betCredits.textContent = init.totalCredits;
  betNum.textContent = 0;
  init.currentBet = 0;
  for (let i = 0; i < 5; i++) {
    cardC[i].classList.remove("outline");
  }
  endOfTurnMessage.textContent = `${init.name} keep going you're going to be rich!!`;
}


// winning condition functions
function checkCards() {
  // variables which we will manipulate in this function to check our conditions
  let finalCards = [];
  let finalCardsValues = [];
  let finalCardsSuits = [];
  let fiveSuits = false;
  let valuesinOrder = false;
  let fourPair = false;
  let threePair = false;
  let twoPair1 = false;
  let twoPair2 = false;
  let jacksorBetter = false;

  //to first take the values from the cards displayed into a new array
  for (cards in displayCards) {
    finalCards.push(displayCards[cards].card);
  }
  //to split up the suits and the values
  for (card of finalCards) {
    finalCardsValues.push(parseInt(card[1] + card[2]));
    finalCardsSuits.push(card[0]);
  }

  //sort the array based on value so that we can see if its in order
  finalCardsValues.sort(function (a, b) {
    return a - b;
  });

  //to tally up how many of a suit we have

  let suitTally = finalCardsSuits.reduce(function (acc, suit) {
    acc[suit] = acc[suit] ? acc[suit] + 1 : 1;
    return acc;
  }, {});
  // to tally up how many of each number we have
  let numberTally = finalCardsValues.reduce(function (acc, value) {
    acc[value] = acc[value] ? acc[value] + 1 : 1;
    return acc;
  }, {});
  // to see if we have five of the same suits
  for (suit in suitTally) {
    if (suitTally[suit] === 5) {
      fiveSuits = true;
    }
  }
  // to see how many of the values are either 4 of a kind, 3 of a kind, two pair or just 1 pair
  //also checks if jack or better is true
  for (num in numberTally) {
    if (numberTally[num] === 4) {
      fourPair = true;
    }
    if (numberTally[num] === 3) {
      threePair = true;
    }
    if (numberTally[num] === 2 && twoPair1 === false) {
      twoPair1 = true;
      if (num == 11 || num == 12 || num == 13 || num == 14) {
        jacksorBetter = true;
      }
      continue;
    }
    if (numberTally[num] === 2) {
      twoPair2 = true;
    }
  }
  // to see if cards are in order, else is there since if beginning numbers are in order it will return true
  // and then it will return false once it loops and finds a number that isnt false and break
  for (let i = 0; i < 4; i++) {
    if (finalCardsValues[i + 1] - finalCardsValues[i] === 1) {
      valuesinOrder = true;
    } else {
      valuesinOrder = false;
      break;
    }
  }

  //main loop to run through the conditions and see what is true and not
  if (valuesinOrder && fiveSuits && Math.min(...finalCardsValues) === 10) {
    winMessage.textContent = "Royal Flush";
    win = 250;
  } else if (valuesinOrder && fiveSuits) {
    winMessage.textContent = "Straight Flush";
    win = 50;
  } else if (fourPair) {
    winMessage.textContent = "Four Pair";
    win = 25;
  } else if (threePair && twoPair1) {
    winMessage.textContent = "Full House";
    win = 9;
  } else if (fiveSuits) {
    winMessage.textContent = "Flush";
    win = 6;
  } else if (valuesinOrder) {
    winMessage.textContent = "Straight";
    win = 4;
  } else if (threePair) {
    winMessage.textContent = "Three Pair";
    win = 3;
  } else if (twoPair1 && twoPair2) {
    winMessage.textContent = "Two Pair";
    win = 2;
  } else if (twoPair1 && jacksorBetter) {
    winMessage.textContent = "Jacks or better";
    win = 1;
  } else {
    winMessage.textContent = "No Winning Combinations";
    win = 0;
  }
}

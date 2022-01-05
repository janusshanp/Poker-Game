/*---------constants---------*/
let suits = ['H','S','D','C']
let cardValues = ['02','03','04','05','06','07','08','09','10','11','12','13','14']


/*---------app's state (variables)---------*/

//change so that it can have an input
var firstPlay = false 
var secondDeal = false 
let win = 0

let displayCards = {
    card1: { card:"", selected: false },
    card2: { card:"", selected: false },
    card3: { card:"", selected: false },
    card4: { card:"", selected: false },
    card5: { card:"", selected: false }
}

//change this location when you clean up your code 
let betCredits = document.querySelector('.credits span')

let init = {
    cardDeck: [],
    totalCredits: 0,
    currentBet: 0,    
    betInput: function () {
      init.totalCredits = prompt("Enter Total Credits:")
      betCredits.textContent = init.totalCredits
    },
    currentBetInput: function () {
      betDisplay.textContent = "Current Bet: " + init.currentBet
      init.totalCredits = init.totalCredits - init.currentBet
      betCredits.textContent = "Total Credits: "+ init.totalCredits      
    },
    createDeck: function () {
        suits.forEach(suit => cardValues.forEach(value => init.cardDeck.push(suit.concat(value))))
      }
}

init.betInput();

/*---------cached element references---------*/
let cardC = document.querySelectorAll('.card')
let dealButton = document.querySelector('#Deal')
let messageC = document.querySelectorAll('.message')
let winMessage = document.querySelector('h2')
let betNum = document.querySelector('.bet span')
let betUpButton = document.querySelector('#B-up')
let betDownButton = document.querySelector('#B-down')


/*---------event listener---------*/

function createEventListeners () {
  for (let i = 0; i < cardC.length; i++){
    cardC[i].addEventListener("click", function(e) {
      let cardID = 'card'+[i+1]
      if(secondDeal){
        return
      } 
      if (displayCards[cardID].selected){
        displayCards[cardID].selected = false
        messageC[i].textContent ="Not Held"
      } else {
        displayCards[cardID].selected = true
        messageC[i].textContent ="Hold"
      }
      console.log("clicked")
    })
  }
}

dealButton.addEventListener("click", mainGame) 

betUpButton.addEventListener("click", betFunction)
betDownButton.addEventListener("click",betFunction)


/*---------functions---------*/ 
function betFunction(e) {
  if(e.target.id == 'B-up'){
    init.currentBet++
    init.totalCredits--
  }else if(e.target.id == 'B-down'){
    init.currentBet--
    init.totalCredits++
  }
  betNum.textContent = init.currentBet
  betCredits.textContent = init.totalCredits
}

function mainGame () {
  var time = 0
  console.log("i clicked!")
  if (!firstPlay){
    createEventListeners ()
    firstPlay = true
  }
  if (init.cardDeck.length == 0){
    console.log("1dfsd")
    init.createDeck ()
    var interval = setInterval(function() {
    if(time<=4){
      chooseCards(time)
      time++;
    }
    else {
      checkCards()
      clearInterval(interval)
    }
    },500)
    betUpButton.disabled = true
    betDownButton.disabled =true 
  } else if (betUpButton.disabled && betDownButton.disabled){
      console.log("Hello")
      secondDeal = true
      var interval = setInterval(function() {
        if(time<=4) {
          chooseCards(time)
          time++
        }
        else {
          checkCards()
          clearInterval(interval)
          totalBet()
        }
      },500) 
      betUpButton.disabled = false
      betDownButton.disabled = false
  } else if (secondDeal){
      console.log("ibanma")
      resetCards ()
      mainGame () 
}
}

function resetCards () {
  let i = 0 
  for (cards in displayCards) {
    cardC[i].classList.remove(displayCards[cards].card)
    displayCards[cards].card = ""
    displayCards[cards].selected = false
    messageC[i].textContent = ""
    i++
  }
  init.cardDeck = []
  win = 0 
  secondDeal = false 
}

function totalBet () {
  init.totalCredits = init.totalCredits + (win * init.currentBet)
  betCredits.textContent = init.totalCredits
  betNum.textContent = 0 
  init.currentBet = 0 
}

//need to figure out how to stop duplicate cards in dealing  
function chooseCards (time) {
  let cardID = 'card' + (time+1)
  console.log(cardID)
  cardC[time].classList.remove("back-blue")
  if (displayCards[cardID].selected === false){
    if (displayCards[cardID].card !== ''){
    cardC[time].classList.remove(displayCards[cardID].card)
    }
    let rInt = Math.floor(Math.random()*init.cardDeck.length)
    displayCards[cardID].card = init.cardDeck[rInt]
    cardC[time].classList.add(init.cardDeck[rInt])
    init.cardDeck.splice(rInt,1)
  }
}

function checkCards () {
    // winning conditions 
    //has to be a bettter way to do this????????!?!?!?!?!?!
    // state variables which we will manipulate in this function 
    let finalCards =[]
    let finalCardsValues = []
    let finalCardsSuits =[]
    let fiveSuits = false
    let valuesinOrder = false 
    let fourPair = false 
    let threePair = false
    let twoPair1 = false
    let twoPair2 = false
    let jacksorBetter = false

    //for loop to push cards in object to an array to better maninpulate? 
    //do we even need to do this in a better method?
    for (cards in displayCards){
        finalCards.push(displayCards[cards].card) 
    }
    //sorting here because if sorted in for loop later it will put 10 infront 
    //since it converts into string?
    // there must be a way to do this without sorting so its easier and more dynamic?
    // try to clean up the code here 
    finalCards.sort()
    //loop to seperate out the suits and values 
    for (card of finalCards) {
        finalCardsValues.push(parseInt(card[1]+card[2]))
        finalCardsSuits.push(card[0])
    }
    
    finalCardsValues.sort((function(a,b){return a-b}))

    //to tally up how many of a suit we have 
    console.log(finalCardsSuits)
    console.log(finalCardsValues)

    let suitTally = finalCardsSuits.reduce(function(acc,suit){
        acc[suit] = acc[suit] ? acc[suit] +1 : 1;
        return acc;
    }, {})
    // to tally up how many of each number we have 
    let numberTally = finalCardsValues.reduce(function(acc,value){
        acc[value] = acc[value] ? acc[value] +1 : 1;
        return acc;
    }, {})
    // to see if we have five of the same suits 
    for (suit in suitTally){
        if (suitTally[suit]===5){
          fiveSuits = true 
          // what about every in a for loop? 
        } 
    }
    // to see how many of the values are either 4 of a kind, 3 of a kind, two pair or just 1 pair 
    //also checks if jack or better is true 
    for (num in numberTally){
        if (numberTally[num]===4){
          fourPair = true 
        }
         if (numberTally[num]===3){
          threePair = true
        }
        if (numberTally[num]===2 && twoPair1 === false){
          twoPair1 = true
          if (num == 11 || num == 12 || num == 13 || num == 14) {
            jacksorBetter = true
            }
        continue
        }
        if (numberTally[num]===2){
          twoPair2 = true
        }
    }
    // to see if cards are in order 
    for (let i =0; i < 4; i ++){
      if (finalCardsValues[i+1]-finalCardsValues[i] === 1){
        valuesinOrder = true 
      } else {
        valuesinOrder = false
        break
      }
    }

    if (valuesinOrder && fiveSuits && Math.min(...finalCardsValues)===10){
        winMessage.textContent = "Royal Flush" 
        win = 250
      } else if (valuesinOrder && fiveSuits) {
        winMessage.textContent = "Straight Flush"
        win = 50 
      } else if (fourPair){
        winMessage.textContent = "Four Pair"
        win = 25
      } else if (threePair && twoPair1){
        winMessage.textContent = "Full House"
        win = 9
      } else if (fiveSuits){
        winMessage.textContent = "Flush"
        win = 6
      } else if (valuesinOrder){
        winMessage.textContent = "Straight"
        win = 4
      } else if (threePair){
        winMessage.textContent = "Three Pair"
        win = 3
      } else if (twoPair1 && twoPair2){
        winMessage.textContent = "Two Pair"
        win = 2
      } else if (twoPair1 && jacksorBetter){
        winMessage.textContent = "Jacks or better"
        win = 1
      } else {
        winMessage.textContent = "No Winning Combinations"
        win = 0
      }
}

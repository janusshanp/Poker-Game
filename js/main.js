/*---------constants---------*/
let suits = ['H','S','D','C']
let cardValues = ['02','03','04','05','06','07','08','09','10','11','12','13','14']

/*---------app's state (variables)---------*/

//change so that it can have an input

let displayCards = {
    card1: { card:"", selected: false },
    card2: { card:"", selected: false },
    card3: { card:"", selected: false },
    card4: { card:"", selected: false },
    card5: { card:"", selected: false }
}

let init = {
    cardDeck: [],
    cardsDrawn:[],
    totalBet: 100,
    createDeck: function () {
        cardValues.forEach(value => suits.forEach(suit => init.cardDeck.push(value.concat(suit))))
      }
}

/*---------cached element references---------*/
let cardC = document.querySelectorAll('.container')
//do I need all these values? 
let cardOne = document.querySelector('#card1')
let cardTwo = document.querySelector('#card2')
let cardThree = document.querySelector('#card3')
let cardFour = document.querySelector('#card4')
let cardFive = document.querySelector('#card5')
//since I have a loop for the container? 
let dealButton = document.querySelector('#Deal')
let messageC = document.querySelectorAll('.message')
let message1 = document.querySelector('#message1')
let message2 = document.querySelector('#message2')
let message3 = document.querySelector('#message3')
let message4 = document.querySelector('#message4')
let message5 = document.querySelector('#message5')

/*---------event listener---------*/
cardOne.addEventListener("click", function(e) {
    //need to make this a boolean so that i can unclick it
    cardOne.setAttribute("selected",'')
    displayCards.card1.selected = true
    message1.textContent = "Hold"
})

dealButton.addEventListener("click", function(e){
    if (init.cardDeck.length == 0){
        init.createDeck ()
        chooseCards()
        checkCards()
    } else if (init.cardDeck.length > 0){
        chooseCards()
        checkCards()
    } else {
        console.log('end')
    }
       
})

/*---------functions---------*/ 

//need to figure out how to stop duplicate cards in dealing  
function chooseCards () {
    let i = 0
    for (cards in displayCards){
        if (displayCards[cards].selected === false){
            let rInt = Math.floor(Math.random()*init.cardDeck.length)
            displayCards[cards].card = init.cardDeck[rInt]
            cardC[i].textContent = displayCards[cards].card
            init.cardDeck.splice(rInt,1)
            console.log(displayCards[cards].card)
        } i++
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
        finalCardsValues.push(parseInt(card[0]+card[1]))
        finalCardsSuits.push(card[2])
    }
    
    //to tally up how many of a suit we have 
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
          continue
        }
        if (numberTally[num]===2){
          twoPair2 = true
        }
        if (num == 11 || num == 12 || num == 13 || num == 14) {
            jacksorBetter = true
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
        console.log("Royal Flush") 
      } else if (valuesinOrder && fiveSuits) {
        console.log("Straight Flush") 
      } else if (fourPair){
        console.log("Four Pair")
      } else if (threePair && twoPair1){
        console.log("Full House")
      } else if (fiveSuits){
        console.log("Flush")
      } else if (valuesinOrder){
        console.log("Straight")
      } else if (threePair){
        console.log("Three Pair")
      } else if (twoPair1 && twoPair2){
        console.log("Two Pair")
      } else if (twoPair1 && jacksorBetter){
        console.log("Jacks or better")
      }
}}

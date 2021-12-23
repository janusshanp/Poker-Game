/*---------constants---------*/
let suits = ['H','S','D','C']
let cardValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
let cardDeck = []
//check if we can do this differently and easier
cardValues.forEach(value => suits.forEach(suit => cardDeck.push(value.concat(suit))))
/*---------app's state (variables)---------*/

let chosenCards = []
// let chosenCardsFinal = ['','','','','']

/*---------cached element references---------*/
let cardC = document.querySelectorAll('.container')
let card1 = document.querySelector('#card1')
let card2 = document.querySelector('#card2')
let card3 = document.querySelector('#card3')
let card4 = document.querySelector('#card4')
let card5 = document.querySelector('#card5')
let dealButton = document.querySelector('#Deal')
let message1 = document.querySelector('#message1')
let message2 = document.querySelector('#message2')
let message3 = document.querySelector('#message3')
let message4 = document.querySelector('#message4')
let message5 = document.querySelector('#message5')

/*---------event listener---------*/
card1.addEventListener("click", function(e) {
    console.log("clicked")
    //need to make this a boolean so that i can unclick it
    message1.textContent = "Hold"
    

})

dealButton.addEventListener("click", function(e){
    chooseCards()
    console.log(chosenCards)
})

/*---------functions---------*/ 
function chooseCards () {
    if (chosenCards.length == 0) {
        while (chosenCards.length < 5){
            let rInt = Math.floor(Math.random()* 52)
            if (chosenCards.includes(cardDeck[rInt])) continue
            chosenCards.push(cardDeck[rInt])    
        for (let i = 0; i < chosenCards.length; i++)
            cardC[i].textContent = chosenCards[i]
        }
    } else {
        console.log("filler")
    }
}

function checkCards () {
    
}
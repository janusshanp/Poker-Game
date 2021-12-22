/*---------constants---------*/
let suits = ['H','S','D','C']
let cardValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
let cardDeck =[]
//check if we can do this differently
cardValues.forEach(value => suits.forEach(suit => cardDeck.push(value.concat(suit))))
console.log(cardDeck)

/*---------app's state (variables)---------*/
let chosenCards = []



/*---------cached element references---------*/
let card1 = document.querySelector('#card1')
let card2 = document.querySelector('#card2')
let card3 = document.querySelector('#card3')
let card4 = document.querySelector('#card4')
let card5 = document.querySelector('#card5')


/*---------event listener---------*/
card1.addEventListener("click", function(e) {
    console.log("clicked")
})



/*---------functions---------*/ 
let player = {
    name: "",
    chips: 2000
}

// Ask for user's name when the game is launched
document.addEventListener("DOMContentLoaded", () => {
    player.name = prompt("Enter your name:")
    if (!player.name) {
        player.name = "Player" // Default name if the user doesn't enter anything
    }
    playerEl.textContent = player.name + ": N" + player.chips
})

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

const cardImages = {
    1: "carda.png", 
    2: "card2.png",
    3: "card3.png",
    4: "card4.png",
    5: "card5.png",
    6: "card6.png",
    7: "card7.png",
    8: "card8.png",
    9: "card9.png",
    10: "card10.png",
    11: "cardq.png",
    12: "cardk.png",
    
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.chips >= 50) {
        isAlive = true
        hasBlackJack = false  // Reset hasBlackJack when starting a new game
        player.chips -= 50
        playerEl.textContent = player.name + ": N" + player.chips

        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard

        cardsEl.innerHTML = "" // Clear previous cards
        renderGame()
    } else {
        message = "Not enough money to start the game!"
        messageEl.textContent = message
    }
}

function renderGame() {
    cardsEl.innerHTML = "" // Clear previous cards display
    cards.forEach(card => {
        let cardImg = document.createElement("img")
        cardImg.src = cardImages[card]
        cardImg.className = "card"
        cardsEl.appendChild(cardImg)
    })

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 300
        playerEl.textContent = player.name + ": N" + player.chips
        createBalloons()
        setTimeout(showPopup, 5000) // Show popup after 5 seconds
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true) {  // Allow drawing a new card if the player is still alive
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function createBalloons() {
    for (let i = 0; i < 20; i++) {
        let balloon = document.createElement("img")
        balloon.src = "balloon.png"
        balloon.className = "balloon"
        balloon.style.left = Math.random() * 100 + "vw"
        balloon.style.animationDuration = Math.random() * 3 + 2 + "s"
        document.body.appendChild(balloon)
        
        setTimeout(() => {
            balloon.remove()
        }, 5000)
    }
}

function showPopup() {
    // Create popup elements
    let popup = document.createElement("div")
    popup.className = "popup"

    let logo = document.createElement("img")
    logo.src = "logo.png" // Replace with the path to your logo image
    logo.className = "logo"

    let popupMessage = document.createElement("p")
    popupMessage.textContent = "Would you like to start a new game or quit?"

    let startNewGameButton = document.createElement("button")
    startNewGameButton.textContent = "Start New Game"
    startNewGameButton.onclick = function() {
        location.reload() // Refresh the page to start a new game
    }

    let quitButton = document.createElement("button")
    quitButton.textContent = "Quit"
    quitButton.onclick = function() {
        popup.remove() // Remove the popup if the user quits
    }

    popup.appendChild(logo)
    popup.appendChild(popupMessage)
    popup.appendChild(startNewGameButton)
    popup.appendChild(quitButton)
    document.body.appendChild(popup)
}

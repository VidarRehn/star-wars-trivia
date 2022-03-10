
// buildign Character Class

class Character {

    constructor(object, imageUrl){
        this.name = object.name
        this.height = object.height
        this.weight = object.mass
        this.eyeColor = object.eye_color
        this.hairColor = object.hair_color
        this.skinColor = object.skin_color
        this.birthYear = object.birth_year
        this.gender = object.gender
        this.imageUrl = imageUrl
    }

    buildCard(appendWhere, otherCharacter){
        let characterCard = document.createElement("div")
        characterCard.classList.add("character-card")
        characterCard.innerHTML = `
        <div class="image">
            <img src="${this.imageUrl}" alt="picture of ${this.name}">
        </div>
        <p>${this.name}, tell me about ${otherCharacter.name}'s</p>
        <div class="compare-buttons">
            <button class="compare-btn weight">Weight</button>
            <button class="compare-btn length">Length</button>
            <button class="compare-btn hair">Hair</button>
            <button class="compare-btn gender">Gender</button>
        </div>
        <p class="answer-text"></p>
        `
        appendWhere.append(characterCard)
    }

    compareWeight(otherCharacter, container){
        let message
        if ((parseFloat(this.weight)) > (parseFloat(otherCharacter.weight))){
            // return `${otherCharacter.name} is tiny. At ${this.name} units I am a full ${this.weight - otherCharacter.weight} units heavier`
            message = `${otherCharacter.name} doesn't weigh very much. At ${this.weight} units I am a full ${this.weight - otherCharacter.weight} units heavier`
        } else if ((parseFloat(this.weight)) < (parseFloat(otherCharacter.weight))){
            message = `${otherCharacter.name} is pretty heavy. To be exact, they weigh ${otherCharacter.weight - this.weight} units more than me`
        } else {
            message = `At ${this.weight} units, me and ${otherCharacter.name} weigh exactly the same`
        }
        container.innerText = message
    }

    compareHeight(otherCharacter, container){
        let message
        if ((parseFloat(this.height)) > (parseFloat(otherCharacter.height))){
            message = `I believe ${otherCharacter.name} is about ${otherCharacter.height} units tall, which is small compared to me.`
        } else if ((parseFloat(this.height)) < (parseFloat(otherCharacter.height))){
            message = `With ${otherCharacter.name}'s ${otherCharacter.height} units, I am always in their shadow`
        } else {
            message = `Strangely enough, me and ${otherCharacter.name} are exactly the same height`
        }
        container.innerText = message
    }

    compareHairColor(otherCharacter, container){
        let message = `I much prefer my ${this.hairColor} hair over ${otherCharacter.name}'s nasty ${otherCharacter.hairColor} hair`
        container.innerText = message
    }

    compareGender(otherCharacter, container){
        let message
        if (this.gender == otherCharacter.gender){
            message = `We are both ${this.gender}s`
        } else {
            messsage = `${otherCharacter.name} is a ${otherCharacter.gender} and I am obviously a ${this.gender}`
        }
        container.innerText = message
    }
}


// Fecthing characters from API

const getCharacters = async (character1, character2) => {
    let response1 = await fetch(`https://swapi.dev/api/people/?search=${character1}`)
    let response2 = await fetch(`https://swapi.dev/api/people/?search=${character2}`)
    let firstCharacter = await response1.json()
    let secondCharacter = await response2.json()
    let characters = [firstCharacter.results, secondCharacter.results]
    return characters
}


// change image on selection

const characterOneInput = document.querySelector("#character-1-input")
const characterTwoInput = document.querySelector("#character-2-input")

const characterOneImage = document.querySelector("#character-1-image")
const characterTwoImage = document.querySelector("#character-2-image")

characterOneInput.addEventListener("change", (x) => {
    let selectedImage = document.querySelector("#character-1-input option:checked").dataset.img
    characterOneImage.src = selectedImage
})

characterTwoInput.addEventListener("change", (x) => {
    let selectedImage = document.querySelector("#character-2-input option:checked").dataset.img
    characterTwoImage.src = selectedImage
})


// generate two character classes on go-click and render

const goButton = document.querySelector("#go-btn")
const inputSection = document.querySelector(".choose-character")
const compareSection = document.querySelector(".compare-character")
const charactersContainer = document.querySelector(".characters-container")

let firstCharacter
let secondCharacter

goButton.addEventListener("click", (x) => {
    toggleView()
    let imageOneURL = document.querySelector("#character-1-input option:checked").dataset.img
    let imageTwoURL = document.querySelector("#character-2-input option:checked").dataset.img
    getCharacters(characterOneInput.value, characterTwoInput.value)
    .then((arr)=> {
        firstCharacter = new Character(arr[0][0], imageOneURL)
        secondCharacter = new Character(arr[1][0], imageTwoURL)
    }).then(()=>{
        firstCharacter.buildCard(charactersContainer, secondCharacter)
        secondCharacter.buildCard(charactersContainer, firstCharacter)
    }).then(()=>{
        let compareWeightButtons = document.querySelectorAll(".weight")
        let compareHeightButtons = document.querySelectorAll(".length")
        let compareHairButtons = document.querySelectorAll(".hair")
        let compareGenderButtons = document.querySelectorAll(".gender")
        let answerTextContainers = document.querySelectorAll(".answer-text")

        compareWeightButtons.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (btn == compareWeightButtons[0]){
                    firstCharacter.compareWeight(secondCharacter, answerTextContainers[0])
                } else {
                    secondCharacter.compareWeight(firstCharacter, answerTextContainers[1])
                }
            })
        })

        compareHeightButtons.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (btn == compareHeightButtons[0]){
                    firstCharacter.compareHeight(secondCharacter, answerTextContainers[0])
                } else {
                    secondCharacter.compareHeight(firstCharacter, answerTextContainers[1])
                }
            })
        })

        compareHairButtons.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (btn == compareHairButtons[0]){
                    firstCharacter.compareHairColor(secondCharacter, answerTextContainers[0])
                } else {
                    secondCharacter.compareHairColor(firstCharacter, answerTextContainers[1])
                }
            })
        })

        compareGenderButtons.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (btn == compareGenderButtons[0]){
                    firstCharacter.compareGender(secondCharacter, answerTextContainers[0])
                } else {
                    secondCharacter.compareGender(firstCharacter, answerTextContainers[1])
                }
            })
        })
    })
})

// toggle view

function toggleView(){
    inputSection.classList.toggle("hide")
    goButton.classList.toggle("hide")
    compareSection.classList.toggle("hide")
}

// back to first view

const backButton = document.querySelector(".back-btn")

backButton.addEventListener("click", (x) => {
    toggleView()
    charactersContainer.innerHTML = ""
})

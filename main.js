
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

    buildCard(appendWhere, otherCharacterName){
        let characterCard = document.createElement("div")
        characterCard.classList.add("character-card")
        characterCard.innerHTML = `
        <div class="image">
            <img src="${this.imageUrl}" alt="picture of ${this.name}">
        </div>
        <p>${this.name}, tell me about ${otherCharacterName}'s</p>
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

    compareWeight(otherCharacterWeight){
        let answerText = document.querySelector(".answer-text")
        answerText.innerText = `${this.weight} and ${otherCharacterWeight}`
        console.log(this.weight)
        console.log(otherCharacterWeight)
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
        firstCharacter.buildCard(charactersContainer, secondCharacter.name)
        secondCharacter.buildCard(charactersContainer, firstCharacter.name)
    }).then(()=>{
        let compareWeightButtons = document.querySelectorAll(".weight")
        compareWeightButtons.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (btn == compareWeightButtons[0]){
                    firstCharacter.compareWeight(secondCharacter.weight)
                } else {
                    secondCharacter.compareWeight(firstCharacter.weight)
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

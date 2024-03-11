const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("type-display");
const typeInput = document.getElementById("typeInput");


typeInput.addEventListener("input", ()=>{
    const sentenceArray = typeDisplay.querySelectorAll("span");
    const arrayValue = typeInput.value.split('');
    sentenceArray.forEach((characterSpan, index) =>{
        if(arrayValue[index] == null){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
        }
        else if(characterSpan.innerText === arrayValue[index]){
            characterSpan.classList.add("correct"); 
            characterSpan.classList.remove("incorrect"); 
        }else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
        }
    })
});








function GetRandomSentence(){
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function RenderNextSentence(){
   
    const sentence = await GetRandomSentence();
    typeDisplay.innerText = sentence;
    let oneText = sentence.split("");
    oneText.forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        typeDisplay.appendChild(characterSpan);
       
    });

    typeInput.innerText = "";
}

RenderNextSentence();
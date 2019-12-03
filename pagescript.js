const CARDS = document.getElementsByClassName("card");
var cards = Array.from(CARDS);
const MSG = document.getElementById("msg");

var firstCardColor = "";
var firstCardId = "";
var flipNumber = 0;
var totalMatches = 0;
var currentMatches=0;

for (i=0; i < cards.length; i++){
    cards[i].addEventListener("click", flip);
    totalMatches += 0.5; //every two cards is a match
}

function flip(){
    var num = cards.indexOf(this);
    showFront(num);
    if (flipNumber == 0){
        //this is the first card you've looked at
        flipNumber ++;
        MSG.innerHTML = "";
        if (cards[num].classList.contains("red")){
            firstCardColor = "red"
        }
        else if (cards[num].classList.contains("blue")){
            firstCardColor = "blue"
        }
        else if (cards[num].classList.contains("green")){
            firstCardColor = "green"
        }
        else if (cards[num].classList.contains("yellow")){
            firstCardColor = "yellow"
        }
        else if (cards[num].classList.contains("orange")){
            firstCardColor = "orange"
        }
        else if (cards[num].classList.contains("purple")){
            firstCardColor = "purple"
        }
        firstCardId = cards[num];
        
    }
    else if (flipNumber >= 1){
        //this is the second card you look at
        if (cards[num] == firstCardId){
            showBack(num, firstCardId)
            msg.innerHTML = "Can't pick the same card twice in a row!!"
        }
        else {
            if (cards[num].classList.contains(firstCardColor)){
                    if (currentMatches == totalMatches - 1){
                        MSG.classList.add("winner");
                        MSG.innerHTML = "You win!!";
                        removeEvent(num, firstCardId);
                    }
                    else{
                    MSG.innerHTML = "Match!";
                    removeEvent(num, firstCardId);
                    currentMatches += 1;
                    }
            }
            else{
                window.setTimeout(()=>{showBack(num, firstCardId)}, 750);
                MSG.innerHTML = "Not a match!"
            }
        }
        flipNumber = 0;
    }
}

function showFront(num){
    cards[num].classList.add("front");
    cards[num].classList.remove("back");    
}

function showBack(num, firstCardId){
    cards[num].classList.remove("front");
    cards[num].classList.add("back");
    var firstNum = cards.indexOf(firstCardId);
    cards[firstNum].classList.remove("front");
    cards[firstNum].classList.add("back");
    MSG.innerHTML = "";
}

function removeEvent(num, firstCardId){
    cards[num].classList.add("front");
    cards[num].classList.remove("back");
    var firstNum = cards.indexOf(firstCardId);
    cards[num].removeEventListener("click", flip);
    cards[firstNum].removeEventListener("click", flip);
}
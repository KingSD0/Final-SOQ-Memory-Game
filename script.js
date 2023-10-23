
const kaarten = document.querySelectorAll('.memorykaart');

var flipAmount = 0;
var puntenScore = 0;
var gameCount = 0;
var bord = document.getElementById("memorybord");

let bordPauze = false;

let eersteKaart,
    tweedeKaart,
    derdeKaart,
    vierdeKaart;

//Checkt of er gelijksoortige kaarten met elkaar zijn, bij elke draai word er gecheked wat de waarde van het kaart is.
//--//
function draaiKaart() {
    if (bordPauze) return;
    if (this === eersteKaart) return;
    this.classList.add('turn');

    flipAmount++;
    if (flipAmount === 1) {
        eersteKaart = this;
    }
    if (flipAmount === 2) {

        tweedeKaart = this;
        if (eersteKaart.dataset.framework === tweedeKaart.dataset.framework) {
            eersteKaart.removeEventListener('click', draaiKaart);
            tweedeKaart.removeEventListener('click', draaiKaart);
        }

        else {
            bordPauze = true;
            setTimeout(() => {
                eersteKaart.classList.remove('turn');
                tweedeKaart.classList.remove('turn');
                bordClean();
                flipAmount = 0;
                bordPauze = false;
            }, 750);
            puntenAf();
        }
    }
    if (flipAmount === 3) {

        derdeKaart = this;
        if (tweedeKaart.dataset.framework === derdeKaart.dataset.framework) {
            derdeKaart.removeEventListener('click', draaiKaart);
        }
        else {
            bordPauze = true;
            setTimeout(() => {
                eersteKaart.classList.remove('turn');
                tweedeKaart.classList.remove('turn');
                derdeKaart.classList.remove('turn');
                bordClean();
                flipAmount = 0;
                bordPauze = false;
            }, 750);
            puntenAf();
        }
    }
    if (flipAmount === 4) {

        vierdeKaart = this;
        if (derdeKaart.dataset.framework === vierdeKaart.dataset.framework) {
            vierdeKaart.removeEventListener('click', draaiKaart);
            flipAmount = 0;
            puntenBij();
            verdwijnKaarten();
        }
        else {
            bordPauze = true;
            setTimeout(() => {
                eersteKaart.classList.remove('turn');
                tweedeKaart.classList.remove('turn');
                derdeKaart.classList.remove('turn');
                vierdeKaart.classList.remove('turn');
                bordClean();
                flipAmount = 0;
                bordPauze = false;
            }, 750);
            puntenAf();
        }
    }
}

//Reset de kaarter naar originele stand, ofterwijl maakt het bord schoon.
//-//
function bordClean() {
    [eersteKaart, tweedeKaart, derdeKaart, vierdeKaart] = [null, null, null, null];
    kaarten.forEach(card => card.addEventListener('click', draaiKaart));
}

//Telt de punten van het spel op en houdt ze bij.
//-//
function puntenBij() {
    puntenScore += 20;
    gameCount++;
    document.getElementById("punten").innerHTML = "Score: " + puntenScore;
    if (gameCount === 13) {
        setTimeout(() => {
            bord.parentNode.removeChild(bord);
            document.getElementById("bericht").innerHTML = "Spel gewonnen met:" + puntenScore + "/260 Punten";
        }, 750);
    }
}

//Haalt de puntstand omlaag als het boven de 0 is en kan niet kleiner dan de 0, wordt bijgehouden.
//-//
function puntenAf() {
    if (puntenScore != 0) {
        puntenScore--;
        document.getElementById("punten").innerHTML = "Score: " + puntenScore;
    }
}

//Laat de omgedraaide kaarten verwijdenen na het maken van een goeie match.
//-//
function verdwijnKaarten() {
    bordPauze = true;
    setTimeout(() => {
        eersteKaart.innerHTML = "";
        tweedeKaart.innerHTML = "";
        derdeKaart.innerHTML = "";
        vierdeKaart.innerHTML = "";
        bordPauze = false;
    }, 750);
}


//Schudt de kaarten door elkaar heen, elke refresh is er een nieuwe kaart.
//-//
(function shuffleKaarten() {
    kaarten.forEach(card => {
        let randomisedPosition = Math.floor(Math.random() * 52);
        card.style.order = randomisedPosition;
    });
})();

kaarten.forEach(card => card.addEventListener('click', draaiKaart))
    ;
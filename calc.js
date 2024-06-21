document.getElementById("matematica").addEventListener("click", function () {
  // Mostra il bottone play/pause
  document.getElementById("playPause").classList.remove("hidden");
  document.getElementById("matematica").style.display = "none";
  // Riproduce la traccia audio
  document.getElementById("audio").play();
});

//Logica tasto play/pausa
document.getElementById("playPause").addEventListener("click", function () {
  const audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// ELEMENTI HTML

// Seleziona tutti gli elementi con classe "numero"
const numeriPulsanti = document.querySelectorAll(".numero");

// Seleziona tutti gli elementi con classe "funzioni"
const funzioniPulsanti = document.querySelectorAll(".funzioni");

const pulsantePunto = document.getElementById("punto");
const tastierinoElement = document.getElementById("tastierino");
const displayElement = document.getElementById("display");

// VARIABILI D'APPOGGIO

let arrayTermini = []; // array per memorizzare i termini dell'operazione
let termineAttuale = "0"; // stringa per memorizzare il termine attuale
let operazioneCorrente = ""; // stringa per memorizzare l'operazione (funzione/funzioneSpaciale) corrente
let displayTemporaneo = ""; // stringa per memorizzare il display temporaneo

// FUNZIONI

// Funzione per aggiornare il display
function aggiornaDisplay() { 
  displayTemporaneo = termineAttuale; // Aggiorna il contenuto HTML del display con il valore displayTemporaneo
  displayElement.innerHTML = displayTemporaneo; //Aggiorna sul DOM
}

// Funzione che controlla se ho premuto il tasto di una funzione speciale e decide se procedere successivamente con le operazioni aritmetiche
function controllaFunzioniSpeciali(funzioneCalcolo) { 
  let funzioneSpaciale = false; 
  // Flag che si può procedere con un'operazione aritmetica (non speciale) 
  //verrà valutato dentro il'if che contiene la chiamata

  // Switch per determinare quale funzione speciale eseguire
  switch (funzioneCalcolo) {
    case "C":
      // Reset della calcolatrice
      funzioneSpaciale = true; // Impedisce di procedere con l'operazione aritmetica
      termineAttuale = "0"; // riassegna a termineAttuale uno valore "0"
      arrayTermini = []; // Svuota l'array dei termini
      aggiornaDisplay(); // Aggiorna il display per riflettere il reset
      break;

    case "+/-":
      // Cambio del segno del termineAttuale
      funzioneSpaciale = true; // Impedisce di procedere con l'operazione aritmetica
      if (termineAttuale !== "") {
        // Controlla se c'è un termine nel termineAttuale
        termineAttuale = -termineAttuale; // Cambia il segno del termine
        aggiornaDisplay(); // Aggiorna il display per riflettere il cambio di segno
      }
      break;

    case "%":
      // Conversione del termine attuale in percentuale
      funzioneSpaciale = true; // Impedisce di procedere con l'operazione aritmetica
      if (termineAttuale !== "") {
        // Controlla se c'è un termine nel termineAttuale
        termineAttuale = termineAttuale / 100; // Converte il termine in percentuale
        aggiornaDisplay(); // Aggiorna il display per riflettere la conversione
      }
      break;
  }

  // Ritorna true se non è stata eseguita una funzione speciale (e si può procedere con le operazioni non speciali)
  // Ritorna false se è stata eseguita una funzione speciale
  return funzioneSpaciale;
}

// Funzione per eseguire le operazioni matematiche
function eseguiOperazione() {
  switch (operazioneCorrente) {
    case "+":
      termineAttuale = arrayTermini[0] + arrayTermini[1];
      break;
    case "-":
      termineAttuale = arrayTermini[0] - arrayTermini[1];
      break;
    case "X":
      termineAttuale = arrayTermini[0] * arrayTermini[1];
      break;
    case "/":
      termineAttuale = arrayTermini[1] !== 0 ?  //Se il secondo termine è diverso da 0 
       (arrayTermini[0] / arrayTermini[1]).toFixed(10) : //faccio la divisione (toFixed dopo . max 10 cifre)
        "Impossibile dividere per 0, ignorante!";
     
      break;
  }
    arrayTermini = [termineAttuale];// Reset dei termini e memorizzazione del risultato
    aggiornaDisplay(); // Aggiorna il display
    termineAttuale = ""; // Pulisce il termineAttuale
}

// GESTORI DI EVENTI

// Aggiunge un event listener per ogni pulsante numerico
numeriPulsanti.forEach((pulsante) => {
  pulsante.addEventListener("click", () => {
    if (!termineAttuale.includes(".") && termineAttuale.charAt(0) === "0") { // Evita l'aggiunta di più zeri all'inizio del numero
      termineAttuale = pulsante.innerText;
    } else {
      termineAttuale += pulsante.innerText; // Aggiunge il valore del pulsante al termineAttuale(ho già un numero)
    }

    aggiornaDisplay(); // Aggiorna HTML
  });
});

// Aggiunge un event listener per il pulsante del punto decimale
pulsantePunto.addEventListener("click", () => {
  if (!termineAttuale.includes(".") && termineAttuale.length !== 0) { // Aggiunge un punto solo se non esiste già e il termineAttuale non è vuoto
    termineAttuale += ".";
    aggiornaDisplay(); //E aggiorno L'HTML
  }
});

// Aggiunge un event listener per ogni pulsante funzione
funzioniPulsanti.forEach((pulsanteFunzione) => {
  pulsanteFunzione.addEventListener("click", () => {
    // Se l'operazione speciale non mi da l'ok a procedere con
    // le funzioni aritmetiche (!C, +/-, %)

    // Guard clause, se la condizione è rispettata esce dalla funzione
    // se controllaFunzioniSpeciali torna false, mi fermo.
    if (controllaFunzioniSpeciali(pulsanteFunzione.innerText) == true) return;

    // Memorizza l'operazione corrente da eseguire se non è uguale con operatore ternario
    operazioneCorrente = pulsanteFunzione.innerText !== "=" ? pulsanteFunzione.innerText : operazioneCorrente;

    // Se il termineAttuale non è vuoto, aggiunge il termine all'array dei termini
    //Puoi salvere un termine solo se l'array è vuoto altrimenti NaN
    if (termineAttuale !== "") arrayTermini.push(parseFloat(termineAttuale));

    // Pulisce il termineAttuale
    //Li ho salvati nell'array, ora pulisco display temponareo
    termineAttuale = "";

    // Se ci sono almeno due termini, esegue l'operazione

    if (arrayTermini.length > 1) {
      eseguiOperazione();
    }
  });
});

aggiornaDisplay();

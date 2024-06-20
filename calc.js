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

// PUNTATORI

// Seleziona tutti gli elementi con classe "numero"
const numeriPulsanti = document.querySelectorAll(".numero");

// Seleziona tutti gli elementi con classe "funzioni"
const funzioniPulsanti = document.querySelectorAll(".funzioni");

const pulsantePunto = document.getElementById("punto");
const tastierinoElement = document.getElementById("tastierino");
const displayElement = document.getElementById("display");

// VARIABILI DI STATO

// Inizializza un array per memorizzare i termini dell'operazione
let arrayTermini = [];

// Inizializza una stringa per memorizzare il termine attuale
let termineAttuale = "0";

// Inizializza una stringa per memorizzare l'operazione corrente
let operazioneCorrente = "";

// Inizializza una variabile per indicare se è stato inserito un numero decimale
let isDecimale = false;

// Inizializza una stringa per memorizzare il display temporaneo
let displayTemporaneo = "";

// FUNZIONI

// Funzione per aggiornare il display
function aggiornaDisplay() {
  displayTemporaneo = termineAttuale;
  // Aggiorna il contenuto HTML del display con il valore displayTemporaneo
  displayElement.innerHTML = displayTemporaneo;
}

// Funzione per controllare e procedere con le funzioni speciali
function controllaFunzioniSpeciali(funzioneCalcolo) {
  // Flag che si può procedere con un'operazione aritmetica (non speciale)
  let procedeConOperazione = true;

  // Switch per determinare quale funzione speciale eseguire
  switch (funzioneCalcolo) {
    case "C":
      // Reset della calcolatrice
      procedeConOperazione = false; // Impedisce di procedere con l'operazione aritmetica
      termineAttuale = "0"; // riassegna a termineAttuale uno valore "0"
      arrayTermini = []; // Svuota l'array dei termini
      isDecimale = false; // Resetta il flag del decimale
      aggiornaDisplay(); // Aggiorna il display per riflettere il reset
      break;

    case "+/-":
      // Cambio del segno del termineAttuale
      procedeConOperazione = false; // Impedisce di procedere con l'operazione aritmetica
      if (termineAttuale !== "") {
        // Controlla se c'è un termine nel termineAttuale
        termineAttuale = -termineAttuale; // Cambia il segno del termine
        aggiornaDisplay(); // Aggiorna il display per riflettere il cambio di segno
      }
      break;

    case "%":
      // Conversione del termine attuale in percentuale
      procedeConOperazione = false; // Impedisce di procedere con l'operazione aritmetica
      if (termineAttuale !== "") {
        // Controlla se c'è un termine nel termineAttuale
        termineAttuale = termineAttuale / 100; // Converte il termine in percentuale
        aggiornaDisplay(); // Aggiorna il display per riflettere la conversione
      }
      break;
  }

  // Ritorna true se non è stata eseguita una funzione speciale (si può procedere con l'operazione aritmetica)
  // Ritorna false se è stata eseguita una funzione speciale
  return procedeConOperazione;
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
      termineAttuale =
        arrayTermini[1] !== 0
          ? (arrayTermini[0] / arrayTermini[1]).toFixed(10)
          : "Impossibile dividere per 0, ignorante!";
      // Gestisce la divisione per zero
      break;
  }

  // Reset dei termini e memorizzazione del risultato
  arrayTermini = [termineAttuale];
  // Aggiorna il display
  aggiornaDisplay();
  // Pulisce il buffer
  termineAttuale = "";
  // Resetta l'indicatore decimale
  isDecimale = false;
}

// GESTORI DI EVENTI

// Aggiunge un event listener per ogni pulsante numerico
numeriPulsanti.forEach((pulsante) => {
  pulsante.addEventListener("click", () => {
    // Guard clause: evita l'aggiunta di più zeri all'inizio del numero
    if (!isDecimale && termineAttuale.charAt(0) === "0") {
      termineAttuale = pulsante.innerText;
    } else {
      // Aggiunge il testo del pulsante al termineAttuale
      termineAttuale += pulsante.innerText;
    }

    // Aggiorna il display
    aggiornaDisplay();
  });
});

// Aggiunge un event listener per il pulsante del punto decimale
pulsantePunto.addEventListener("click", () => {
  // Aggiunge un punto solo se non esiste già e il termineAttuale non è vuoto
  if (!isDecimale && termineAttuale.length !== 0) {
    isDecimale = true;
    termineAttuale += ".";
    aggiornaDisplay();
  }
});

// Aggiunge un event listener per ogni pulsante funzione
funzioniPulsanti.forEach((pulsanteFunzione) => {
  pulsanteFunzione.addEventListener("click", () => {
    // Se l'operazione speciale non mi da l'ok a procedere con
    // le funzioni aritmetiche (!C, +/-, %)

    // Guard clause con flag, se la condizione è rispettata esce dalla funzione
    if (!controllaFunzioniSpeciali(pulsanteFunzione.innerText)) return;

    // Memorizza l'operazione corrente da eseguire se non è uguale con operatore ternario
    operazioneCorrente = pulsanteFunzione.innerText !== "=" ? pulsanteFunzione.innerText : operazioneCorrente;

    // Se il buffer non è vuoto, aggiunge il termine all'array dei termini
    if (termineAttuale !== "") arrayTermini.push(parseFloat(termineAttuale));

    // Pulisce il buffer
    termineAttuale = "";

    // Se ci sono almeno due termini, esegue l'operazione
    if (arrayTermini.length > 1) {
      eseguiOperazione();
    }
  });
});

aggiornaDisplay();

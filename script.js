//puntatori
const pulsanti = document.querySelectorAll(".numero");
const addizione = document.getElementById("addizione");
const uguale = document.getElementById("uguale");
const punto = document.getElementById("punto");
const sottrazione = document.getElementById("sottrazione");
const moltiplicazione = document.getElementById("moltiplicazione");
const divisione = document.getElementById("divisione");
const percentuale = document.getElementById("percentuale");
const cambioSegno = document.getElementById("cambioSegno");
const cancella = document.getElementById("cancella");
const tastierino = document.getElementById("tastierino");
const display = document.getElementById("display");

let risultatoParziale = 0;

console.log(pulsanti);
pulsanteProva = ""

// Valore bottoni numerici
pulsanti.forEach(pulsante => {
  pulsante.addEventListener('click', () => {
    pulsanteProva = parseFloat(pulsante.innerText); //Parsiamo ogni pulsante da stringa a float
    display.innerText += pulsanteProva;
    console.log(typeof pulsanteProva); 
  }
  );
});

//Valore punto
punto.addEventListener("click", ()=>{
  if (display.innerText.includes(".")) {
    display.innerText = parseInt(display.innerText);
    display.innerText = parseFloat(display.innerText);
   }

   display.innerText += punto.innerText;
   parseFloat(display.innerText);
   console.log (display.innerText);
   console.log (typeof display.innerText);

})

//ADDIZIONE
addizione.addEventListener("click", (numero, risultato)=>{
  numero = parseInt(display.innerText);
  risultato = risultatoParziale;
  risultatoParziale += numero;
  display.innerText = (`${display.innerText} + `);

  console.log(risultatoParziale);
})


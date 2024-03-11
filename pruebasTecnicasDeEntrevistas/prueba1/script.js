// capturamos los elementos del DOM que vamos a utilizar
const input = document.getElementById("input");
const sendBtn = document.getElementById("btn");
const result = document.getElementById("result");
let quotient = 0;
let remainder = 0;
let inputValueRounded = 0;
let price = 0;
let resultText = "";

// baldes disponibles para comprar
const buckets = [
  { nombre: "7kg", cantidad: 7, precio: 350, compra: 0 },
  { nombre: "14kg", cantidad: 14, precio: 650, compra: 0 },
  { nombre: "28kg", cantidad: 28, precio: 1200, compra: 0 },
];

// funcion para ver cuantos baldes necesito
const checkValue = (value) => {
  inputValueRounded = Math.ceil(value / 7);
  check28(inputValueRounded);
  checkResult();
  result.innerHTML = resultText;
  // reiniciamos variables para la proxima consulta
  price = 0;
  resultText = "";
  buckets.forEach((el) => {
    el.compra = 0;
  });
  result.innerHTML += "";
  result.classList.add("show");
};

// funcion para mostrar resultados

const checkResult = () => {
  resultText += `Para la cantidad deseada de <b>${input.value} Kg.</b> de enduido. <br/><br/> Debera comprar los siguientes baldes:<br/><br/>`;
  buckets.forEach((el) => {
    if (el.compra != 0) {
      price += el.precio * el.compra;
      if (el.compra > 1) {
        resultText += `<li>${el.compra} baldes de ${el.nombre}.</li>`;
      } else {
        resultText += `<li>${el.compra} balde de ${el.nombre}.</li>`;
      }
    } else {
      return;
    }
  });
  resultText += `<br/>Y gastara: <b>$ ${price}.-</b>`;
};

// revisamos si necesitamos baldes de 28kg
const check28 = () => {
  quotient = Math.floor(inputValueRounded / 4);
  remainder = inputValueRounded % 4;
  if (quotient > 0) {
    buckets[2].compra += quotient;
    check14(remainder);
  } else {
    check14(remainder);
  }
};

// revisamos si necesitamos baldes de 14kg
const check14 = () => {
  quotient = Math.floor(remainder / 2);
  remainder %= 2;
  if (quotient > 0) {
    buckets[1].compra = quotient;
    check7(remainder);
  } else {
    check7(remainder);
  }
};

// revisamos si necesitamos baldes de 7kg
const check7 = () => {
  if (remainder > 0) {
    buckets[0].compra = remainder;
  } else {
    return;
  }
};

// capturamos el texto ingresado en el input
const checkUserInput = () => {
  if (!input.value || isNaN(parseInt(input.value)) || input.value <= 0) {
    alert("Por favor ingrese un numero decimal");
    input.value = "";
    result.classList.remove("show");
    return;
  }
  checkValue(input.value);
  input.value = "";
};

// capturamos cuando se presiona el boton de enviar
sendBtn.addEventListener("click", checkUserInput);

// capturamos cuando se presiona la tecla enter
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    checkUserInput();
  }
});

// ------------------------ DOM ------------------------
const priceEl = document.querySelector("#input-price");
const weightEl = document.querySelector("#input-weight");
const calculatorButton = document.querySelector(".calculator-button");
const resultEl = document.querySelector(".calculator-result");

// ------------------------ FUNCTIONS ------------------------
const calculatorFn = () => {
  resultEl.innerText = `100g 당 가격은 ${Math.floor(priceEl.value/weightEl.value*100)} 원입니다.`;
}


// ------------------------ EVENTS ------------------------
calculatorButton.addEventListener("click", calculatorFn);


// ------------------------ DOM ------------------------
// calculator
const priceEl = document.querySelector("#input-price");
const weightEl = document.querySelector("#input-weight");
const calculatorButton = document.querySelector(".calculator-button");
const resultVarEl = document.querySelector(".calculator-result_val");

// ingredients
const ingredientForm = document.querySelector("#ingredient-form");
const ingredientName = document.querySelector("#ingredient-name");
const ingredientPrice = document.querySelector("#ingredient-price");
const ingredientSubmit = document.querySelector(".ingredient-submit");
const ingredientLists = document.querySelector(".ingredient-lists");

// total, average
const totalEl = document.querySelector(".total");
const averageEl = document.querySelector(".average");

// ------------------------ VARIABLES ------------------------
const INGREDIENT_KEY = "ingredients";
let ingredients = [];

// ------------------------ FUNCTIONS ------------------------
// 재료 평균 함수
const getAverage = (ingredients) => {
  let result = 0;

  ingredients.forEach(ingredient => {
    result += parseInt(ingredient.price);
  })

  if(!result) {
    return "0";
  }
  return numberWithCommas(Math.floor(result / ingredients.length));
}

// 숫자에 콤마 추가
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 저장소에 저장 함수
const saveIngredient = () => {
  localStorage.setItem(INGREDIENT_KEY, JSON.stringify(ingredients));
}

// 삭제 함수
const deleteIngredient = (event) => {
  const li = event.target.parentElement.parentElement;
  li.remove();

  ingredients = ingredients.filter(ingredient => ingredient.id !== parseInt(li.id));
  saveIngredient();

  totalEl.innerText = `${ingredients.length}`;
  averageEl.innerText = `${getAverage(ingredients)}원`;
}

// 재료 출력 함수
const paintIngredient = (newIngredient) => {
  const li = document.createElement("li");
  li.id = newIngredient.id;

  const spanName = document.createElement("span");
  const spanPrice = document.createElement("span");

  spanName.classList.add("span-tit");

  const priceAndButton = document.createElement("div");
  const button = document.createElement('button');
  button.innerText = "";
  button.addEventListener('click', deleteIngredient);

  priceAndButton.appendChild(spanPrice);
  priceAndButton.appendChild(button);

  li.appendChild(spanName);
  li.appendChild(priceAndButton);

  ingredientLists.appendChild(li);

  totalEl.innerText = `${ingredients.length}`;
  averageEl.innerText = `${getAverage(ingredients)}원`;

  spanName.innerText = newIngredient.name;
  spanPrice.innerText = `${numberWithCommas(newIngredient.price)}원`;
}

// submit 핸들러
const handleIngredientSubmit = (event) => {
  event.preventDefault();
  const newIngredientName = ingredientName.value;
  const newIngredientPrice = ingredientPrice.value;

  ingredientName.value = "";
  ingredientPrice.value = "";

  const newIngredientObj = {
    name: newIngredientName,
    price: newIngredientPrice,
    id: Date.now()
  }
  ingredients.push(newIngredientObj);
  paintIngredient(newIngredientObj);
  saveIngredient();
}

// 저장소 재료들 출력
const savedIngredient = localStorage.getItem(INGREDIENT_KEY);

if(savedIngredient !== null) {
  const parsedIngredient = JSON.parse(savedIngredient);
  ingredients = parsedIngredient;
  parsedIngredient.forEach(paintIngredient);
}

// 그램당 가격 계산기
const calculatorFn = () => {
  if(!priceEl.value) {
    priceEl.focus();
  } else if(!weightEl.value) {
    weightEl.focus();
  } else {
    resultVarEl.innerText = `${Math.floor(priceEl.value/weightEl.value*100)}`;
    ingredientPrice.value = Math.floor(priceEl.value/weightEl.value*100);
    priceEl.value = "";
    weightEl.value = "";
  }
}

// ------------------------ EVENTS ------------------------
calculatorButton.addEventListener("click", calculatorFn);
ingredientForm.addEventListener("submit", handleIngredientSubmit);
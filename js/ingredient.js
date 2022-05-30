// ------------------------ DOM ------------------------
// calculator
const priceEl = document.querySelector("#input-price");
const weightEl = document.querySelector("#input-weight");
const calculatorButton = document.querySelector(".calculator-button");
const resultEl = document.querySelector(".calculator-result");

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

  return numberWithCommas(Math.floor(result / ingredients.length));
}

// 그람당 가격 계산기
const calculatorFn = () => {
  resultEl.innerText = `100g 당 가격은 ${Math.floor(priceEl.value/weightEl.value*100)} 원입니다.`;
  priceEl.value = "";
  weightEl.value = "";
}

// 가격에 콤마 추가
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 저장소에 저장 함수
const saveIngredient = () => {
  localStorage.setItem(INGREDIENT_KEY, JSON.stringify(ingredients))
}

// 재료 출력 함수
const paintIngredient = (newIngredient) => {
  const li = document.createElement("li");
  li.id = newIngredient.id;

  const spanName = document.createElement("span");
  const spanPrice = document.createElement("span");

  li.appendChild(spanName);
  li.appendChild(spanPrice);

  ingredientLists.appendChild(li);

  totalEl.innerText = `${ingredients.length}`;
  averageEl.innerText = getAverage(ingredients);

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
  saveIngredient()
}

// 저장소 재료들 출력
const savedIngredient = localStorage.getItem(INGREDIENT_KEY);

if(savedIngredient !== null) {
  const parsedIngredient = JSON.parse(savedIngredient);
  ingredients = parsedIngredient;
  parsedIngredient.forEach(paintIngredient);
}

// ------------------------ EVENTS ------------------------
calculatorButton.addEventListener("click", calculatorFn);
ingredientForm.addEventListener("submit", handleIngredientSubmit);
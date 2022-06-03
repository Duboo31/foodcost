// ------------------------- DOM -------------------------
const datalistEl = document.querySelector("#ingredient");
const ingredientList = document.querySelector(".add-ingredient_lists");

const ingredientAddButton = document.querySelector(".add-button");
const ingredientName = document.querySelector(".ingredient-name");
const ingredientPrice = document.querySelector(".ingredient-price");
const foodName = document.querySelector(".food-name");
const foodPrice = document.querySelector(".food-price");
const foodCostContainer = document.querySelector(".foodCost-container");
const saveFood = document.querySelector(".save-food");

const totalDisplay = document.querySelector(".all-recipe");
const averageDisplay = document.querySelector(".total-cost");

// PROGRESS
const progressBar = document.querySelector(".circular-progress");
const valueContainer = document.querySelector(".total-cost");

// ------------------------- VARIABLES -------------------------
const INGREDIENT_KEY = "ingredients";
const FOOD_INGREDIENTS_KEY = "foodIngredient";

const savedIngredient = localStorage.getItem(INGREDIENT_KEY);
const parseIngredient = JSON.parse(savedIngredient);

const savedFoodCost = localStorage.getItem(FOOD_INGREDIENTS_KEY);

let foodCost = [];

// ------------------------- FUNCTIONS -------------------------
// PROGRESS
const progress = () => {
  let marginSum = 0;

  foodCost.forEach(el => {
    marginSum += Number(el.getMargin)
  })

  let getAverageMargin = Math.ceil(marginSum / foodCost.length);

  if(foodCost.length) {
    valueContainer.innerText = `${getAverageMargin}%`;
  } else {
    valueContainer.innerText = "0%";
    progressBar.style.background = "gray";
    return;
  }

  if(getAverageMargin > 35) {
    progressBar.style.background = `conic-gradient(
      #F28C28 ${getAverageMargin * 3.6}deg,
      gray ${getAverageMargin * 3.6}deg
    )`
  } else if(getAverageMargin >= 30 && getAverageMargin <= 35) {
    progressBar.style.background = `conic-gradient(
      #0F52BA ${getAverageMargin * 3.6}deg,
      gray ${getAverageMargin * 3.6}deg
    )`
  } else if(getAverageMargin < 30) {
    progressBar.style.background = `conic-gradient(
      #2E8B57 ${getAverageMargin * 3.6}deg,
      gray ${getAverageMargin * 3.6}deg
    )`
  }
};

// 가격에 콤마 추가
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// total menu print
const printTotalMenu = () => {
  totalDisplay.innerText = foodCost.length;
}

// 저장소 재료 빼오기
parseIngredient.forEach(el => {
  const option = document.createElement("option");
  option.value = el.name;
  datalistEl.appendChild(option);
})

// 저장소에 저장 함수
const saveFoodCost = () => {
  localStorage.setItem(FOOD_INGREDIENTS_KEY, JSON.stringify(foodCost))
}

// 삭제 함수
const deleteFoodCost = (event) => {
  const li = event.target.parentElement;
  li.remove();
  foodCost = foodCost.filter(foodCost => foodCost.id !== parseInt(li.id));

  saveFoodCost();
  printTotalMenu();
  progress();
}

// 재료 출력 함수
const paintFoodCost = (newFoodCostObj) => {
  const foodCostWrap = document.createElement("li");
  foodCostWrap.id = newFoodCostObj.id;

  const foodCostFood = document.createElement("div");
  const foodCostSalePrice = document.createElement("div");

  foodCostFood.innerText = newFoodCostObj.food;
  foodCostSalePrice.innerText = `${numberWithCommas(newFoodCostObj.salePrice)}원`;

  const allList = document.createElement("div");

  allList.classList.add("all-list");

  const foodCostNames = document.createElement("ul");

  newFoodCostObj.name.forEach(el => {
    const foodCostName = document.createElement("li");

    foodCostName.innerText = el;
    foodCostNames.appendChild(foodCostName);
  })

  const pricesAndCostsEl = document.createElement("div");
  pricesAndCostsEl.classList.add("pricesAndCosts")

  const foodCostPrices = document.createElement("ul");

  newFoodCostObj.price.forEach(el => {
    const foodCostPrice = document.createElement("li");

    foodCostPrice.innerText = el;
    foodCostPrices.appendChild(foodCostPrice);
  })

  const foodCostCosts = document.createElement("ul");

  newFoodCostObj.cost.forEach(el => {
    const foodCostCost = document.createElement("li");

    foodCostCost.innerText = `${numberWithCommas(el)}`;;
    foodCostCosts.appendChild(foodCostCost);
  })

  const allCostEl = document.createElement("div");
  allCostEl.classList.add("all-cost");
  allCostEl.innerText = `총합 ${(numberWithCommas(newFoodCostObj.getSumCost))}원`;

  const marginEl = document.createElement("div");
  const marginContainer = document.createElement("div");
  marginEl.classList.add("margin-bar");
  marginContainer.classList.add("margin-container");
  marginEl.innerText = `${newFoodCostObj.getMargin}%`;
  marginEl.style.width = `${newFoodCostObj.getMargin}%`
  if(Number(newFoodCostObj.getMargin) > 35) {
    marginEl.style.background = "#F28C28";
  } else if(Number(newFoodCostObj.getMargin) >= 30 && Number(newFoodCostObj.getMargin) <= 35) {
    marginEl.style.background = "#0F52BA";
  } else if(Number(newFoodCostObj.getMargin) < 30) {
    marginEl.style.background = "#2E8B57";
  }

  marginContainer.appendChild(marginEl);

  pricesAndCostsEl.appendChild(foodCostPrices);
  pricesAndCostsEl.appendChild(foodCostCosts);

  allList.appendChild(foodCostNames);
  allList.appendChild(pricesAndCostsEl)

  const button = document.createElement('button');
  button.innerText = "삭제";
  button.addEventListener('click', deleteFoodCost);

  foodCostWrap.appendChild(foodCostFood);
  foodCostWrap.appendChild(foodCostSalePrice);
  foodCostWrap.appendChild(allList);

  foodCostWrap.appendChild(allCostEl);
  foodCostWrap.appendChild(marginContainer);

  foodCostWrap.appendChild(button);

  foodCostContainer.appendChild(foodCostWrap);

  printTotalMenu();
  progress();
}

// 재료 추가
const addIngredients = (event) => {
  event.preventDefault();
  const li = document.createElement("li");
  li.classList.add("list");

  const nameEl = document.createElement("span");

  const priceAndCostEl = document.createElement("div");

  const priceEl = document.createElement("span");
  const costEl = document.createElement("span");

  const useName = ingredientName.value;
  const usePrice = ingredientPrice.value;

  nameEl.innerText = useName;
  priceEl.innerText = usePrice;

  parseIngredient.forEach((el) => {
    if(el.name === useName) {
      costEl.innerText = `${Math.ceil(Number(el.price) * Number(usePrice) / 100)}`
    }
  })

  li.appendChild(nameEl);

  priceAndCostEl.appendChild(priceEl);
  priceAndCostEl.appendChild(costEl);

  li.appendChild(priceAndCostEl);

  ingredientList.appendChild(li);

  ingredientName.value = "";
  ingredientPrice.value = "";
}

// 추가한 출력 재료 없애기
const clearAddList = () => {
  ingredientList.innerHTML = "";
}

// submit 핸들러
const handleFoodCostSubmit = (event) => {
  event.preventDefault();

  const foodTit = foodName.value;
  const foodSale = foodPrice.value;

  if(!foodTit) {
    foodName.focus();
    return;
  } else if(!foodSale) {
    foodPrice.focus();
    return;
  }

  let arrName = [];
  let arrPrice = [];
  let arrCost = [];
  let sumCost = 0;

  const ingredientLists = document.querySelectorAll(".list");

  ingredientLists.forEach(el => {
    arrName.push(el.childNodes[0].innerText);
    arrPrice.push(el.childNodes[1].childNodes[0].innerText);
    arrCost.push(el.childNodes[1].childNodes[1].innerText);
    sumCost += Number(el.childNodes[1].childNodes[1].innerText);
  })


  const newFoodCostObj = {
    food: foodTit,
    salePrice: foodSale,
    name: arrName,
    price: arrPrice,
    cost: arrCost,
    getSumCost: sumCost,
    getMargin: `${Math.ceil(Number(sumCost / foodSale) * 100)}`,
    id: Date.now()
  }

  foodName.value = "";
  foodPrice.value = "";

  foodCost.push(newFoodCostObj);
  paintFoodCost(newFoodCostObj);
  saveFoodCost();
  clearAddList();
}

// 저장소 체크 및 데이터 출력
if(savedFoodCost !== null) {
  const parsedFoodCost = JSON.parse(savedFoodCost);
  foodCost = parsedFoodCost;
  parsedFoodCost.forEach(paintFoodCost);
}

// ------------------------- EVENTS -------------------------
ingredientAddButton.addEventListener("click", addIngredients);
saveFood.addEventListener("click", handleFoodCostSubmit);
// ------------------------- DOM -------------------------
// OPTIONS
const datalistEl = document.querySelector("#ingredient");

const ingredientList = document.querySelector(".add-ingredient_lists");

const ingredientAddButton = document.querySelector(".add-button");
const ingredientName = document.querySelector(".ingredient-name");
const ingredientPrice = document.querySelector(".ingredient-price");
const menuName = document.querySelector(".menu-name");
const menuPrice = document.querySelector(".menu-price");
const foodCostContainer = document.querySelector(".foodCost-container");
const saveFoodButton = document.querySelector(".save-food");

// TOTAL DISPLAY
const totalDisplay = document.querySelector(".all-recipe");
const averageDisplay = document.querySelector(".total-cost");

// PROGRESS
const circularProgress = document.querySelector(".circular-progress");
const totalValueEl = document.querySelector(".total-cost");

// 유효성 검사
const warningMessage = document.querySelector(".add-ingredient p");
const alertMessage = document.querySelector("#alert-message");

// 높은순 낮은순 정렬
const highEl = document.querySelector(".high-select");
const lowEl = document.querySelector(".low-select");
const sortOptions = document.querySelector(".sort-options");
const sortElContainer = document.querySelector(".sort-view");

// ------------------------- VARIABLES -------------------------
const FOOD_INGREDIENTS_KEY = "foodIngredient";
const INGREDIENT_KEY = "ingredients";

const savedIngredient = localStorage.getItem(INGREDIENT_KEY);
const parseIngredient = JSON.parse(savedIngredient);

let foodCost = [];
let options = [];

// ------------------------- FUNCTIONS -------------------------
// 정렬 박스 온/오프
const sortActive = () => {
  sortOptions.classList.toggle("activeOption");
}

// 저장소 재료 빼오기
parseIngredient.forEach(ingredient => {
  const option = document.createElement("option");
  option.value = ingredient.name;
  datalistEl.appendChild(option);
  options.push(ingredient.name);
})

// PROGRESS
const paintProgress = () => {
  let marginSum = 0;

  foodCost.forEach(menu => {
    marginSum += Number(menu.getMargin);
  });

  let getAverageMargin = Math.ceil(marginSum / foodCost.length);

  if(foodCost.length) {
    totalValueEl.innerText = `${getAverageMargin}%`;
  } else {
    totalValueEl.innerText = "0%";
    circularProgress.style.background = "var(--main-input-color)";
  }

  if(getAverageMargin > 35) {
    circularProgress.style.background = `conic-gradient(
      #a30000 ${getAverageMargin * 3.6}deg,
      var(--main-input-color) ${getAverageMargin * 3.6}deg
    )`
  } else if(getAverageMargin >= 30 && getAverageMargin <= 35) {
    circularProgress.style.background = `conic-gradient(
      #002864 ${getAverageMargin * 3.6}deg,
      var(--main-input-color) ${getAverageMargin * 3.6}deg
    )`
  } else if(getAverageMargin < 30) {
    circularProgress.style.background = `conic-gradient(
      #00612a ${getAverageMargin * 3.6}deg,
      var(--main-input-color) ${getAverageMargin * 3.6}deg
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

// 저장소에 저장 함수
const saveFoodCost = () => {
  localStorage.setItem(FOOD_INGREDIENTS_KEY, JSON.stringify(foodCost))
}

// 정렬
const lowSortPrint = () => {
  foodCost = foodCost.sort((a, b) => Number(a.getMargin) - Number(b.getMargin));
  saveFoodCost();
  location.reload();
}

const highSortPrint = () => {
  foodCost = foodCost.sort((a, b) => Number(b.getMargin) - Number(a.getMargin));
  saveFoodCost();
  location.reload();
}



// 삭제 함수
const deleteFoodCost = (event) => {
  const li = event.target.parentElement;
  li.remove();
  foodCost = foodCost.filter(foodCost => foodCost.id !== parseInt(li.id));

  saveFoodCost();
  printTotalMenu();
  paintProgress();
}

// 재료 출력 함수
const paintFoodCost = (newFoodCostObj) => {
  const menuListItem = document.createElement("li");
  menuListItem.id = newFoodCostObj.id;

  const menuTitle = document.createElement("div");
  const menuSalePrice = document.createElement("div");

  menuTitle.innerText = newFoodCostObj.menuTitle;
  menuSalePrice.innerText = `${numberWithCommas(newFoodCostObj.salePrice)}원`;

  // 재료 리스트 헤더
  const ingredientHeaderEl = document.createElement("div");
  
  const ingredientHeaderTit = document.createElement("div");
  const ingredientHeaderWeight = document.createElement("div");
  const ingredientHeaderCost = document.createElement("div");
  
  ingredientHeaderEl.classList.add("ingredient-header");
  ingredientHeaderTit.classList.add("ingredient-header_tit");
  ingredientHeaderWeight.classList.add("ingredient-header_weight");
  ingredientHeaderCost.classList.add("ingredient-header_cost");

  ingredientHeaderTit.innerText = "재료";
  ingredientHeaderWeight.innerText = "무게";
  ingredientHeaderCost.innerText = "금액";

  ingredientHeaderEl.appendChild(ingredientHeaderTit);
  ingredientHeaderEl.appendChild(ingredientHeaderWeight);
  ingredientHeaderEl.appendChild(ingredientHeaderCost);
  
  // 사용 재료 총 리스트
  const ingredientInfo = document.createElement("div");

  ingredientInfo.classList.add("all-list");

  const ingredientTitContainer = document.createElement("ul");

  newFoodCostObj.ingredientTit.forEach(menu => {
    const ingredientTit = document.createElement("li");

    ingredientTit.innerText = menu;
    ingredientTitContainer.appendChild(ingredientTit);
  })

  const pricesAndCostsEl = document.createElement("div");
  pricesAndCostsEl.classList.add("pricesAndCosts")

  const ingredientPriceContainer = document.createElement("ul");

  newFoodCostObj.ingredientPrice.forEach(menu => {
    const ingredientPrice = document.createElement("li");

    ingredientPrice.innerText = menu;
    ingredientPriceContainer.appendChild(ingredientPrice);
  })

  const ingredientCostContainer = document.createElement("ul");

  newFoodCostObj.ingredientCost.forEach(menu => {
    const ingredientCost = document.createElement("li");

    ingredientCost.innerText = `${numberWithCommas(menu)}`;
    ingredientCostContainer.appendChild(ingredientCost);
  })

  const sumCostEl = document.createElement("div");
  sumCostEl.classList.add("all-cost");
  sumCostEl.innerText = `₩ ${(numberWithCommas(newFoodCostObj.getSumCost))}원`;

  const marginEl = document.createElement("div");
  const marginContainer = document.createElement("div");
  marginEl.classList.add("margin-bar");
  marginContainer.classList.add("margin-container");
  marginEl.innerText = `${newFoodCostObj.getMargin}%`;

  marginEl.style.width = `${newFoodCostObj.getMargin}%`
  if(Number(newFoodCostObj.getMargin) > 35) {
    marginEl.style.background = "#a30000";
    if(Number(newFoodCostObj.getMargin) > 100) {
      marginEl.style.width = "100%";
    }
  } else if(Number(newFoodCostObj.getMargin) >= 30 && Number(newFoodCostObj.getMargin) <= 35) {
    marginEl.style.background = "#002864";
  } else if(Number(newFoodCostObj.getMargin) < 30) {
    marginEl.style.background = "#00612a";
  }

  const button = document.createElement('button');
  button.innerText = "삭제";
  button.addEventListener('click', deleteFoodCost);

  marginContainer.appendChild(marginEl);

  pricesAndCostsEl.appendChild(ingredientPriceContainer);
  pricesAndCostsEl.appendChild(ingredientCostContainer);

  ingredientInfo.appendChild(ingredientTitContainer);
  ingredientInfo.appendChild(pricesAndCostsEl);

  menuListItem.appendChild(menuTitle);
  menuListItem.appendChild(menuSalePrice);
  menuListItem.appendChild(ingredientHeaderEl);
  menuListItem.appendChild(ingredientInfo);

  menuListItem.appendChild(sumCostEl);
  menuListItem.appendChild(marginContainer);

  menuListItem.appendChild(button);

  foodCostContainer.appendChild(menuListItem);

  printTotalMenu();
  paintProgress();
}

// 재료 추가
const addIngredients = (event) => {
  event.preventDefault();
  const ingredientListLi = document.createElement("li");
  ingredientListLi.classList.add("list");

  const ingredientTitEl = document.createElement("span");

  const priceAndCostEl = document.createElement("div");

  const priceEl = document.createElement("span");
  const costEl = document.createElement("span");

  const useIngredientName = ingredientName.value;
  const usePrice = ingredientPrice.value;

  // 옵션에 있는 값인지 확인하는 유효성 검사
  if(!options.includes(useIngredientName)) {
    warningMessage.style.color = "red";
    ingredientName.value = "";
    ingredientPrice.value = "";
  } else {
    alertMessage.style.display = "none";
    warningMessage.style.color = "black";

    ingredientTitEl.innerText = useIngredientName;
    priceEl.innerText = usePrice;

    parseIngredient.forEach((ingredient) => {
      if(ingredient.name === useIngredientName) {
        costEl.innerText = `${Math.ceil(Number(ingredient.price) * Number(usePrice) / 100)}`
      }
    })

    ingredientListLi.appendChild(ingredientTitEl);

    priceAndCostEl.appendChild(priceEl);
    priceAndCostEl.appendChild(costEl);

    ingredientListLi.appendChild(priceAndCostEl);

    ingredientList.appendChild(ingredientListLi);

    ingredientName.value = "";
    ingredientPrice.value = "";
  }
}

// 메뉴 재료에 추가한 출력 재료 없애기
const clearAddList = () => {
  ingredientList.innerHTML = "";
}

// submit 핸들러
const handleFoodCostSubmit = (event) => {
  event.preventDefault();

  const menuTit = menuName.value;
  const menuSale = menuPrice.value;

  if(!menuTit) {
    menuName.focus();
    return;
  } else if(!menuSale) {
    menuPrice.focus();
    return;
  }

  // 재료를 하나라도 넣었는지 확인하는 유효성 검사
  if(ingredientList.childNodes.length !== 0) {
    alertMessage.style.display = "none";

    let ingredientTitArr = [];
    let ingredientPriceArr = [];
    let ingredientCostArr = [];
    let ingredientSumCost = 0;

    const ingredientLists = document.querySelectorAll(".list");

    ingredientLists.forEach(ingredient => {
      ingredientTitArr.push(ingredient.childNodes[0].innerText);
      ingredientPriceArr.push(ingredient.childNodes[1].childNodes[0].innerText);
      ingredientCostArr.push(ingredient.childNodes[1].childNodes[1].innerText);
      ingredientSumCost += Number(ingredient.childNodes[1].childNodes[1].innerText);
    })

    const newFoodCostObj = {
      menuTitle: menuTit,
      salePrice: menuSale,
      ingredientTit: ingredientTitArr,
      ingredientPrice: ingredientPriceArr,
      ingredientCost: ingredientCostArr,
      getSumCost: ingredientSumCost,
      getMargin: `${Math.ceil(Number(ingredientSumCost / menuSale) * 100)}`,
      id: Date.now()
    }

    menuName.value = "";
    menuPrice.value = "";

    foodCost.push(newFoodCostObj);
    paintFoodCost(newFoodCostObj);
    saveFoodCost();
    clearAddList();
  } else {
    alertMessage.style.display = "block";
  }
}

// 저장소 체크 및 데이터 출력
const savedFoodCost = localStorage.getItem(FOOD_INGREDIENTS_KEY);

if(savedFoodCost !== null) {
  const parsedFoodCost = JSON.parse(savedFoodCost);
  foodCost = parsedFoodCost;
  parsedFoodCost.forEach(paintFoodCost);
}

// ------------------------- EVENTS -------------------------
ingredientAddButton.addEventListener("click", addIngredients);
saveFoodButton.addEventListener("click", handleFoodCostSubmit);
lowEl.addEventListener("click", lowSortPrint);
highEl.addEventListener("click", highSortPrint);
sortElContainer.addEventListener("click", sortActive);
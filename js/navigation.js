// ------------------------ DOM ------------------------
const mobileButton = document.querySelector('.mobile-menu');
const navLists = document.querySelector(".nav-lists");
const listItems = document.querySelectorAll(".list-item");

// ------------------------ FUNCTIONS ------------------------
const activeBt = () => {
  mobileButton.classList.toggle("is-active");
  navLists.classList.toggle("is-active");
}

listItems.forEach(listItem => {
  let curUrl = window.location.href;
  if(curUrl === listItem.childNodes[1].href) {
    listItem.classList.add("cur-link");
  } else {
    listItem.classList.remove("cur-link")
  }
})

// ------------------------ EVENTS ------------------------
mobileButton.addEventListener("click", activeBt);
navLists.addEventListener("click", activeBt);
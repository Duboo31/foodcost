// ---------------------- DOM ----------------------
const backToTop = document.querySelector(".backToTop");
const navContainer = document.querySelector(".nav-container");

// ---------------------- VARIABLES ----------------------
const showArrow = 100;

// ---------------------- FUNCTIONS ----------------------
window.addEventListener("scroll", () => {
    if(window.pageYOffset > showArrow) {
      backToTop.classList.add("show");
      navContainer.style.background = "rgba(0, 0, 0, 0.5)";
    } else {
      backToTop.classList.remove("show");
      navContainer.style.background = "none";
    } 
  
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top:0,
    behavior: "smooth"
  })
})
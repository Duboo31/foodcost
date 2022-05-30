// ---------------------- DOM ----------------------
const backToTop = document.querySelector(".backToTop");

// ---------------------- VARIABLES ----------------------
const showArrow = 100;

// ---------------------- FUNCTIONS ----------------------
window.addEventListener("scroll", () => {
    window.pageYOffset > showArrow ? backToTop.classList.add("show") : backToTop.classList.remove("show");
  
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top:0,
    behavior: "smooth"
  })
})
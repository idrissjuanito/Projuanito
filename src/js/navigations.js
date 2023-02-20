// const navbar = document.querySelector('.navbar');
const goBackTop = document.querySelector(".go-back-top");
const toolsSection = document.querySelector(".daily-tools");
const body = document.querySelector("body");
// const menuIcon = document.querySelector('.menu-hamburger');
export const windowHeight = document.documentElement.clientHeight;
// export const menuHamburger = menuIcon.addEventListener("click", closeMobileNav);

// function closeMobileNav(){
//
//     navbar.classList.toggle('open');
//
//     const navLinks = document.querySelectorAll('.nav a');
//     navLinks.forEach((link) => link.removeEventListener('click', closeMobileNav));
//     if(navbar.classList.contains("open")){
//         navLinks.forEach((link) => link.addEventListener('click', closeMobileNav));
//     }
// }
//
// export function fixedNav(){
//     const bodyTop = body.getBoundingClientRect().top;
//
//     if (bodyTop < -630){
//         navbar.classList.add('fixed');
//     }else{
//         navbar.classList.remove('fixed');
//     }
// }

export function scrollBackTop() {
  const bodyTop = body.getBoundingClientRect().top;
  goBackTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  if (bodyTop < -600) {
    goBackTop.style.bottom = "5%";
  } else {
    goBackTop.style.bottom = "-5%";
  }
}

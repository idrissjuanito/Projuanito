const navbar = document.querySelector('.navbar');
const goBackTop = document.querySelector(".go-back-top");
const toolsSection = document.querySelector(".daily-tools");
const about = document.querySelector('.about');
const menuIcon = document.querySelector('.menu-hamburger');
export const windowHeight = document.documentElement.clientHeight;
export const menuHamburger = menuIcon.addEventListener('click', closeMobileNav);

function closeMobileNav(){
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach((link) => link.removeEventListener('click', closeMobileNav));

    navbar.classList.toggle('open');

    if(navbar.classList.contains("open")){
        navLinks.forEach((link) => link.addEventListener('click', closeMobileNav));
    }
}

export function fixedNav(){
    const aboutBound = about.getBoundingClientRect().top;
    if (aboutBound < 100){
        navbar.classList.add('fixed');
    }else{
        navbar.classList.remove('fixed');
    }
}

export function scrollBackTop(){
    const toolsTop = toolsSection.getBoundingClientRect().top;

    goBackTop.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });

    if(toolsTop <= windowHeight/2){
        goBackTop.style.bottom = "5%";
    }else{
        goBackTop.style.bottom = "-5%";
    }
}
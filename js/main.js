const about = document.querySelector('.about');
const containers = document.querySelectorAll('.container');
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

function reveal(){
    const windowHeight = document.documentElement.clientHeight;
    const navbar = document.querySelector('.navbar');
    const aboutBound = about.getBoundingClientRect().top;
    
    for(let container of containers){
        const boundTop = container.getBoundingClientRect().top;
        if( boundTop < windowHeight - 150){
            const cards = container.querySelectorAll('.card');
            for(let card of cards){
                card.classList.add('reveal');
            }
        }
    }
    if (aboutBound < 400){
        navbar.classList.add('fixed');
    }else{
        navbar.classList.remove('fixed');
    }
}
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
    if(!navbar.classList.contains('open')){
        navbar.classList.add('slideOut');
    }else{
        navbar.classList.remove('slideOut');
    }
})
document.addEventListener('scroll', reveal);
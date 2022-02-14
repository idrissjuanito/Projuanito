import Posts from "./Posts.js";
import Pages from "./Pages.js";

// if(module.hot){
//     module.hot.accept();
// }

const windowHeight = document.documentElement.clientHeight;
// const containers = document.querySelectorAll('.container');
// let docTop = document.querySelector("body");
const about = document.querySelector('.about');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('.menu-hamburger');
const navbar = document.querySelector('.navbar');
const toolsSection = document.querySelector(".daily-tools")
const goBackTop = document.querySelector(".go-back-top");


menuIcon.addEventListener('click', closeNavigation);
goBackTop.addEventListener("click", scrollBackTop);

function reveal(){
    const aboutBound = about.getBoundingClientRect().top;
    
    for(let section of sections){
        const boundTop = section.getBoundingClientRect().top;
        if( boundTop < windowHeight - 200){
            const container = section.querySelector(".container");
            container.classList.add('reveal');
        }
    }

    const toolsTop = toolsSection.getBoundingClientRect().top;

    if(toolsTop <= windowHeight/2){
        goBackTop.style.bottom = "5%";
    }else{
        goBackTop.style.bottom = "-5%";
    }

    if (aboutBound < 100){
        navbar.classList.add('fixed');
    }else{
        navbar.classList.remove('fixed');
    }
}

document.addEventListener('scroll', reveal);

function closeNavigation(){
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach((link) => link.removeEventListener('click', closeNavigation));

    navbar.classList.toggle('open');

    if(navbar.classList.contains("open")){
        navLinks.forEach((link) => link.addEventListener('click', closeNavigation));
    }
}


function scrollBackTop(){
    window.scrollTo(0, 0);
}

function showContent(e){
    let type = e.target.getAttribute("type");
    let content;
    let id = e.target.parentElement.id;
    if(type == null){
        return;
    }

    e.preventDefault();

    switch(type){
        case "page":
            content = Pages.pages;
            break;
        case "post":
            content = Posts.posts;
        break;
    }
    Posts.render(content, id);
}

async function main(){
    // await fetchData();
    Posts.showPosts();
    Pages.footerPageList();
    const postLink = document.querySelectorAll("a");
    postLink.forEach( link => link.addEventListener("click", showContent));
}

main();
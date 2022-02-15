import Posts from "./Posts.js";
import Pages from "./Pages.js";
import getPostContent from "./singlePostContent.js";
import {windowHeight, menuHamburger, fixedNav, scrollBackTop} from "./navigations.js";

const sections = document.querySelectorAll('section');

function scrollReveal(){

    for(let section of sections){
        const boundTop = section.getBoundingClientRect().top;
        if( boundTop < windowHeight - 200){
            const container = section.querySelector(".container");
            container.classList.add('reveal');
        }
    }
    fixedNav();
    scrollBackTop();
}

export default () => {
    document.addEventListener('scroll', scrollReveal);
    Posts.showPosts();
    Pages.footerPageList();
    menuHamburger;
    const postLink = document.querySelectorAll("a");
    postLink.forEach( link => link.addEventListener("click", getPostContent));
}
// const Posts = require("./../_data/Posts.js");
// const Pages = require("./../_data/Pages.js");
import preventDef from "./singlePostContent.js";
// const router = require("./Router/Router.js");
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
    // posts.showPosts();
    // Pages.footerPageList();
    menuHamburger;
    const postLink = document.querySelectorAll("a");
    postLink.forEach( link => link.addEventListener("click", preventDef));
}
const windowHeight = document.documentElement.clientHeight;
let docTop = document.querySelector("body");
const about = document.querySelector('.about');
const containers = document.querySelectorAll('.container');
const menuIcon = document.querySelector('.menu-hamburger');
const navbar = document.querySelector('.navbar');
const projectSection = document.querySelector(".projects")
const postsSection = document.querySelector(".posts");
const postContent = document.querySelector('.post-content');
const goBackTop = document.querySelector(".go-back-top");
const footerPages = document.querySelector(".footer-bottom ul");


menuIcon.addEventListener('click', closeNavigation);
goBackTop.addEventListener("click", scrollBackTop);

let posts = [];
let pages = [];

function reveal(){
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

    const projectsTop = projectSection.getBoundingClientRect().top;

    if(projectsTop <= windowHeight/2){
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

async function fetchData(){
    try {
        let response = await fetch("posts.json");
    
        if(!response.ok && response.type !== "json"){
            throw new Error("Http Error! Status: "+ response.status);
        }
        

        let allPosts = await response.json();

        for(let post of allPosts){
            if(post.type === "post"){
                posts.push(post);
            }else{
                pages.push(post);
            }
        }
        
    } catch(error){
        console.log("there was an error while fetching the file your requested: "+ error.message)
    }
}

function showContent(e){
    let type = e.target.getAttribute("type");

    if(type == null){
        return;
    }

    e.preventDefault();

    let content;

    switch(type){
        case "page":
            content = pages;
            break;
        case "post":
            content = posts;
        break;
    }

    for(let post of content){
        if(post.id === Number(e.target.parentElement.id)){
        
        let singlePostData = `
            <div class="post__data">
                <div class="author">
                    <i class="fas fa-user-circle"> <span>${post.author}&emsp;|</span></i>
                </div>
                <div class="date">
                    <i class="fas fa-calendar-alt"> <span>  ${post.datePublished}</span></i>
                </div>
            </div>`;

        postContent.innerHTML = `
            <div class="close-icon">
                <i class="fas fa-times fa-2x"></i>
            </div>
            <div class="container">
                <h1 class="post-content__title">${post.title}</h1>
                ${ post.type === "post" ?  singlePostData : "" }
                <p class="post-content__body">${post.body}</p>
            </div>`;
        }
    }
    
    postContent.style.display = "block";
    const closeSingle = document.querySelector('.post-content i');
    closeSingle.addEventListener('click', () => {
        postContent.classList.add("closed");
        setTimeout(() => {
            postContent.style.display = "none";
            postContent.classList.remove("closed")}, 1000);
    });
}

function scrollBackTop(){
    window.scrollTo(0, 0);
}

let getPages = function(id){
    let founds = [];
    id.forEach( (index) => {
        founds = founds.concat(pages.filter((page) => page.id === index));
    });
    return founds;
}

function footerPageList(){
    const pageList = getPages([938399, 948394]);

    pageList.forEach( (page) => {
        footerPages.innerHTML +=
            `<li id="${page.id}"><a href="#" type="page">${page.title}</a></li>`; 
        });
}

let showPosts = function(){
    let card;
    
    for(let post of posts){
        card = `
        <div class="post card">
            <h3 id="${post.id}"><a href="#" type="${post.type}">${post.title.slice(0, 50)}</a></h3>
            <p>${post.body.slice(0, 120)}</p>
            <div class="post__data">
                <div class="author">
                    <i class="fas fa-user-circle"><span>${post.author}&emsp;|</span></i>
                </div>
                <div class="date">
                    <i class="fas fa-calendar-alt"><span>${post.datePublished}&emsp;|</span></i>
                </div>
            </div>
        </div>`
        postsSection.innerHTML += card;
    }
}

async function main(){
    await fetchData();
    showPosts();
    footerPageList();
    const postLink = document.querySelectorAll("a");
    postLink.forEach( link => link.addEventListener("click", showContent));
}

main();
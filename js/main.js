const about = document.querySelector('.about');
const containers = document.querySelectorAll('.container');
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');
const postsSection = document.querySelector(".posts");
const postContent = document.querySelector('.post-content');
const singlePostTitle = document.querySelector('.post-content__title');
const singlePostData = document.querySelector(".post-content .post__data");
const singlePostBody = document.querySelector('.post-content__body');
const closeSingle = document.querySelector('.post-content i');

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
    if (aboutBound < 100){
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

let posts = [];
async function getPosts(url){
    let response = await fetch("../posts.json");

    if(!response.ok && response.type !== "json"){
        throw new Error("Http Error! Status: "+ response.status);
    }

    posts = await response.json();
    for(let post of posts){
        postCard(post);
    }
}
getPosts()
    .catch(e => { console.log("there was an error while fetching the file your requested: "+ e.message);
});

function showPost(e){
    for(post of posts){
        if(post.id === Number(e.target.parentElement.id)){
            singlePostTitle.textContent = post.title;
            singlePostBody.textContent = post.body;
            singlePostData.innerHTML = `
            <div class="author">
                <i class="fas fa-user-circle"> <span>${post.author}&emsp;|</span></i>
            </div>
            <div class="date">
                <i class="fas fa-calendar-alt"> <span>  ${post.datePublished}</span></i>
            </div>`;
        }
    }
    postContent.style.display = "block";
    closeSingle.addEventListener('click', () => {
        postContent.classList.add("closed");
        setTimeout(() => {
            postContent.style.display = "none";
            postContent.classList.remove("closed")}, 1000);
    });
}

let postCard = function(post){
    const createDiv = document.createElement('div');

    const card = createDiv;
    card.classList.add("card", "post");

    const postTitle = document.createElement('h3');
    card.appendChild(postTitle);
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = post.title.slice(0, 50);
    postTitle.appendChild(link);
    postTitle.addEventListener('click', showPost);
    postTitle.id = post.id;

    const postBody = document.createElement('p');
    postBody.textContent = post.body.slice(0, 120);
    card.appendChild(postBody);

    const postData = document.createElement('div');
    postData.classList.add("post__data");
    card.appendChild(postData);

    const postAuthor = document.createElement('div');
    postAuthor.classList.add("author");
    postData.appendChild(postAuthor);

    const authorIcon = document.createElement('i');
    authorIcon.classList.add("fas", "fa-user-circle")
    postData.appendChild(authorIcon);

    const authorSpan = document.createElement('span');
    authorSpan.innerHTML = `${post.author}&emsp;|  `;
    authorIcon.appendChild(authorSpan);

    const postDate = document.createElement('div');
    postDate.classList.add('date');
    const dateIcon = document.createElement('i');
    dateIcon.classList.add("fas", "fa-calendar-alt");
    postDate.appendChild(dateIcon);
    const dateSpan = document.createElement('span');
    dateSpan.textContent = post.datePublished;
    dateIcon.appendChild(dateSpan);
    postData.appendChild(postDate);

    postsSection.appendChild(card);
}
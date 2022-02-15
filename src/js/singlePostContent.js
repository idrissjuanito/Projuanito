import Posts from "./Posts.js";
import Pages from "./Pages.js";

const postContent = document.querySelector('.post-content');

export default (e) => {
    console.log("called...")
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
    render(content, id);
}

function render(content, id){
    for(let post of content){
        let body = post.body[0].children[0].text;
        let author = Posts.getPostAuthor(post);

        if(post._id === id){
        let singlePostData = `
            <div class="post__data">
                <div class="author">
                    <i class="fas fa-user-circle"> <span>${author}&emsp;|</span></i>
                </div>
                <div class="date">
                    <i class="fas fa-calendar-alt"> <span>  ${post._createdAt}</span></i>
                </div>
            </div>`;

        postContent.innerHTML = `
            <div class="close-icon">
                <i class="fas fa-times fa-2x"></i>
            </div>
            <div class="container">
                <h1 class="post-content__title">${post.title}</h1>
                ${ post.Postype === "post" ?  singlePostData : "" }
                <p class="post-content__body">${body}</p>
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
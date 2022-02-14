import { data } from "./functions/fetchData.js"

const postsSection = document.querySelector(".posts");
const postContent = document.querySelector('.post-content');

const { blogPosts, postAuthors } = data;

class Posts{
    constructor (posts, authors){
        this.posts = posts;
        this.authors = authors;
    }

    getPostAuthor(post){
        const authorRef = post.author._ref;
        let authorName;
    
        for(let author of this.authors){
            if(author._id === authorRef){
                authorName = author.name;
            }
        }
        return authorName;
    }
    
    showPosts(){
        let card;        

        for(let post of this.posts){
            let body = post.body[0].children[0].text; 
            const author = this.getPostAuthor(post);
            card = `
            <div class="post card">
                <h3 id="${post._id}"><a href="#" type="${post.Postype}">${post.title.slice(0, 80)}</a></h3>
                <p>${body.slice(0, 115)}</p>
                <div class="post__data">
                    <div class="author">
                        <i class="fas fa-user-circle"><span> ${author}&emsp;|</span></i>
                    </div>
                    <div class="date">
                        <i class="fas fa-calendar-alt"><span> ${post._createdAt}&emsp;</span></i>
                    </div>
                </div>
            </div>`
            postsSection.innerHTML += card;
        }
    }

    render(content, id){
        for(let post of content){
            let body = post.body[0].children[0].text;
            let author = this.getPostAuthor(post);
    
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
}

const blogp = new Posts(blogPosts, postAuthors);

export default blogp;
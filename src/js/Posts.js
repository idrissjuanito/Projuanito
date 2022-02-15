import { data } from "./functions/fetchData.js"

const postsSection = document.querySelector(".posts");
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
}

const blogp = new Posts(blogPosts, postAuthors);

export default blogp;
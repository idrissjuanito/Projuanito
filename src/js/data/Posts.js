const data  = require("../functions/fetchData.js");

// const postsSection = document.querySelector(".posts");
const { posts, authors } = data;

class Posts{
    constructor (posts, authors){
        this.posts = posts;
        this.authors = authors;
    }

    getPostAuthor(authorID){
        let authorName;
    
        for(let author of this.authors){
            if(author._id === authorID){
                authorName = author.name;
            }
        }
        return authorName;
    }
    
    find(id){
        let findings;
        
        if(!Array.isArray(id)){
            findings = this.posts.filter((page) => page._id === id);
        }else{
            findings = [];
            id.forEach( (index) => {
                findings = findings.concat(this.posts.filter((page) => page._id === index));
            });
        }
        return findings;
    }

    // showPosts(){
    //     let card;        

    //     for(let post of this.posts){
    //         let body = post.body[0].children[0].text; 
    //         const author = this.getPostAuthor(post.author._ref);
    //         card = `
    //         <div class="post card">
    //             <h3><a href="#${post.slug.current}">${post.title.slice(0, 80)}</a></h3>
    //             <p>${body.slice(0, 115)}</p>
    //             <div class="post__data">
    //                 <div class="author">
    //                     <i class="fas fa-user-circle"><span> ${author}&emsp;|</span></i>
    //                 </div>
    //                 <div class="date">
    //                     <i class="fas fa-calendar-alt"><span> ${post._createdAt}&emsp;</span></i>
    //                 </div>
    //             </div>
    //         </div>`
    //         postsSection.innerHTML += card;
    //     }
    // }
}

const postList = new Posts(posts, authors);

module.exports = postList.posts;

console.log(postList);
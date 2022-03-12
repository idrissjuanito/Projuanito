require('dotenv').config()

const url = "https://53zt2ahq.api.sanity.io/v1/data/query/production?query=*%5B_type%20in%20%5B%22post%22%2C%20%22author%22%2C%20%22page%22%5D%5D";
const auth_token = process.env.AUTH_TOKEN;
// const token = "sk2E2Lz375IItZ0niOdoslpeqV2YTKzW3nqn6qnQSlDjjaLXIv6jea8DVHZwvilxDHbKLplVeZOuduHQod5nWq7rtAVn4eazKwcJW9kouJMOxMkVYWDKoOfTZDnyXfvKdhXgQT0ve16o9L4GLWsGWLKRt9fRKVFmz66Zjp0lQKuM5CVEkjGE";
const axios = require("axios");

async function fetchData(url, token){
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': 'VEFKSUNBUElURVNUOlRBSklDQVBJVEVTVDIwMjA=',
                'Authorization': 'Bearer '+token
            }
        });
        
        let data = response.data.result;
        return data;
    } catch (error) {
        console.log("there was an error fetching the data you requested: "+ error.message)
    }
}

module.exports = async function processData(){
    try {
        const data = await fetchData(url, auth_token);
    
        let posts = [];
        let authors = [];
        let pages = [];
    
        for(let content of data){
            let type = content._type+"s";
            eval(type).push(content)

        }

        posts.forEach( (post) => {
            post.author = getAuthor(authors, post.author._ref)
            let postImageRef = post.mainImage.asset._ref.slice(6, -4)
            post.featured_image = `https://cdn.sanity.io/images/53zt2ahq/production/${postImageRef}.jpg`;
        })

        pages.forEach( (page) => {
            page.excerpt = page.body.slice(0, 80)
        })

        return  {
            posts,
            pages
        }
        
    } catch (error) {
        console.log("there was an error while processing the data you requested: "+ error.message)
    }
}

function getAuthor(authList, id){
    let authorName;
    authList.forEach((author) => {
        if(author._id === id) authorName = author.name
    })
    return authorName
}
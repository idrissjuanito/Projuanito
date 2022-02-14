const url = "https://53zt2ahq.api.sanity.io/v1/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%20%7C%7C%20_type%20%3D%3D%20%22author%22%5D";

// AUTH_TOKEN = process.env.AUTH_TOKEN;
const token = "sk2E2Lz375IItZ0niOdoslpeqV2YTKzW3nqn6qnQSlDjjaLXIv6jea8DVHZwvilxDHbKLplVeZOuduHQod5nWq7rtAVn4eazKwcJW9kouJMOxMkVYWDKoOfTZDnyXfvKdhXgQT0ve16o9L4GLWsGWLKRt9fRKVFmz66Zjp0lQKuM5CVEkjGE";
async function fetchData(){
    try {
        let blogPosts = [];
        let postAuthors = [];
        let pages = [];

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': 'VEFKSUNBUElURVNUOlRBSklDQVBJVEVTVDIwMjA=',
                'Authorization': 'Bearer '+token
            }
        });
        
        let data = response.data.result;

        for(let post of data){
            if(!post.Postype){
                postAuthors.push(post);
            }else{
                if(post.Postype === "post"){
                    blogPosts.push(post);
                }else{
                    pages.push(post);
                }
            }
        }
        return {
            blogPosts,
            postAuthors,
            pages
        }
        console.log(dataa);
    } catch (error) {
        console.log("there was an error while fetching the file you requested: "+ error.message)
    }
}

export const data  = await fetchData();
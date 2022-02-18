const url = "https://53zt2ahq.api.sanity.io/v1/data/query/production?query=*%5B_type%20in%20%5B%22post%22%2C%20%22author%22%2C%20%22page%22%5D%5D";
const token = "sk2E2Lz375IItZ0niOdoslpeqV2YTKzW3nqn6qnQSlDjjaLXIv6jea8DVHZwvilxDHbKLplVeZOuduHQod5nWq7rtAVn4eazKwcJW9kouJMOxMkVYWDKoOfTZDnyXfvKdhXgQT0ve16o9L4GLWsGWLKRt9fRKVFmz66Zjp0lQKuM5CVEkjGE";

import routes from "../Router/Routes.js"

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

async function processData(){
    try {
        const data = await fetchData(url, token);
    
        let posts = [];
        let authors = [];
        let pages = [];
    
        for(let content of data){
            routes.newRoute(content);
            let type = content._type+"s";
            eval(type).push(content);

        }
        return {
            posts,
            authors,
            pages
        }
        
    } catch (error) {
        console.log("there was an error while processing the data you requested: "+ error.message)
    }
}

export const data  = await processData();
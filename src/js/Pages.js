import { data } from "./functions/fetchData.js"

const footerPages = document.querySelector(".footer-bottom ul");
const { pages } = data;

class Pages{

    constructor(pageList){
        this.pages = pageList;
    }

    find(id){
        let findings;
        
        if(!Array.isArray(id)){
            findings = this.pages.filter((page) => page._id === id);
        }else{
            findings = [];
            id.forEach( (index) => {
                findings = findings.concat(this.pages.filter((page) => page._id === index));
            });
        }
        return findings;
    }
    
    footerPageList(){
        const pageList = this.find(["c544950c-747e-4dd9-b83b-9249b686484f", "cf0d0b78-f665-4880-9156-824ee9741ac3"]);
    
        pageList.forEach( (page) => {
            footerPages.innerHTML +=
                `<li><a href="#${page.slug.current}">${page.title}</a></li>`; 
            });
    }

}

const pager = new Pages(pages);

export default pager;

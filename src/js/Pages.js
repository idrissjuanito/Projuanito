import {data} from "./functions/fetchData.js"

const footerPages = document.querySelector(".footer-bottom ul");
const {pages} = data;

class Pages{

    constructor(pageList){
        this.pages = pageList;
    }

    getPages(id){
        let founds = [];
        id.forEach( (index) => {
            founds = founds.concat(this.pages.filter((page) => page._id === index));
        });
        return founds;
    }
    
    footerPageList(){
        const pageList = this.getPages(["428a1388-3adc-43f5-b305-70afe4e7f7fd", "c3cb3418-1689-4353-8544-0a37cb737f95"]);
    
        pageList.forEach( (page) => {
            footerPages.innerHTML +=
                `<li id="${page._id}"><a href="#" type="page">${page.title}</a></li>`; 
            });
    }

}

const pag = new Pages(pages);

export default pag;

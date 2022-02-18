import posts from "../Posts.js";
import pages from "../Pages.js";
import {render} from "../singlePostContent.js";
import routes from "./Routes.js";

class Router{
    constructor(rotes){
       this.routes = rotes;
    }

    hashChanged(){
        this.routes.forEach((route) => {
            if(route.name === location.hash.substring(1)){
                this.loadView(route);
            }
        })
    }

    loadView(route){
        const content = eval(route.type+"s").find(route.id);
        render(content, "Tchoffo");
    }

    init(){
        ( function (scope){
            window.addEventListener("hashchange", function(e){
                scope.hashChanged();
            }); 
        })(this) 
    }
}

const router = new Router(routes.routes);
router.init();
export default router;
class Routes{
    constructor(){
        this.routes = []
    }

    newRoute(content){
        this.routes.push({
            name: content.slug.current,
            id: content._id,
            type: content._type
        });
    }
}

const routes = new Routes();

export default routes;
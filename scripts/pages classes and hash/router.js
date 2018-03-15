
class Router {
    constructor() {
        this.routes = new Map();
        this.routes.set(new RegExp('#library-playlists'), new Library());
        this.routes.set(new RegExp('#recommendations-forYou'), new Recommendations());
    }

    listen() {
        this.currentLocation = location.hash;
        for (let [reg, pageClass] of this.routes.entries()) {
            if (reg.test(this.currentLocation)) {
                let currentPage = pageClass;
                currentPage.init();
                currentPage.display();
            }
        }
    }
}

let router = new Router();
window.addEventListener('hashchange', router.listen.bind(router));
window.addEventListener('load', function () {
    if (!location.hash) {
       router.currentLocation = location.hash = '#recommendations-forYou';
       router.listen()
    } else {
        router.currentLocation = location.hash;
        router.listen();
    }
});

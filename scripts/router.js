class Router {
    constructor() {
        this.routes = new Map;
        this.root = '/';
    }

    clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    getFragment() {
        let fragment = '',
            match = window.location.href.match(/#(.*)$/);

        fragment = match ? match[1] : '';

        return this.clearSlashes(fragment);
    }

    add(regular, classPage) {
        this.routes.set(new RegExp(regular), new classPage);
        return this;
    }

    check(frag) {
        let fragment = frag || this.getFragment();
        console.log(fragment);
        for (let [reg, PageObject] of this.routes.entries()) {
            if (reg.exec(fragment)) {
                return PageObject
            }
        }
        return false;
    }

    listen() {
        let current = this.getFragment();
        let page = this.check(current);
        if (page) {
            page.init();
        }

    }

    navigate(path) {
        path = path ? path : '';
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        return this;
    }
}

let router = new Router();
router.add("library/playlists", Library);
window.addEventListener("hashchange", router.listen.bind(router));

class Router {
    constructor() {
        this.currentPage = null;
        this.currentPageData = {};
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
        this.routes.set(regular, new classPage);
        return this;
    }

    check(frag) {
        let fragment = frag || this.getFragment();
        for (let [reg, PageObject] of this.routes.entries()) {
            if (reg.test(fragment)) {
                return PageObject;
            }
        }
    }

    listen() {
        let current = this.getFragment();
        let page = this.check(current);
        let {pageName, sectionName, sectionHandler} = page.getPageData(current);
        if (!this.currentPage) {
            page.init(sectionHandler);
        } else if (this.currentPage) {
            if (pageName === this.currentPageData.pageName && sectionName !== this.currentPageData.sectionName) {
                this.currentPage.destroyContent();
                page.init(sectionHandler);
            } else if (pageName !== this.currentPageData.pageName) {
                this.currentPage.destroyHeader();
                this.currentPage.destroyContent();
                page.init(sectionHandler);
            }
        }
        this.currentPage = page;
        this.currentPageData = {
            pageName,
            sectionName,
            sectionHandler
        };
    }

    onLoad() {
        if (!this.getFragment()){
            this.navigate('recommendations/for-you');
            this.listen();
        } else {
            this.listen();
        }
    }


    navigate(path) {
        path = path ? path : '';
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        return this;
    }
}

let router = new Router();
router.add(/(library)\/(playlists|songs|albums|artists)/, Library);
router.add(/(recommendations)\/(for-you|genres|new|popular)/, Recommendations);
router.add(/album\/[0-9]/, Album);
router.add(/playlist\/[0-9]/, Playlist);
router.add(/artist\/[0-9]/, Artist);
window.addEventListener('load', router.onLoad.bind(router));
window.addEventListener("hashchange", router.listen.bind(router));

// let section = document.getElementById('content-section');
// section.addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log('hi');
// });
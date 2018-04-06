import { hideSpinner } from 'scripts/common';

class Router {
  constructor() {
    this.currentPage = null;
    this.currentPageData = {};
    this.routes = new Map();
    this.root = '/';
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  getFragment() {
    let fragment = '';
    const match = window.location.href.match(/#(.*)$/);

    fragment = match ? match[1] : '';

    return this.clearSlashes(fragment);
  }

  add(regular, ClassPage) {
    this.routes.set(regular, new ClassPage());
    return this;
  }

  check(frag) {
    const fragment = frag || this.getFragment();
    for (const [reg, PageObject] of this.routes.entries()) {
      if (reg.test(fragment)) {
        return PageObject;
      }
    }
    return {};
  }

  listen() {
    const current = this.getFragment();
    const page = this.check(current);
    const { pageName, sectionName } = page.getPageData(current);
    if (!this.currentPage) {
      page.init();
    } else if (this.currentPage) {
      if (pageName === this.currentPageData.pageName
        && sectionName !== this.currentPageData.sectionName) {
        this.currentPage.destroyContent();
        page.init();
      } else if (pageName !== this.currentPageData.pageName) {
        this.currentPage.destroy();
        page.init();
      }
    }
    hideSpinner();
    this.currentPage = page;
    this.currentPageData = {
      pageName,
      sectionName,
    };
  }

  onLoad() {
    if (!this.getFragment()) {
      this.navigate('/recommendations/for-you');
      this.listen();
    } else {
      this.listen();
    }
  }


  navigate(path) {
    const newPath = path || '';
    window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${newPath}`;
    return this;
  }
}

export default Router;

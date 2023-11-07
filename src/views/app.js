import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor(content) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = '';
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
    if (page) {
      this._content.appendChild(await page.render());
    }
    page.afterRender();
  }
}
export default App;

import 'regenerator-runtime';
import '../styles/main.scss';
import swRegister from '../utils/sw-register';
import App from '../views/app';

const main = document.querySelector('main');
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');
const navUl = document.querySelector('.navbar ul');
const app = new App(main);

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});
function setHamburgerVisibility() {
  if (window.innerWidth < 650) {
    hamburger.addEventListener('click', () => {
      navUl.classList.toggle('slide');
      if (navUl.classList.contains('slide')) {
        hamburger.innerText = 'X';
      } else {
        hamburger.innerText = '☰';
      }
    });
  }
}

window.onload = () => {
  const alertBox = document.createElement('div');
  alertBox.innerHTML = `
  <style>
  .alert {
    display:flex;
    justify-content:center;
    padding: 20px;
    background-color: #4CAF50;
    color: white;
    text-align: center;
    margin: 0;
}
</style>
<div class="alert">     
        Selamat Datang Di Website Warung Bu Soraya!
    </div>
`;
  document.body.insertBefore(alertBox, navbar);
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
};
document.addEventListener('DOMContentLoaded', () => {
  setHamburgerVisibility();

  window.addEventListener('resize', setHamburgerVisibility);
});

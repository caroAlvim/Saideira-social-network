import { profileImage, loadPosts } from '../../lib/functions.js';
import { getReviews, searchDrinks, searchHashtagReviews } from '../../lib/index.js';

export const navbar = () => {
  const photoNavbar = profileImage();

  const sectionElement = document.createElement('navbar');
  sectionElement.setAttribute('class', 'home-navbar');

  const navbarTemplate = `
  <div class="search-navbar">
    <input type="text" id="input-search-navbar" placeholder="Busque por uma bebida ou #tag">
    <button id="search-nav"><img src="./img/search.png"></button>
  </div>
  <div class="navbar">
    <button class="menu-mobile-btn" id="profile-navbar">
    <img src="${photoNavbar}" class="menu-img" id="photo-navbar" ></button> 
    <button class="menu-mobile-btn" id="home-navbar"><img
    src="./img/home-navbar.png" class="menu-img"></button> 
    <button class="menu-mobile-btn" id="add-review-navbar">
    <img src="./img/add-navbar.png" class="menu-img" id="add-review-navbar"></button> 
    <button class="menu-mobile-btn" id="saved-navbar">
    <img src="./img/save-navbar.png" class="menu-img" id="save-navbar-img"></button>    
    <button class="menu-mobile-btn" id="search-navbar-btn"><img
    src="./img/search-navbar.png" class="menu-img"></button>
    
    <button class="menu-mobile-btn" id="open-sidebar">
    <img src="./img/menu-navbar.png" class="menu-img" ></button>  
  </div>
  `;
  sectionElement.innerHTML = navbarTemplate;

  const buttonHomeNavbar = sectionElement.querySelector('#home-navbar');
  buttonHomeNavbar.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/home');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  const buttonSaveNavbar = sectionElement.querySelector('#saved-navbar');

  buttonSaveNavbar.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/salvos');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  const buttonProfileNavbar = sectionElement.querySelector('#profile-navbar');

  buttonProfileNavbar.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/perfil');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  

  return sectionElement;
};

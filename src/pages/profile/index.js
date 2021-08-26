import { currentUser, getProfileReviews } from '../../lib/index.js';
import { sidebar } from '../../components/sidebar/index.js';
import { loadPosts, profileImage, showReviewArea } from '../../lib/functions.js';
import { navbar } from '../../components/navbar/index.js';
import home from '../home/index.js';

export default () => {
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'profile-content');

  const user = currentUser();
  const name = user.displayName;

  let userName;
  if (name !== null && name !== undefined) {
    userName = name;
  } else {
    // eslint-disable-next-line no-unused-vars
    userName = 'Usuário anônimo';
  }

  const profileTemplate = `
  <div class="profile-container">
   
      <header>
        <div class="logo-title">
          <img class="favicon-home" src="img/favicon.png">
          <h1 class="header-home">Bons Drinks</h1>
        </div>
     
      <div class="dark-container-profile">
      <div class="noturn-mood" data-item>
        <button class="dark-mode" data-item="dark"></button>
        <button class ="light-mode" data-item="light"></button>
      </div>
      <span class="span-mood">Light</span>
    </div>
    
      <button class="btn-home-profile">
        <img class="icon-home" src="img/home-blue.png">
        <p class="home-profile-text">Home</p>
      </button>
    </header>
  
    <div class="head-profile">
      <div class="photo-profile-div">
        <img  class="photo-profile" src="${profileImage()}">
      </div>
      <p class="user-name-profile">${name}</p> 
    </div>
    
    <div data-all-reviews class= "all-reviews"></div>
    
    </div>
    <div class="load">
        <div class="loading">
        <img class ="gif-load" src="./img/gif-teste.gif"/>
        </div>
        </div>
    
  `;
  sectionElement.innerHTML = profileTemplate;

  sectionElement.appendChild(navbar());
  sectionElement.appendChild(sidebar());

  sectionElement.querySelector('.sidebar').style.display = 'none';
  sectionElement.querySelector('.sidebar').style.zIndex = '2';

  const buttonHome = sectionElement.querySelector('.btn-home-profile');
  buttonHome.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/home');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  const openSidebar = sectionElement.querySelector('#open-sidebar');
  openSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    const sidebar = sectionElement.querySelector('#sidebar');
    sidebar.style.display = 'block';
    sidebar.classList.remove('sidebar-desktop');
  });

  const lightModeBackground = sectionElement.querySelectorAll('.noturn-mood');
  // eslint-disable-next-line no-restricted-syntax
  for (const mood of lightModeBackground) {
    mood.addEventListener('click', (e) => {
      const target = e.target;
      const targetDataset = target.dataset.item;
      if (targetDataset === 'dark') {
        // eslint-disable-next-line no-shadow
        const lightModeBackground = sectionElement.querySelector('.noturn-mood');
        const lightMode = sectionElement.querySelector('.light-mode');
        const textMode = sectionElement.querySelector('.span-mood');
        const noturnMode = sectionElement.querySelector('.dark-mode');
        lightModeBackground.style.backgroundColor = 'white';
        noturnMode.style.backgroundColor = '#313c44';
        noturnMode.style.opacity = '1';
        noturnMode.style.margin = '0.2rem 0rem 0rem 3rem';
        textMode.innerHTML = 'Dark';
        textMode.style.color = 'white';
        lightMode.style.opacity = '0';
        lightMode.style.margin = '0.2rem 0rem 0rem 3rem';

        const header = sectionElement.querySelector('header');
        const textHeader = sectionElement.querySelector('.header-home');
        const profileContent = document.querySelector('.profile-content');
        const nameProfile = document.querySelector('.user-name-profile');
        const navBar = document.querySelector('.home-navbar');
        const homeNavBar = document.querySelector('#home-navbar');
        const addNavBar = document.querySelector('#add-review-navbar');
        const saveNavBar = document.querySelector('#save-navbar-img');
        const openNavBar = document.querySelector('#open-sidebar');
        header.style.backgroundColor = '#313c44';
        textHeader.style.color = 'white';
        nameProfile.style.color = 'white';
        profileContent.style.backgroundColor = '#2c2c2c';
        navBar.style.backgroundColor = '#404040';
        navBar.style.borderTop = 'grey';
        homeNavBar.style.filter = 'brightness(800%) contrast(100%)';
        addNavBar.style.filter = 'brightness(800%) contrast(100%)';
        saveNavBar.style.filter = 'brightness(800%) contrast(100%)';
        openNavBar.style.filter = 'brightness(800%) contrast(100%)';

        const allPosts = document.querySelectorAll('[data-post]');
        // eslint-disable-next-line no-restricted-syntax
        for (const posts of allPosts) {
          posts.style.backgroundColor = '#313c44';
          posts.style.boxShadow = '1px 1px 10px #000000';
          const nameUser = posts.children[0].children[0].children[0].children[0]
            .children[1].children[0].children[0];
          nameUser.style.color = 'white';
          const textBook = posts.children[0].children[0].children[0].children[1]
            .children[0].children[0];
          textBook.style.color = 'white';
          const nameAuthor = posts.children[0].children[0].children[0].children[1]
            .children[1];
          nameAuthor.style.color = 'white';
          // eslint-disable-next-line no-shadow
          const userName = posts.children[0].children[0].children[0].children[0]
            .children[1].children[0].children[1];
          userName.style.color = '#a1a1a1';
          const textReview = posts.children[0].children[1].children[0];
          textReview.style.color = 'white';
          const btnComment = posts.children[0].children[2].children[2];
          btnComment.style.backgroundColor = '#313c44';
          const saveIcon = posts.children[0].children[2].children[3].children[0];
          saveIcon.style.filter = 'brightness(100%) contrast(0%)';

          const allComments = document.querySelectorAll('.comment-text');
          // eslint-disable-next-line no-restricted-syntax
          for (const comments of allComments) {
            comments.style.backgroundColor = '#7694aa';
          }
        }
      }

      if (targetDataset === 'light') {
        const lightMode = sectionElement.querySelector('.light-mode');
        // eslint-disable-next-line no-shadow
        const lightModeBackground = sectionElement.querySelector('.noturn-mood');
        const textMode = sectionElement.querySelector('.span-mood');
        const noturnMode = sectionElement.querySelector('.dark-mode');
        lightModeBackground.style.backgroundColor = '#313c44';
        noturnMode.style.backgroundColor = 'white';
        noturnMode.style.opacity = '1';
        noturnMode.style.margin = '0.2rem 0rem 0rem 0.5rem';
        textMode.innerHTML = 'Light';
        textMode.style.color = 'black';
        lightMode.style.margin = '0rem 0rem 0rem 3rem';

        const header = sectionElement.querySelector('header');
        const textHeader = sectionElement.querySelector('.header-home');
        const profileContent = document.querySelector('.profile-content');
        const nameProfile = document.querySelector('.user-name-profile');
        const navBar = document.querySelector('.home-navbar');
        const homeNavBar = document.querySelector('#home-navbar');
        const addNavBar = document.querySelector('#add-review-navbar');
        const saveNavBar = document.querySelector('#save-navbar-img');
        const openNavBar = document.querySelector('#open-sidebar');
        header.style.backgroundColor = 'white';
        textHeader.style.color = 'black';
        nameProfile.style.color = '#000000';
        profileContent.style.backgroundColor = '#f0f0f0';
        navBar.style.backgroundColor = 'white';
        navBar.style.borderTop = 'grey';
        homeNavBar.style.filter = 'none';
        addNavBar.style.filter = 'none';
        saveNavBar.style.filter = 'none';
        openNavBar.style.filter = 'none';

        const allPosts = document.querySelectorAll('[data-post]');
        // eslint-disable-next-line no-restricted-syntax
        for (const posts of allPosts) {
          posts.style.backgroundColor = '#ffffff';
          posts.style.boxShadow = '1px 1px 10px #888888';
          const nameUser = posts.children[0].children[0].children[0].children[0]
            .children[1].children[0].children[0];
          nameUser.style.color = 'black';
          const textBook = posts.children[0].children[0].children[0].children[1]
            .children[0].children[0];
          textBook.style.color = 'black';
          const nameAuthor = posts.children[0].children[0].children[0].children[1]
            .children[1];
          nameAuthor.style.color = 'black';
          // eslint-disable-next-line no-shadow
          const userName = posts.children[0].children[0].children[0].children[0]
            .children[1].children[0].children[1];
          userName.style.color = 'grey';
          const textReview = posts.children[0].children[1].children[0];
          textReview.style.color = 'black';
          const btnComment = posts.children[0].children[2].children[2];
          btnComment.style.backgroundColor = 'white';
          const saveIcon = posts.children[0].children[2].children[3].children[0];
          saveIcon.style.filter = 'none';

          const allComments = document.querySelectorAll('.comment-text');
          // eslint-disable-next-line no-restricted-syntax
          for (const comments of allComments) {
            comments.style.backgroundColor = 'rgb(231, 239, 252)';
          }
        }
      }
    });
  }
  // //sectionElement.querySelector(".user-data").style.display="none"
  // sectionElement.querySelector(".sidebar-profile").style.borderTop="none"
  // //sectionElement.querySelector(".sidebar-profile").style.marginTop="3rem"
  // sectionElement.querySelector(".sidebar-review-image").src="../../img/home.png"
  // sectionElement.querySelector(".sidebar-review-image").style.width="2.5rem"
  // sectionElement.querySelector(".sidebar-review").innerText="Home"

  // const openSidebar = sectionElement.querySelector("#open-sidebar")
  // openSidebar.addEventListener("click", (e) => {
  //   e.preventDefault()
  //   const sidebar = sectionElement.querySelector("#sidebar")
  //   sidebar.style.display = "block"
  //   sidebar.classList.remove("sidebar-desktop")

  // })

  // const buttonHomeNavbar = sectionElement.querySelector("#home-navbar")
  // buttonHomeNavbar.addEventListener("click", (e) => {
  //   e.preventDefault()
  //   window.history.pushState(null, null, "/home")
  //   const popStateEvent = new PopStateEvent("popstate", {
  //     state: {}
  //   })
  //   dispatchEvent(popStateEvent)

  // })

  // const buttonProfileNavbar = sectionElement.querySelector("#profile-navbar")
  // buttonProfileNavbar.addEventListener("click", (e) => {
  //   e.preventDefault()
  //   window.scrollTo(0,0)

  // })

  const buttonAddReviewNavbar = sectionElement.querySelector('#add-review-navbar');
  buttonAddReviewNavbar.addEventListener('click', (e) => {
    e.preventDefault();
    sectionElement.innerHTML = '';
    sectionElement.appendChild(home());
    window.scrollTo(0, 0);
    showReviewArea();
    window.history.pushState(null, null, '/home');
  });

  const buttonAddReviewSidebar = sectionElement.querySelector('#add-review-sidebar');
  buttonAddReviewSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    sectionElement.innerHTML = '';
    sectionElement.appendChild(home());
    window.scrollTo(0, 0);
    showReviewArea();
    window.history.pushState(null, null, '/home');
  });

  loadPosts(getProfileReviews(currentUser().uid));

  return sectionElement;
};

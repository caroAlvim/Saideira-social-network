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
    userName = 'Usuário anônimo';
  }

  const profileTemplate = `
  <div class="profile-container">
   
    <header>
      <p class="header-home">Bookish</p>
      <span class="span-mood1">Light</span>
      <div class="noturn-mood1" data-item>
      <button class="dark-mode1" data-item="dark"></button>
      <button class ="light-mode1" data-item="light"></button>
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
    <div class="loading"></div>
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
    const sidebar = sectionElement.querySelector('#sidebar');
    sidebar.style.display = 'block';
    sidebar.classList.remove('sidebar-desktop');
  });

  const lightModeBackground = sectionElement.querySelectorAll('.noturn-mood1');
  for (const mood of lightModeBackground) {
    mood.addEventListener('click', (e) => {
      const target = e.target;
      const targetDataset = target.dataset.item;
      if (targetDataset === 'dark') {
        const lightModeBackground = sectionElement.querySelector('.noturn-mood1');
        const lightMode = sectionElement.querySelector('.light-mode1');
        const textMode = sectionElement.querySelector('.span-mood1');
        const noturnMode = sectionElement.querySelector('.dark-mode1');
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
        header.style.backgroundColor = '#313c44';
        textHeader.style.color = 'white';
        nameProfile.style.color = 'white';
        profileContent.style.backgroundColor = '#2c2c2c';

        const allPosts = document.querySelectorAll('[data-post]');
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
          for (const comments of allComments) {
            comments.style.backgroundColor = '#7694aa';
          }
        }
      }

      if (targetDataset === 'light') {
        const lightMode = sectionElement.querySelector('.light-mode1');
        const lightModeBackground = sectionElement.querySelector('.noturn-mood1');
        const textMode = sectionElement.querySelector('.span-mood1');
        const noturnMode = sectionElement.querySelector('.dark-mode1');
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
        header.style.backgroundColor = 'white';
        textHeader.style.color = 'black';
        nameProfile.style.color = '#000000';
        profileContent.style.backgroundColor = '#f0f0f0';

        const allPosts = document.querySelectorAll('[data-post]');
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

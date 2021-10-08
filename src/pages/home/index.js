import {
  currentUser, searchHashtagReviews, getReviews, searchDrinks,
} from '../../lib/index.js';
import { sidebar } from '../../components/sidebar/index.js';
import {
  showReviewArea, publishReview, loadPosts,
} from '../../lib/functions.js';
import { navbar } from '../../components/navbar/index.js';

export default () => {
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'home-content');

  const user = currentUser();

  let userName;
  let userName2;
  const userNameFirebase = user.displayName;

  if (userNameFirebase != null && userNameFirebase !== undefined) {
    userName = userNameFirebase;
    userName2 = userName.replace(/\s/g, '').toLowerCase();
  } else {
    userName = 'Usuário anônimo';
    // eslint-disable-next-line no-unused-vars
    userName2 = '';
  }

  const createFeedTemplate = `
  <div class="home-container">
   
    <header>
    <div class="logo-title">
      <img class="favicon-home" src="img/face.svg">
      <h1 class="header-home"></h1>
    </div>
      <div class="search-container">
        <input type="text" id="input-search" placeholder="Busque por bebida ou #tag">
        <button id="search"><img src="./img/search.png"></button>
      </div>
      
      <div class="dark-container">
        <div class="noturn-mood" data-item>
          <button class="dark-mode" data-item="dark"></button>
          <button class ="light-mode" data-item="light"></button>
        </div>
        <span class="span-mood">Light</span>
      </div>
      
    </header>
    <div class="timeline">
    <div class="welcome">
  
    </div>
    
    <div class="make-review">
      <p class="p-make-review">Escreva sua avaliação</p>
      <button class="button-make-review" id="add-review">+</button>
    </div>
     <form class="review-area" action="">
     
      <label class="review-label" for="book-name">Drink:</label>
      <input class="review-input" id="book-name" data-book-input type="text" placeholder="" required/>
      <label class="review-label" for="book-author"> Adicione um título</label>
      <input class="review-input" id="book-author" data-author-input type="text" placeholder="" required/>
      <label class="review-label1" for="book-edition">Anexe uma imagem</label>
      <div class="container-file-img1">
            <img src="./img/imageDrinks.png" class="file-img1">
          </div>
      <input type="file" class="file-input" id="input-profile-img" accept="image/*">
      <textarea class="post-input" id="text" cols="30" rows="5" data-post-input 
      placeholder ="Escreva sua review..."></textarea>
      <label class="review-label" for="hashtags">Adicione hashtags</label>
      <input class="review-input" id="hashtags" data-hashtags name="hashtags" type="text"  placeholder="Exemplos: #cerveja #vinho #gelada #winelover #drinks"/>
      

      
      
      <label class="review-rating">Avalie</label>
      <div class="estrelas" >
      <input type="radio" id="cm_star-empty" name="stars" value="" checked/>
      <label for="star-1" class="stars"></label>
      <input type="radio" id="star-1" data-stars-form name="stars" value="★"/>
      <label for="star-2" class="stars"></label>
      <input type="radio" id="star-2" data-stars-form name="stars" value="★★"/>
      <label for="star-3" class="stars"></label>
      <input type="radio" id="star-3" data-stars-form name="stars" value="★★★"/>
      <label for="star-4" class="stars"></label>
      <input type="radio" id="star-4" data-stars-form name="stars" value="★★★★"/>
      <label for="star-5" class="stars"></label>
      <input type="radio" id="star-5" data-stars-form name="stars" value="★★★★★"/>
    </div>
        <div class="buttons">
        <button class="button-review" data-publish-btn id="button-review">Publicar</button>
        <button class="button-review" data-cancel-btn id="button-review-cancel">Cancelar</button>
        </div>
     </form>   
    </div>
    <div  class="search-result"></div>
    <div data-all-reviews class= "all-reviews">
    
    </div>
    <div class="load">
        <div class="cup">
        </div>
        </div>
  </div>
 
    
  `;
  sectionElement.innerHTML = createFeedTemplate;

  sectionElement.append(sidebar());
  sectionElement.append(navbar());

  const photo = sectionElement.querySelector('.file-img1');
  const file = sectionElement.querySelector('.file-input');
  const textearea = sectionElement.querySelector('#text');

  photo.addEventListener('click', () => {
    file.click();
  });

  file.addEventListener('change', () => {
    textearea.style.margin = '8.5rem 0rem 0rem';
    photo.style.margin = '2rem 0rem';
    photo.style.height = '190%';
    photo.style.width = '140%';
    if (file.files.legth <= 0) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      photo.src = reader.result;
    };
    reader.readAsDataURL(file.files[0]);
  });

  const buttonAddReview = sectionElement.querySelector('#add-review');

  buttonAddReview.addEventListener('click', () => {
    showReviewArea();
  });

  const searchBtn = sectionElement.querySelector('#search');
  searchBtn.addEventListener('click', () => {
    const containerSearch = sectionElement.querySelector('.search-result');
    const hashtag = sectionElement.querySelector('#input-search').value;
    if (hashtag.charAt(0) === '#') {
      const hash = hashtag.slice(1);
      containerSearch.innerHTML = `
      <div class="quit"><img class="quit-img" src="./img/seta.png"> </div>
      <span class="result-text"> Resultados para #${hash}</span>`;
      loadPosts(searchHashtagReviews(hash));
    } else {
      const termsArray = hashtag.toLowerCase().split(' ');
      // console.log(termsArray);
      containerSearch.innerHTML = `
      <div class="quit"><img class="quit-img" src="./img/seta.png"> </div>
      <span class="result-text"> Resultados para ${hashtag}</span>`;
      loadPosts(searchDrinks(termsArray));
    }

    const quit = sectionElement.querySelector('.quit');
    quit.addEventListener('click', () => {
      containerSearch.innerHTML = '';
      loadPosts(getReviews());
    });
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
        const body = document.querySelector('body');
        const homeContent = document.querySelector('.home-content');
        const navBar = document.querySelector('.home-navbar');
        const homeNavBar = document.querySelector('#home-navbar');
        const addNavBar = document.querySelector('#add-review-navbar');
        const saveNavBar = document.querySelector('#save-navbar-img');
        const openNavBar = document.querySelector('#open-sidebar');
        const inputSearch = document.querySelector('#input-search');
        header.style.backgroundColor = '#313c44';
        textHeader.style.color = 'white';
        body.style.backgroundColor = '#2c2c2c';
        homeContent.style.backgroundColor = '#2c2c2c';
        navBar.style.backgroundColor = '#404040';
        navBar.style.borderTop = 'grey';
        homeNavBar.style.filter = 'brightness(800%) contrast(100%)';
        addNavBar.style.filter = 'brightness(800%) contrast(100%)';
        saveNavBar.style.filter = 'brightness(800%) contrast(100%)';
        openNavBar.style.filter = 'brightness(800%) contrast(100%)';
        inputSearch.style.backgroundColor = '#abc4d6';

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
        const inputSearch = document.querySelector('#input-search');
        lightModeBackground.style.backgroundColor = '#313c44';
        noturnMode.style.backgroundColor = 'white';
        noturnMode.style.opacity = '1';
        noturnMode.style.margin = '0.2rem 0rem 0rem 0.5rem';
        textMode.innerHTML = 'Light';
        textMode.style.color = 'black';
        lightMode.style.margin = '0rem 0rem 0rem 3rem';
        inputSearch.style.backgroundColor = 'white';

        const header = sectionElement.querySelector('header');
        const textHeader = sectionElement.querySelector('.header-home');
        const body = document.querySelector('body');
        const homeContent = document.querySelector('.home-content');
        const navBar = document.querySelector('.home-navbar');
        const homeNavBar = document.querySelector('#home-navbar');
        const addNavBar = document.querySelector('#add-review-navbar');
        const saveNavBar = document.querySelector('#save-navbar-img');
        const openNavBar = document.querySelector('#open-sidebar');
        header.style.backgroundColor = 'white';
        textHeader.style.color = 'black';
        body.style.backgroundColor = '#f0f0f0';
        homeContent.style.backgroundColor = '#f0f0f0';
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

  const cancelReview = sectionElement.querySelector('[data-cancel-btn]');
  cancelReview.addEventListener('click', () => {
    // sectionElement.querySelector('.review-area').style.display = 'none';
    sectionElement.querySelector('.welcome').style.display = 'flex';
    sectionElement.querySelector('.button-make-review').style.display = 'block';
    // sectionElement.querySelector('.make-review').style.display = 'linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)';
    sectionElement.querySelector('.p-make-review').style.display = 'block';
    window.history.pushState(null, null, '/home');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  const sidebarComponent = sectionElement.querySelector('#sidebar');

  const openSidebar = sectionElement.querySelector('#open-sidebar');
  openSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    sidebarComponent.style.display = 'block';
    sidebarComponent.classList.remove('sidebar-desktop');
  });

  const buttonAddReviewNavbar = sectionElement.querySelector('#add-review-navbar');
  buttonAddReviewNavbar.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    showReviewArea();
  });

  const buttonAddReviewSidebar = sectionElement.querySelector('#add-review-sidebar');
  buttonAddReviewSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    sidebarComponent.style.display = 'none'; // pra fechar o sidebar no responsivo
    window.scrollTo(0, 0);
    showReviewArea();
    sidebarComponent.style.display = 'flex';
    sidebarComponent.style.zIndex = '-1';
  });

  const createReviewBtn = sectionElement.querySelector('[data-publish-btn]');

  createReviewBtn.addEventListener('click', publishReview);

  const buttonSearchNavbar = sectionElement.querySelector('#search-navbar-btn');
  const searchNavbar = sectionElement.querySelector('.search-navbar');
  const searchBtnNav = sectionElement.querySelector('#search-nav');
  const searchInput = sectionElement.querySelector('#input-search-navbar');
  buttonSearchNavbar.addEventListener('click', (e) => {
    e.preventDefault();
    searchNavbar.style.display = 'flex';
    searchBtnNav.addEventListener('click', () => {
      searchNavbar.style.display = 'none';
      const containerSearch = document.querySelector('.search-result');
      const hashtag = searchInput.value;
      if (hashtag.charAt(0) === '#') {
        const hash = hashtag.slice(1);
        containerSearch.innerHTML = `
      <div class="quit"><img class="quit-img" src="./img/seta.png"> </div>
      <span class="result-text"> Resultados para #${hash}</span>`;
        loadPosts(searchHashtagReviews(hash));
      } else {
        const termsArray = hashtag.toLowerCase().split(' ');
        containerSearch.innerHTML = `
      <div class="quit"><img class="quit-img" src="./img/seta.png"> </div>
      <span class="result-text"> Resultados para ${hashtag}</span>`;
        loadPosts(searchDrinks(termsArray));
      }

      const quit = document.querySelector('.quit');
      quit.addEventListener('click', () => {
        containerSearch.innerHTML = '';
        loadPosts(getReviews());
      });
    });
  });

  loadPosts(getReviews());

  return sectionElement;
};

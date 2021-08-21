import { currentUser, getReviews } from '../../lib/index.js';
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
    userName2 = '';
  }

  const createFeedTemplate = `
  <div class="home-container">
   
    <header>
      <h1 class="header-home">Bookish</h1>
      <span class="span-mood">Light</span>
      <div class="noturn-mood" data-item>
      <button class="dark-mode" data-item="dark"></button>
      <button class ="light-mode" data-item="light"></button>
      </div>
      <img class="favicon-home" src="img/favicon.png">
    </header>
    <div class="timeline">
    <div class="welcome">
  
    </div>
    
    <div class="make-review">
      <p class="p-make-review">PUBLIQUE UM REVIEW</p>
      <button class="button-make-review" id="add-review">+</button>
    </div>
     <form class="review-area" action="">
     
      <label class="review-label" for="book-name">Livro:</label>
      <input class="review-input" id="book-name" data-book-input type="text" placeholder="" required/>
      <label class="review-label" for="book-author">Autor</label>
      <input class="review-input" id="book-author" data-author-input type="text" placeholder="" required/>
      <label class="review-label1" for="book-edition">Anexe a imagem da capa do livro</label>
      <div class="container-file-img1">
            <img src="./img/imagebooks.png" class="file-img1">
          </div>
      <input type="file" class="file-input" id="input-profile-img" accept="image/*">
      <textarea class="post-input" id="text" cols="30" rows="5" data-post-input placeholder ="Escreva sua review..."></textarea>
      
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
    <div data-all-reviews class= "all-reviews">
    
    </div>
    <div class="load">
    <div class="loading"></div>
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
  const lightModeBackground = sectionElement.querySelectorAll('.noturn-mood');
  for (const mood of lightModeBackground) {
    mood.addEventListener('click', (e) => {
      const target = e.target;
      const targetDataset = target.dataset.item;
      if (targetDataset === 'dark') {
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
        header.style.backgroundColor = '#313c44';
        textHeader.style.color = 'white';
        body.style.backgroundColor = '#2c2c2c';
        homeContent.style.backgroundColor = '#2c2c2c';

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
        const lightMode = sectionElement.querySelector('.light-mode');
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
        const body = document.querySelector('body');
        const homeContent = document.querySelector('.home-content');
        header.style.backgroundColor = 'white';
        textHeader.style.color = 'black';
        body.style.backgroundColor = '#f0f0f0';
        homeContent.style.backgroundColor = '#f0f0f0';

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

  const cancelReview = sectionElement.querySelector('[data-cancel-btn]');
  cancelReview.addEventListener('click', () => {
    sectionElement.querySelector('.review-area').style.display = 'none';
    sectionElement.querySelector('.welcome').style.display = 'flex';
    sectionElement.querySelector('.button-make-review').style.display = 'block';
    sectionElement.querySelector('.make-review').style.background = 'linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)';
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

  loadPosts(getReviews());

  return sectionElement;
};

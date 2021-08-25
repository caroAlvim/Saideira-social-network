import {
  currentUser,
  getProfileReviews,
  logout,
} from '../../lib/index.js';

export const sidebar = () => {
  const asideElement = document.createElement('aside');

  asideElement.classList.add('sidebar');
  asideElement.classList.add('sidebar-desktop');
  asideElement.classList.add('mobile-menu');
  asideElement.setAttribute('id', 'sidebar');

  const user = currentUser();
  const imageUrl = user.photoURL;
  let profileImg;

  if (imageUrl != null) {
    profileImg = user.photoURL;
  } else {
    profileImg = './img/default-img.png';
  }

  let userName;
  let userName2;
  const userNameFirebase = user.displayName;

  if (userNameFirebase != null && userNameFirebase !== undefined) {
    userName = userNameFirebase;
    userName2 = `@${userName.replace(/\s/g, '').toLowerCase()}`;
  } else {
    userName = 'Usuário anônimo';
    userName2 = '';
  }

  const sidebarTemplate = `
  <nav>
  <div class="sidebar-container">
    <button class="close-mobile-sidebar" id="close-mobile-sidebar">x</button>
    <section class="user-data">
    
      <img src="${profileImg}"   class="sidebar-user-img"/>
      <a href="" class="sidebar-link" id="edit-profile-link">editar</a>
      <div class="user-information">
        <div class="user-more-gif">
        <h3 class="sidebar-user-name sidebar-text user-name">${userName}</h3>
        <!--<img class="gif-cheers" src="https://ik.imagekit.io/dqzqulyog87g/cheers_aXnV3uBaSA2.gif?updatedAt=1629885304890" alt="gif cerveja">-->
        </div>
        <p class="sidebar-user sidebar-text">${userName2}</p>
      </div>
  
    </section>
  
    
    <section class="sidebar-profile">
      <div class="sidebar-line review-line">
        <p class="sidebar-text">Publicações</p>
        <div class="num"><p class="num-text" id="num-reviews"></p></div>
      </div>
  
      <section class="sidebar-tools sidebar-add-review">
      <button href="" class="sidebar-btn sidebar-btn-mobile" id="add-review-sidebar">
        <div class="sidebar-div-links">
          <img class="sidebar-review-image" src="../../img/add.png" alt="">
          <p class="sidebar-text sidebar-review" >Adicionar publicação</p>
        </div>
      </button>
    </section>
  
    <section class="sidebar-tools">
      <button class="sidebar-btn">
        <div class="sidebar-div-links">
          <img src="./img/profile-navbar.png" class="menu-img-sidebar"/>
          <p class="sidebar-text" id="profile-sidebar">Perfil</p>
        </div>
      </button>
    </section>
  
    <section class="sidebar-tools sidebar-saved">
      <button href="" id="saved-btn-sidebar" class="sidebar-btn sidebar-btn-mobile">
        <div class="sidebar-div-links">
            <img src="../../img/save.png" alt="" class="save-sidebar">
            <p class="sidebar-text" id="save-sidebar-text" >Salvos</p>
        </div>
      </button>
    </section>
  
    <section class="sidebar-tools sidebar-logout" id="sidebar-logout">
      <button class="sidebar-btn" id="logout-btn-sidebar"> 
        <div class="sidebar-div-links" >
          <img src="../../img/logout-white.png" alt="" id="sidebar-img-logout">
          <p class="sidebar-logout sidebar-text"">Sair</p>
        </div>
      </button>
    </section>
  </div>
  </nav>
`;

  getProfileReviews(currentUser().uid)
    .then((snap) => {
      const size = snap.size;
      asideElement.querySelector('#num-reviews').innerText = size;
    });
  // .catch((error) => {
  //   console.log('Error getting documents: ', error);
  // });

  asideElement.innerHTML = sidebarTemplate;

  const logoutBtn = asideElement.querySelector('#logout-btn-sidebar');
  const editProfileLink = asideElement.querySelector('#edit-profile-link');
  const savedBtnSidebar = asideElement.querySelector('#saved-btn-sidebar');
  const profileSidebar = asideElement.querySelector('#profile-sidebar');
  const profileSideBar = asideElement.querySelector('.menu-img-sidebar');

  profileSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/perfil');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  profileSideBar.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/perfil');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  editProfileLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/editar-perfil');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    window.history.pushState(null, null, '/login');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  savedBtnSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/salvos');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  const closeBtn = asideElement.querySelector('#close-mobile-sidebar');
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const sidebarElement = document.querySelector('.mobile-menu');
    sidebarElement.style.display = 'none';
  });

  return asideElement;
};

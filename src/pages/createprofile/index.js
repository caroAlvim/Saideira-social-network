/* eslint-disable no-shadow */
import {
  currentUser,
  uploadImage,
  updateUserImage,
  updateUserName,
} from '../../lib/index.js';
import {
  errorInput,
} from '../../error.js';

export default () => {
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('id', 'create-profile');
  sectionElement.setAttribute('class', 'form-page');

  const createProfileTemplate = `  
  <button class=" back-to-login" id="back-to-login-fp">← Voltar</button>
    <div  class="form-container container-center" id="form-create-profile">
      <h1 class="h1-login">Editar perfil</h1>
      <fieldset class=" fieldset fieldset-create-profile">
        <form class="form-cp"  action="">
          <div class="container-file-img">
            <img src="./img/camera.png" class="file-img">
          </div>
          <input type="file" class="file-input" id="input-profile-img" accept="image/*">
          <input type="text" placeholder="Nome de usuário" class="form-input" id="input-username" required>
          <button type="button"id="send-profile" class="btn">Editar</button>
        </form>
      </fieldset>
    </div>
    <div class="load1">
    <div class="cup1">
    </div>
        </div>
        <div class="load">
        <div class="cup">
        </div>
        </div>
  </div>
  `;

  sectionElement.innerHTML = createProfileTemplate;

  const photo = sectionElement.querySelector('.file-img');
  const file = sectionElement.querySelector('.file-input');
  const userNameInput = sectionElement.querySelector('#input-username');

  const backToLogin = sectionElement.querySelector('#back-to-login-fp');
  backToLogin.addEventListener('click', () => {
    window.history.pushState(null, null, '/home');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    dispatchEvent(popStateEvent);
  });

  const user = currentUser();
  const name = currentUser().displayName;
  const photoLink = currentUser().photoURL;

  if (name != null) {
    userNameInput.value = name;
  }

  if (photoLink != null) {
    photo.src = photoLink;
    photo.style.borderRadius = '50%';
  }

  photo.addEventListener('click', () => {
    file.click();
  });

  file.addEventListener('change', () => {
    photo.style.borderRadius = '50%';
    if (file.files.legth <= 0) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      photo.src = reader.result;
    };
    reader.readAsDataURL(file.files[0]);
  });

  const sendProfileBtn = sectionElement.querySelector('#send-profile');
  sendProfileBtn.addEventListener('click', () => {
    const userNameInput = sectionElement.querySelector('#input-username');
    const userName = userNameInput.value;
    const image = document.getElementById('input-profile-img').files[0];
    const userId = user.uid;

    if (userName === '') {
      const text = 'Escolha um nome de usuário';
      errorInput(text, userNameInput);
    } else if (image === undefined) {
      updateUserName(userName);

      setTimeout(() => {
        window.history.pushState(null, null, '/home');
        const popStateEvent = new PopStateEvent('popstate', {
          state: {},
        });
        dispatchEvent(popStateEvent);
      }, 1000);
    } else {
      uploadImage('input-profile-img', `${userId}`)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          const urlImage = url;
          return urlImage;
        })
        .then((urlImage) => {
          updateUserName(userName);
          updateUserImage(urlImage);
        })
        .then(() => {
          setTimeout(() => {
            window.history.pushState(null, null, '/home');
            const popStateEvent = new PopStateEvent('popstate', {
              state: {},
            });
            dispatchEvent(popStateEvent);
          },
            1000);
        });
      // .catch((error) => {
      //   console.log('Error writing documents: ', error);
      sectionElement.querySelector('.load1').style.display = 'block';
    }
    sectionElement.querySelector('.load1').style.display = 'block';
  });
  return sectionElement;
};

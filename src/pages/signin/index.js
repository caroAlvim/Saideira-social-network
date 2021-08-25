import { loginPage, signInGoogleAccount } from '../../lib/index.js';
import { errorInput, errorPassword } from '../../error.js';

export default () => {
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('id', 'signin-page');
  sectionElement.setAttribute('class', 'form-page');

  const signInTemplate = `
  <div  class="form-container" id="form-sign-in">
    <h1 class="h1-login">Login</h1>
    <fieldset class="fieldset-sign-in fieldset">
      <form class="form" action="">
        <input class="form-input" type="email" placeholder="Email" id="login-email" 
        required/>
        <input class="form-input"  type="password" id="login-password" 
        placeholder="Senha" required/>
        <p class="forget-password" id="text-forgot-password">Esqueceu sua senha?</p>
        <button type="button" class="btn" id="enter">Entrar</button>
        <p class="p-sign-in">Não tem uma conta? <a href=""
         class="forget-password-link" id="signup-link">Cadastre-se</a></p>    
        <p class="or">OU</p>
        <button class="btn gmail-btn" type="button" id="gmail-btn">
        <img class="logo-google" src="./img/logogoogle.png" 
        class="logo-google"/>Entre com uma conta Google</button>
      </form>
    </fieldset>
  </div>
  <footer class="footer">
      <p class="p-footer">copyright@2021 | feito por
      
        <a class="a-1"href="https://github.com/bruna-devbio" target="blank">Bruna Calixto</a>,
        <a class="a-2"href="https://github.com/caroAlvim" target="bla">Carolina Alvim</a>,
        <a class="a-3"href="https://github.com/karen-freitas" target="new">Karen Freitas</a>,
        <a class="a-4"href="https://github.com/LarissaSiq" target="newblew">Larissa Siqueira</a>
        e
        <a class="a-5" href="https://github.com/leticia-aniceto" target="neblank">Letícia Aniceto</a>
      </p>
    </footer>
  
    <div class="load1">
    <div class="loading">
    <img class ="gif-load" src="./img/gif-teste.gif"/>
    </div>
    </div>
  `;

  sectionElement.innerHTML = signInTemplate;
  const enterLogin = sectionElement.querySelector('#enter');
  const loginWithGoogle = sectionElement.querySelector('#gmail-btn');

  const signUpLink = sectionElement.querySelector('#signup-link');
  signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/cadastro');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });
  const forgotPassword = sectionElement.querySelector('#text-forgot-password');
  forgotPassword.addEventListener('click', () => {
    window.history.pushState(null, null, '/recuperacao-senha');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  enterLogin.addEventListener('click', () => {
    let text;
    const emailInput = sectionElement.querySelector('#login-email');
    const passwordInput = sectionElement.querySelector('#login-password');
    const email = emailInput.value;
    const password = passwordInput.value;
    loginPage(email, password)
      .then(() => {
        setTimeout(() => {
          const load = sectionElement.querySelector('.load1');
          load.style.display = 'block';
        }, 2000);
        window.history.pushState(null, null, '/home');
        const popStateEvent = new PopStateEvent('popstate', { state: {} });
        dispatchEvent(popStateEvent);
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            text = 'Usuário não encontrado';
            errorInput(text, emailInput);
            break;

          case 'auth/wrong-password':
            text = 'Senha inválida';
            errorPassword(text, passwordInput);
            break;

          case 'auth/invalid-email':
            text = 'E-mail inválido';
            errorInput(text, emailInput);
            break;

          default:
          // alert(error.message);
        }
      });
  });

  loginWithGoogle.addEventListener('click', () => {
    signInGoogleAccount()
      .then(() => {
        window.history.pushState(null, null, '/home');
        const popStateEvent = new PopStateEvent('popstate', { state: {} });
        dispatchEvent(popStateEvent);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          // alert('E-mail invalido');
        } else {
          // alert(error.message);
        }
      });
  });

  return sectionElement;
};
import { forgotPassword } from '../../lib/index.js';
import { errorInput } from '../../error.js';

export default () => {
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('id', 'forgot-password');

  const pageForgotPassword = `
  <div class="container-logo-mobile2"><img class="logo-mobile-reset" src="./img/saideira-transparent.png"/></div>
  <button class=" back-to-login" id="back-to-login-fp">← Voltar</button>
   <div class="form-container" id="form-container-forgot-password">
      <h1 class="h1">Esqueceu sua senha?</h1>
      <fieldset class="fieldset-forgot-password fieldset">
        <form class="form-fp"  action="">
          <input type="text" placeholder="Email" class="form-input" id="none"/>
          <input type="email" placeholder="Email" class="form-input" id="input-email"/>
          <button type="button" id="send-forgot-password" class="btn">Recuperar Senha</button>
        </form>
      </fieldset>
    </div>
    
  `;
  sectionElement.innerHTML = pageForgotPassword;

  const btnResetPassword = sectionElement.querySelector('#send-forgot-password');
  btnResetPassword.addEventListener('click', (e) => {
    e.preventDefault();
    let text;
    const emailValue = sectionElement.querySelector('#input-email');
    const email = emailValue.value;
    forgotPassword(email)
      .then(() => {
        sectionElement.querySelector('#form-container-forgot-password').style.backgroundColor = "#ffffff00";
        sectionElement.querySelector('#form-container-forgot-password').innerHTML = `
        <div class="content">
            <img src="img/sucessful.png" class="check"/>
            <h1 class="h1-fp">A redefinição de senha foi enviada para o seu e-mail</h1>
        </div>
        `;
        setTimeout(() => {
          window.history.pushState(null, null, '/login');
          const popStateEvent = new PopStateEvent('popstate', { state: {} });
          dispatchEvent(popStateEvent);
        }, 2500);
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            text = 'Usuário não encontrado';
            errorInput(text, emailValue);
            break;

          case 'auth/invalid-email':
            text = 'E-mail inválido';
            errorInput(text, emailValue);
            break;

          default:
          // alert(error.message);
        }
      });
  });
  const backToLogin = sectionElement.querySelector('#back-to-login-fp');
  backToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/login');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  return sectionElement;
};
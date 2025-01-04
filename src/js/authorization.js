import { BACKEND, router, render } from './index';
import { getToken } from './api';

export default function authorization() {
  const authoRization = document.createElement('section');
  authoRization.classList.add('authorization');
  const container = document.createElement('div');
  container.classList.add('container', 'authorization__container');
  const autoWrap = document.createElement('div');
  autoWrap.classList.add('authorization__wrap');
  const form = document.createElement('form');
  form.classList.add('authorization__form');
  form.action = '/';
  const title = document.createElement('h1');
  title.classList.add('authorization__title');
  title.textContent = 'Вход в аккаунт';
  const labelLogin = document.createElement('label');
  labelLogin.classList.add('authorization__label', 'authorization__label--one', 'label');
  const labelPass = document.createElement('label');
  labelPass.classList.add('authorization__label', 'authorization__label--two', 'label');
  const labelBtn = document.createElement('label');
  labelBtn.classList.add('authorization__label', 'authorization__label--btn', 'label');
  const spanLogin = document.createElement('span');
  spanLogin.classList.add('label__title');
  spanLogin.textContent = 'Логин';
  const spanPass = document.createElement('span');
  spanPass.classList.add('label__title');
  spanPass.textContent = 'Пароль';
  const inputLogin = document.createElement('input');
  inputLogin.type = 'text';
  inputLogin.name = 'login';
  inputLogin.classList.add('authorization__input');
  inputLogin.placeholder = 'login';
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.name = 'pass';
  inputPassword.classList.add('authorization__input');
  inputPassword.placeholder = 'password';
  const inputSubmit = document.createElement('input');
  inputSubmit.classList.add('authorization__btn');
  inputSubmit.type = 'submit';
  inputSubmit.name = 'btn';
  inputSubmit.value = 'Войти';
  authoRization.append(container);
  container.append(autoWrap);
  autoWrap.append(form);
  form.append(title);
  form.append(labelLogin);
  labelLogin.append(spanLogin);
  labelLogin.append(inputLogin);
  form.append(labelPass);
  labelPass.append(spanPass);
  labelPass.append(inputPassword);
  form.append(labelBtn);
  labelBtn.append(inputSubmit);
  const errPass = document.createElement('span');
  errPass.classList.add('authorization__err');
  labelPass.after(errPass);
  const errLogin = document.createElement('span');
  errLogin.classList.add('authorization__err');
  labelLogin.after(errLogin);
  const strSearch = ' ';

  if ((localStorage.getItem('auth_token_skillbox') != null && window.location.pathname === '/')) {
    router.navigate('/account');
  }

  inputLogin.addEventListener('input', (e) => {
    e.preventDefault();
    errLogin.innerHTML = '';
  });

  inputLogin.addEventListener('keypress', (e) => {
    if (strSearch.includes(e.key)) {
      errLogin.textContent = 'Пробелы не допустимы';
      e.preventDefault();
    }
  });

  inputPassword.addEventListener('input', (e) => {
    e.preventDefault();
    errPass.innerHTML = '';
  });

  inputPassword.addEventListener('keypress', (e) => {
    if (strSearch.includes(e.key)) {
      errPass.textContent = 'Пробелы не допустимы';
      e.preventDefault();
    }
  });

  inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    if (inputLogin.value === '' || inputPassword.value === '' || inputLogin.value.length < 6 || inputPassword.value.length < 6) {
      if (inputLogin.value === '') {
        errLogin.textContent = 'Логин не должен быть пустым';
      }
      if (inputLogin.value.length < 6 && inputLogin.value !== '') {
        errLogin.textContent = 'Логин не должен быть менее 6 символов';
      }
      if (inputPassword.value === '') {
        errPass.textContent = 'Пароль не должен быть пустым';
      }
      if (inputPassword.value.length < 6 && inputPassword.value !== '') {
        errPass.textContent = 'Пароль не должен быть менее 6 символов';
      }
    } else {
      getToken(inputLogin.value, inputPassword.value, BACKEND).then((response) => {
        if (!response.payload) {
          if (response.error) {
            switch (response.error) {
              case ('Invalid password'):
                errPass.textContent = 'Пароль введен неверно';

                break;
              case ('No such user'):
                errLogin.textContent = 'Логин введен неверно';
                break;
              default:
                break;
            }
          }
        } else if (response.payload) {
          inputLogin.value = '';
          const TOKEN_KEY = 'auth_token_skillbox';
          localStorage.setItem(
            TOKEN_KEY,
            JSON.stringify({
              token: response.payload.token,
            }),
          );
          router.navigate('/account');
          render();
        }
      });
    }
  });

  return {
    authoRization,
  };
}

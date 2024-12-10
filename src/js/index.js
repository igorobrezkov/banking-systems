import Navigo from 'navigo';

import '../css/_fonts.scss';
import '../css/_normalize.scss';
import '../css/_variables.scss';

import '../css/style.scss';

import createHeader from './header';
import navigation from './nav';
import authorization from './authorization';

import accountBank from './account';

import atams from './atams';
import scoreDetail from './score';

export const router = new Navigo('/', '/account');

export const BACKEND = 'http://localhost:3000/';
const header = createHeader();
const main = document.createElement('main');
const forma = authorization();
const menu = navigation();

document.body.append(main);

export function render() {
  function removeActive() {
    menu.link.forEach((item) => {
      if (item.classList.contains('header__link--active')) {
        item.classList.remove('header__link--active');
      }
    });
  }

  if ((localStorage.getItem('auth_token_skillbox') != null)) {
    if (forma.authoRization) {
      forma.authoRization.remove();
    }
    menu.active.classList.add('header__link--active');
    for (let i = 0; i < menu.link.length; i++) {
      menu.link[i].addEventListener('click', (event) => {
        event.preventDefault();
        removeActive();
        router.navigate(event.target.getAttribute('href'));
        if (event.target.getAttribute('href') === window.location.pathname) {
          menu.link[i].classList.add('header__link--active');
        }
      });
    }
    header.container.append(menu.nav);
    const linkExit = document.querySelector('[data-exit=true]');

    linkExit.addEventListener('click', (e) => {
      e.preventDefault();

      localStorage.removeItem('auth_token_skillbox');
      router.navigate('/');
      removeActive();
      render();
    });

    router.on('/:id', ({ data: { id } }) => {
      switch (id) {
        case 'account':
          main.replaceChildren();
          main.append(accountBank().accountLk);
          break;
        case 'atams':
          main.replaceChildren();
          main.append(atams());
          break;
        default:
          break;
      }
    });

    router.on('/', () => {
      main.replaceChildren();
    });

    router.notFound(() => {
      console.log('notFound');
      // вызывается, когда указан путь, но
      // нет соответствующего маршрута
    });

    router.on('/account/:id', ({ data: { id } }) => {
      main.replaceChildren();
      main.append(scoreDetail().score);
    });

    router.resolve();
  } else {
    if (menu.nav) {
      menu.nav.remove();
    }

    main.append(forma.authoRization);
  }
}

render();

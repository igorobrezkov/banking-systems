import Navigo from 'navigo';

import '../css/_fonts.scss';

import '../css/_normalize.scss';
import '../css/_variables.scss';

import '../css/style.scss';

import createHeader from './header';
import navigation from './nav';
import authorization from './authorization';
import createHistory from './history';

// import { getScore, sendScore } from './api';
import accountBank from './account';
import atams from './atams';
import carrencyCreate from './currency';
import scoreDetail, {
  startScore, chart, buttonScore,
} from './score';

export const router = new Navigo('/');
export const BACKEND = 'http://localhost:3000/';

const header = createHeader();
export const main = document.createElement('main');
const forma = authorization();
const menu = navigation();

document.body.append(main);

// localStorage.removeItem('autodop');
// localStorage.removeItem('auth_token_skillbox');

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
          if (chart) {
            chart.destroy();
          }
          break;
        case 'atams':
          main.replaceChildren();
          main.append(atams());
          if (chart) {
            chart.destroy();
          }
          break;
        case 'currency':
          main.replaceChildren();
          main.append(carrencyCreate().carrency);
          if (chart) {
            chart.destroy();
          }
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
    });

    router.on('/account/:id', ({ data: { id } }) => {
      main.replaceChildren();
      if ((localStorage.getItem('auth_token_skillbox') != null)) {
        buttonScore.id = id;
        startScore(id);
        main.append(scoreDetail().score);
        const transaction = createHistory(id);
        main.append(transaction.history);
      }
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

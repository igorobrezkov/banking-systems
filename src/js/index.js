import Navigo from 'navigo';

import '../css/_fonts.scss';
import '../css/_normalize.scss';
import '../css/_variables.scss';

import '../css/style.scss';

import Chart from 'chart.js/auto';
import createHeader from './header';
import navigation from './nav';
import authorization from './authorization';

import { getScore, sendScore } from './api';
import accountBank from './account';
import atams from './atams';
import scoreDetail, {
  scoreNumber, balanceNumber, buttonScore, numberScore, summScore, arrDop, updateLS, ctx, minBalance, maxBalance,
} from './score';

export const router = new Navigo('/', '/account');
export const BACKEND = 'http://localhost:3000/';
let chart = null;
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
      // scoreNumber.id = `send${id}`;
      main.replaceChildren();

      if ((localStorage.getItem('auth_token_skillbox') != null)) {
        const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
        function startScore() {
          getScore(user.token, BACKEND, id).then((data) => {
            console.log(`balance: ${data.payload.balance}`);
            function getArrSortTransiction(arr) {
              const arrCopy = [...arr];
              return arrCopy.sort((a, b) => {
                if (a.date < b.date) {
                  return -1;
                }
              });
            }
            scoreNumber.textContent = `№ ${id}`;
            balanceNumber.textContent = `${data.payload.balance} ₽`;

            const arrMonth = [];

            const arr = data.payload.transactions;

            const arrSort = getArrSortTransiction(arr).reverse();
            let month = '';
            if (arrSort[0]) {
              month = new Date(arrSort[0].date).getUTCMonth() + 1;
            }

            let summ = data.payload.balance;

            let i = 0;

            while (i < arrSort.length && (arrMonth.length < 6)) {
              if (i === 0) {
                arrMonth.push({
                  month: new Date(arrSort[0].date).getUTCMonth() + 1, balance: summ,
                });
              }

              if (month !== new Date(arrSort[i].date).getUTCMonth() + 1) {
                arrMonth.push({
                  month: new Date(arrSort[i].date).getUTCMonth() + 1, balance: summ,
                });
                month = new Date(arrSort[i].date).getUTCMonth() + 1;
              }
              if (arrSort[i].from !== data.payload.account) {
                summ -= arrSort[i].amount;
              } if (arrSort[i].from == data.payload.account) {
                summ += arrSort[i].amount;
              }

              i++;
            }

            console.log(arrSort);

            function getMonth(arr) {
              const arrMonthDesc = ['янв', 'фев', 'мар', 'апр', 'мар', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек'];
              const arrMonthS = [];
              if (arr.length > 0) {
                arr.forEach((item) => {
                  arrMonthS.push(arrMonthDesc[item.month - 1]);
                });
              }
              return arrMonthS.reverse();
            }

            function getBalance(arr) {
              const arrMonthb = [];
              if (arr.length > 0) {
                arr.forEach((item) => {
                  arrMonthb.push(item.balance);
                });
              }
              return arrMonthb.reverse();
            }

            minBalance.innerHTML = '0&nbsp;₽';
            maxBalance.innerHTML = `${Math.max.apply(null, getBalance(arrMonth))}&nbsp;₽`;

            console.log(getMonth(arrMonth));
            console.log(getBalance(arrMonth));

            if (chart) {
              chart.destroy();
            }

            chart = new Chart(ctx, {
              type: 'bar',
              title: {
                display: false,
              },
              data: {
                labels: getMonth(arrMonth),
                datasets: [{
                  label: '11',
                  data: getBalance(arrMonth),
                  borderWidth: 0,
                  backgroundColor: '#116ACC',
                }],
              },

              options: {
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                  },
                },
              },
            });
          });
          ctx.remove();
          buttonScore.addEventListener('click', send);
        }
        startScore();

        function send(e) {
          e.preventDefault();

          if (chart) {
            chart.destroy();
          }

          sendScore(user.token, BACKEND, id, numberScore.value, summScore.value).then((data) => {
            if (data.payload && numberScore.value != '' && summScore.value != '') {
              if (!arrDop.includes(numberScore.value)) {
                arrDop.push(numberScore.value);
                updateLS();
              }
              const key = 'autodop';
              localStorage.setItem(
                key,
                JSON.stringify({
                  arrDop,
                }),
              );
              numberScore.value = '';
              summScore.value = '';
              buttonScore.removeEventListener('click', send);
              main.replaceChildren();
              startScore();
              main.append(scoreDetail().score);
            }
          });
        }

        main.append(scoreDetail().score);
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

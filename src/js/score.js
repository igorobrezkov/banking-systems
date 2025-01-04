import { BACKEND, router, main } from '.';
import { getScore, sendScore } from './api';
import {
  createChart, getBalance, createChartTransaction, chart2, chart3,
} from './chart';
import { getArrMonth, getArrMonthFull } from './transaction';
import createHistory, { removeHistory, wraperHistory } from './history';

export const scoreNumber = document.createElement('span');
export const balanceNumber = document.createElement('span');
export const numberScore = document.createElement('input');
export const summScore = document.createElement('input');
export const buttonScore = document.createElement('button');
export const arrDop = [];
export const minBalance = document.createElement('span');
export const maxBalance = document.createElement('span');
export const chart = null;
export let chartCreate = null;
const ctx = document.createElement('canvas');
const ctx2 = document.createElement('canvas');
const ctx3 = document.createElement('canvas');
const errScore = document.createElement('span');

let user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
let idscore = null;

let cardsData = null;
const auto = document.createElement('div');
const ul = document.createElement('ul');
const arrBtn = [];
let currentUrl = window.location.href;

function addHundlerBtn(token, id) {
  let errValue = '';
  if (numberScore.value === '' || summScore.value === '' || summScore.value <= 0) {
    if (numberScore.value === '' || summScore.value === '') {
      if (numberScore.value === '') {
        errValue += 'Номер карты не должен быть пустым ';
      }
      if (summScore.value === '') {
        errValue += 'Сумма карты не должена быть пустой ';
      }
    } else if (summScore.value <= 0) {
      errValue += 'Сумма карты не должена быть меньше или равной 0 ';
    }
    errScore.textContent = errValue;
  } else {
    sendScore(token, BACKEND, id, numberScore.value, summScore.value).then((data) => {
      console.log(data);
      if (data.payload === null) {
        if (data.error) {
          if (data.error === 'Invalid account to') {
            errValue += `Номера счета: ${numberScore.value} не существует`;
            errScore.textContent = errValue;
          }
        }
      } else if (data.payload) {
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
        errScore.textContent = '';
        ul.replaceChildren();

        buttonScore.removeEventListener('click', addHundlerBtn);
        main.replaceChildren();
        startScore(id);
        main.append(scoreDetail().score);
        const transaction = createHistory(id);
        main.append(transaction.history);
      }
    });
  }
}

numberScore.addEventListener('input', (e) => {
  e.preventDefault();
  errScore.textContent = '';
});

summScore.addEventListener('input', (e) => {
  e.preventDefault();
  errScore.textContent = '';
});

buttonScore.addEventListener('click', (e) => {
  e.preventDefault();
  arrBtn.length = 0;
  arrBtn.push(e.target);
  addHundlerBtn(user.token, arrBtn[0].id);
});
export function updateLS() {
  if (localStorage.getItem('autodop') != null) {
    const ls = JSON.parse(localStorage.getItem('autodop'));
    window.localStorage.removeItem('autodop');

    if (ls != null) {
      if (ls.arrDop.length > 0) {
        ls.arrDop.forEach((item) => {
          if (!arrDop.includes(item)) {
            arrDop.push(item);
          }
        });
      }
      const key = 'autodop';
      localStorage.setItem(
        key,
        JSON.stringify({
          arrDop,
        }),
      );
    }
  }
  function createAutoDop(arr) {
    ul.replaceChildren();
    if (arr.length > 0) {
      arr.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.classList.add('score__new-item');
        li.addEventListener('click', () => {
          numberScore.value = item;
          ul.replaceChildren();
        });
        ul.append(li);
      });
      auto.append(ul);
    }
  }
  if (arrDop.length > 0) {
    numberScore.addEventListener('input', () => {
      const res = arrDop.filter((item) => item.startsWith(numberScore.value) && numberScore.value !== '');
      createAutoDop(res);
    });
  }
}

updateLS();

export default function scoreDetail() {
  errScore.textContent = '';
  ul.replaceChildren();
  buttonScore.addEventListener('click', addHundlerBtn);
  const score = document.createElement('section');
  score.classList.add('score');
  const container = document.createElement('div');
  container.classList.add('container', 'score__container');
  const wrap = document.createElement('div');
  wrap.classList.add('score__wrapper');

  const title = document.createElement('h1');
  title.classList.add('score__title');
  title.textContent = 'Просмотр счёта ';

  scoreNumber.classList.add('score__number');

  const leftWrap = document.createElement('div');
  leftWrap.classList.add('score__wrap-left');

  const righttWrap = document.createElement('div');
  righttWrap.classList.add('score__wrap-right');
  const button = document.createElement('button');
  button.classList.add('score__btn');
  button.textContent = 'Вернуться назад';

  button.addEventListener('click', backHandler);
  function backHandler(e) {
    e.preventDefault();
    router.navigate('/account');
    numberScore.value = '';
    summScore.value = '';
  }

  const balance = document.createElement('span');
  balance.classList.add('score__balance');
  balance.textContent = 'Баланс';

  const wrapBalance = document.createElement('div');
  wrapBalance.classList.add('score__wrap-balance');

  balanceNumber.classList.add('score__balance-number');

  const wrapLeft = document.createElement('div');
  wrapLeft.classList.add('score__new-wrapper');

  const NewTransaction = document.createElement('div');
  NewTransaction.classList.add('score__new-wrap');
  const titleNew = document.createElement('h2');
  titleNew.classList.add('score__new-title');
  titleNew.textContent = 'Новый перевод';
  const label1 = document.createElement('label');
  label1.classList.add('score__new-label1');
  label1.textContent = 'Номер счёта получателя';

  numberScore.classList.add('score__new-input');
  numberScore.type = 'number';
  numberScore.placeholder = 'номер счета';

  summScore.classList.add('score__new-input');
  summScore.type = 'number';
  summScore.placeholder = 'сумма перевода';

  const wrapInput = document.createElement('div');
  wrapInput.classList.add('score__new-input-wrap');

  const label2 = document.createElement('label');
  label2.classList.add('score__new-label2');
  label2.textContent = 'Сумма перевода';

  auto.classList.add('score__new-auto');

  errScore.classList.add('score__error');

  auto.prepend(errScore);

  ul.classList.add('score__new-list');

  buttonScore.classList.add('score__new-btn');
  buttonScore.textContent = 'Отправить';

  const balanceScore = document.createElement('div');
  balanceScore.classList.add('score__new-balance');
  ctx.classList.add('score__new-canvas');

  const balanceMeaning = document.createElement('div');
  balanceMeaning.classList.add('score__new-meanong');

  minBalance.classList.add('score__new-min');
  maxBalance.classList.add('score__new-max');

  const newWrapBalance = document.createElement('div');
  newWrapBalance.classList.add('score__new-balance-wrap');

  const titleBalance = document.createElement('div');
  titleBalance.classList.add('score__new-balance-title');
  titleBalance.textContent = 'Динамика баланса';

  const wrapDinamic = document.createElement('div');
  wrapDinamic.classList.add('score__new-dinamic-wrap');

  score.append(container);
  container.append(wrap);
  wrap.append(leftWrap);
  leftWrap.append(title);
  leftWrap.append(scoreNumber);

  wrap.append(righttWrap);
  righttWrap.append(button);
  righttWrap.append(wrapBalance);
  wrapBalance.append(balance);
  wrapBalance.append(balanceNumber);

  container.append(wrapLeft);
  wrapLeft.append(NewTransaction);

  NewTransaction.append(titleNew);
  NewTransaction.append(wrapInput);
  wrapInput.append(label1);
  label1.append(auto);
  auto.append(numberScore);
  wrapInput.append(label2);
  label2.append(summScore);
  NewTransaction.append(buttonScore);

  wrapLeft.append(newWrapBalance);

  function remnewWrapBalance() {
    newWrapBalance.remove();
  }

  newWrapBalance.append(titleBalance);
  newWrapBalance.append(wrapDinamic);

  wrapDinamic.append(balanceScore);

  balanceScore.append(ctx);
  wrapDinamic.append(balanceMeaning);
  balanceMeaning.append(maxBalance);
  balanceMeaning.append(minBalance);

  function datailBalance(e) {
    e.preventDefault();
    chartCreate = true;

    button.addEventListener('click', backHandlerScore);
    function backHandlerScore(e) {
      e.preventDefault();

      if (idscore !== null) {
        router.navigate(`/account/${idscore}`);

        removeHistory();
        //  const prev = document.querySelectorAll('.pagination__btn');
        chartCreate = null;
      }
    }

    wrapLeft.replaceChildren();
    title.textContent = 'История баланса';
    wrapLeft.style = 'flex-direction: column; gap: 50px 0;';
    wrapLeft.append(newWrapBalance);
    newWrapBalance.append(titleBalance);
    newWrapBalance.append(wrapDinamic);

    wrapDinamic.append(balanceScore);
    wrapDinamic.style = 'flex-direction: row-reverse;';

    const newWrapBalance2 = document.createElement('div');
    newWrapBalance2.classList.add('score__new-balance-wrap');
    const titleBalance2 = document.createElement('div');
    titleBalance2.classList.add('score__new-balance-title');
    titleBalance2.textContent = 'Соотношение входящих исходящих транзакций';
    const wrapDinamic2 = document.createElement('div');
    wrapDinamic2.classList.add('score__new-dinamic-wrap');

    const balanceScore2 = document.createElement('div');
    balanceScore2.classList.add('score__new-balance');

    const balanceMeaning2 = document.createElement('div');
    balanceMeaning2.classList.add('score__new-meanong');

    const minBalance2 = document.createElement('span');
    const middleBalance = document.createElement('span');
    const maxBalance2 = document.createElement('span');

    minBalance2.classList.add('score__new-min');

    middleBalance.classList.add('score__new-middle');
    maxBalance2.classList.add('score__new-max');
    ctx3.classList.add('score__new-canvas');

    wrapLeft.append(newWrapBalance2);
    newWrapBalance2.append(titleBalance2);
    newWrapBalance2.append(wrapDinamic2);
    wrapDinamic2.append(balanceMeaning2);
    wrapDinamic2.append(balanceScore2);
    wrapDinamic2.append(balanceMeaning2);

    startScore(idscore);

    if (chart2) {
      chart2.destroy();
    }
    if (chart3) {
      chart3.destroy();
    }

    balanceScore.append(ctx2);
    const arrMonth = getArrMonth(cardsData, 12);

    createChart(arrMonth, ctx2, true);

    balanceScore2.append(ctx3);
    createChartTransaction(arrMonth, ctx3);

    const height = newWrapBalance.offsetHeight + 25;
    const history = document.querySelector('.history');
    if (history) {
      history.style = `top:${height}px`;
    }

    const arrMonthFull = getArrMonthFull(cardsData);
    createChartTransaction(arrMonthFull.arrMonth, ctx3, arrMonthFull.dataPlusArr, arrMonthFull.dataMinusArr);
    minBalance2.innerHTML = '0&nbsp;₽';
    maxBalance2.innerHTML = `${Math.round(Math.max(...getBalance(arrMonthFull.arrMonth)))}&nbsp;₽`;
    middleBalance.innerHTML = `${Math.round(arrMonthFull.max)}&nbsp;₽`;
    balanceMeaning2.append(maxBalance2);
    balanceMeaning2.append(middleBalance);
    balanceMeaning2.append(minBalance2);
  }

  newWrapBalance.addEventListener('click', datailBalance);
  wraperHistory.addEventListener('click', datailBalance);

  return {
    score,
    buttonScore,
    wrapLeft,
    remnewWrapBalance,
  };
}

scoreDetail();

export function startScore(id) {
  idscore = id;
  if ((localStorage.getItem('auth_token_skillbox') && localStorage.getItem('auth_token_skillbox') != null)) {
    user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
    getScore(user.token, BACKEND, id).then((data) => {
      cardsData = data;
      scoreNumber.textContent = `№ ${id}`;
      balanceNumber.textContent = `${data.payload.balance} ₽`;

      const arrMonth = getArrMonth(data, 6);

      createChart(arrMonth, ctx);
      if (chartCreate === null || currentUrl !== window.location.href) {
        minBalance.innerHTML = '0&nbsp;₽';
        maxBalance.innerHTML = `${Math.round(Math.max(...getBalance(arrMonth)))}&nbsp;₽`;
      }

      if (currentUrl !== window.location.href) {
        currentUrl = window.location.href;
      }
    });

    ctx.remove();

    return id;
  }
}

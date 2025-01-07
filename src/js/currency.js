import { getCurrencies, sendExchange, currencyFeed } from './api';
import { BACKEND } from '.';

const btn = document.createElement('button');
export default function carrencyCreate() {
  const arrCurrency = [];
  const arrLink = [];
  const carrency = document.createElement('section');
  carrency.classList.add('carrency');
  const container = document.createElement('div');
  container.classList.add('container', 'carrency__container');
  const title = document.createElement('h1');
  title.classList.add('carrency__title');
  title.textContent = 'Валютный обмен';
  const carrencyWrapper = document.createElement('div');
  carrencyWrapper.classList.add('carrency__wrapper');

  const wrap = document.createElement('div');
  wrap.classList.add('carrency__wrap');

  const your = document.createElement('div');
  your.classList.add('carrency__your');

  const exchange = document.createElement('div');
  exchange.classList.add('carrency__exchange');

  const change = document.createElement('div');
  change.classList.add('carrency__change');

  const titleYour = document.createElement('h2');
  titleYour.classList.add('carrency__your-title');
  titleYour.textContent = 'Ваши валюты';

  const listYour = document.createElement('ul');
  listYour.classList.add('carrency__your-list');

  const exchangeTitle = document.createElement('h2');
  exchangeTitle.classList.add('carrency__exchange-title');
  exchangeTitle.textContent = 'Обмен валюты';

  const exchangeWrap = document.createElement('div');
  exchangeWrap.classList.add('carrency__exchange-wrap');

  const exchangeLeft = document.createElement('div');
  exchangeLeft.classList.add('carrency__exchange-left');

  const fromWrap = document.createElement('div');
  fromWrap.classList.add('carrency__from-wrap');

  const fromWrap2 = document.createElement('div');
  fromWrap2.classList.add('carrency__from-wrap');

  const from = document.createElement('span');
  from.classList.add('carrency__from');
  from.textContent = 'Из';

  const from2 = document.createElement('span');
  from2.classList.add('carrency__from', 'carrency__from--left');
  from2.textContent = 'В';

  const from3 = document.createElement('span');
  from3.classList.add('carrency__from');
  from3.textContent = 'Сумма';

  const input = document.createElement('input');
  input.type = 'number';
  input.classList.add('carrency__exchange-input');

  const err = document.createElement('span');
  err.classList.add('carrency__error');

  const fromWrapper = document.createElement('div');
  fromWrapper.classList.add('carrency__from-wrapper');

  const fromWrapper2 = document.createElement('div');
  fromWrapper2.classList.add('carrency__from-wrapper');

  const fromTitle = document.createElement('div');
  fromTitle.classList.add('carrency__from-title');
  fromTitle.textContent = 'RUB';

  const fromTitle2 = document.createElement('div');
  fromTitle2.classList.add('carrency__from-title');
  fromTitle2.textContent = 'BTC';

  const fromList = document.createElement('ul');
  fromList.classList.add('carrency__from-list');

  const fromList2 = document.createElement('ul');
  fromList2.classList.add('carrency__from-list');

  btn.classList.add('carrency__exchange-btn');
  btn.textContent = 'Обменять';

  const changeTitle = document.createElement('h2');
  changeTitle.classList.add('carrency__change-title');
  changeTitle.textContent = 'Изменение курсов в реальном времени';

  const chanheList = document.createElement('ul');
  chanheList.classList.add('carrency__change-list');

  carrency.append(container);
  container.append(title);
  container.append(carrencyWrapper);
  carrencyWrapper.append(wrap);
  carrencyWrapper.append(change);
  change.append(changeTitle);
  change.append(chanheList);

  wrap.append(your);
  your.append(titleYour);
  your.append(listYour);
  wrap.append(exchange);
  exchange.append(exchangeTitle);
  exchange.append(exchangeWrap);
  exchangeWrap.append(exchangeLeft);
  exchangeWrap.append(btn);

  exchangeLeft.append(fromWrap);
  exchangeLeft.append(fromWrap2);
  fromWrap2.append(from3);
  fromWrap2.append(input);

  fromWrap.append(from);
  fromWrap.append(fromWrapper);
  fromWrapper.append(fromTitle);
  fromWrapper.append(fromList);
  fromWrap.append(from2);
  fromWrap.append(fromWrapper2);
  fromWrapper2.append(fromTitle2);
  fromWrapper2.append(fromList2);
  exchange.append(err);

  function createCur() {
    const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
    if (user !== null) {
      getCurrencies(user.token, BACKEND).then((data) => {
        for (const key in data.payload) {
          if (key !== 0) {
            const li = document.createElement('li');
            li.classList.add('carrency__your-item');
            const car = document.createElement('span');
            car.classList.add('carrency__your-name');
            car.textContent = key;
            const dotted = document.createElement('span');
            dotted.classList.add('carrency__your-dotted');
            const summ = document.createElement('sum');
            summ.classList.add('carrency__your-summ');
            summ.textContent = data.payload[key].amount;
            listYour.append(li);
            li.append(car);
            li.append(dotted);
            li.append(summ);
            arrCurrency.push(key);
          }

          function getLi() {
            const liItem = document.createElement('li');
            liItem.classList.add('carrency__from-item');
            const link = document.createElement('a');
            link.classList.add('carrency__from-link');
            link.href = '/currency';
            link.textContent = key;
            liItem.append(link);
            liItem.addEventListener('click', changeCarency);
            return liItem;
          }
          function getLi2() {
            const liItem2 = document.createElement('li');
            liItem2.classList.add('carrency__from-item');
            const link2 = document.createElement('a');
            link2.classList.add('carrency__from-link');
            link2.href = '/currency';
            link2.textContent = key;
            liItem2.append(link2);
            liItem2.addEventListener('click', changeCarency2);
            return liItem2;
          }

          fromList.append(getLi());
          fromList2.append(getLi2());
        }
      });
    }
  }
  createCur();

  function createChange() {

  }
  fromWrapper.addEventListener('mouseover', (e) => {
    e.preventDefault();
    fromWrapper.classList.add('carrency__from-wrapper--active');
    fromList.classList.add('carrency__from-list--active');
  });

  fromWrapper2.addEventListener('mouseover', (e) => {
    e.preventDefault();

    fromWrapper2.classList.add('carrency__from-wrapper--active');
    fromList2.classList.add('carrency__from-list--active');
  });

  fromWrapper.addEventListener('mouseout', () => {
    fromWrapper.classList.remove('carrency__from-wrapper--active');
    fromList.classList.remove('carrency__from-list--active');
  });

  fromWrapper2.addEventListener('mouseout', () => {
    fromWrapper2.classList.remove('carrency__from-wrapper--active');
    fromList2.classList.remove('carrency__from-list--active');
  });

  function changeCarency(e) {
    e.preventDefault();
    fromTitle.textContent = e.target.textContent;
    if (fromList.classList.contains('carrency__from-list--active')) {
      fromList.classList.remove('carrency__from-list--active');
    }
    fromList.classList.remove('carrency__from-list--active');
  }

  function changeCarency2(e) {
    e.preventDefault();
    fromTitle2.textContent = e.target.textContent;
    if (fromList2.classList.contains('carrency__from-list--active')) {
      fromList2.classList.remove('carrency__from-list--active');
    }
    fromList.classList.remove('carrency__from-list--active');
  }

  input.addEventListener('input', () => {
    err.textContent = '';
  });

  function sendChange(e) {
    e.preventDefault();
    if ((localStorage.getItem('auth_token_skillbox') != null)) {
      if (input.value <= 0) {
        err.textContent = 'не указана сумма перевода, или она отрицательная';
      } else {
        const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
        const { token } = user;
        const fr = fromTitle.textContent;
        const to = fromTitle2.textContent;
        const amount = input.value;
        sendExchange(fr, to, amount, token, BACKEND).then((data) => {
          if (!data.payload && data.error) {
            switch (data.error) {
              case ('Overdraft prevented'):
                err.textContent = 'попытка перевести больше денег, чем доступно на счёте списания';
                break;
              case ('Invalid account from'):
                err.textContent = 'не указан адрес счёта списания, или этот счёт не принадлежит нам';
                break;
              case ('Invalid account to'):
                err.textContent = 'не указан счёт зачисления, или этого счёта не существует';
                break;
              case ('Invalid amount'):
                err.textContent = 'не указана сумма перевода, или она отрицательная';
                break;
              default:
                break;
            }
          } else {
            err.textContent = '';
            input.value = '';
            listYour.replaceChildren();
            fromList.replaceChildren();
            fromList2.replaceChildren();
            createCur();
          }
        });
      }
    }
  }

  btn.addEventListener('click', sendChange);

  function createCurrencyFeed() {
    if ((localStorage.getItem('auth_token_skillbox') != null)) {
      // const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
      const host = 'localhost:3000/';
      currencyFeed(host).then((socket) => {
        socket.onmessage = (event) => {
          const li = document.createElement('li');
          li.classList.add('carrency__change-item');
          const name = document.createElement('span');
          name.classList.add('carrency__change-name');
          const dotted = document.createElement('span');
          dotted.classList.add('carrency__change-dotted');
          const summ = document.createElement('span');
          summ.classList.add('carrency__change-summ');
          const arrow = document.createElement('span');
          // arrow.classList.add('carrency__change-arrow');

          li.append(name);
          li.append(dotted);
          li.append(summ);
          li.append(arrow);

          const obj = JSON.parse(event.data);
          name.textContent = `${obj.from}/${obj.to}`;
          summ.textContent = obj.rate;

          if (obj.change === 1) {
            arrow.classList.add('carrency__change-arrow', 'carrency__change-arrow--top');
          }

          if (obj.change === -1) {
            arrow.classList.add('carrency__change-arrow', 'carrency__change-arrow--down');
          }

          chanheList.prepend(li);
          console.log(event.data);
          const liAll = document.querySelectorAll('.carrency__change-item');
          if (liAll.length > 22) {
            liAll[22].remove();
          }
        };
      });
    }
  }
  createCurrencyFeed();
  return { carrency };
}

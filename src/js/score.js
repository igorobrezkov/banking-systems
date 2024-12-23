import { router } from '.';

export const scoreNumber = document.createElement('span');
export const balanceNumber = document.createElement('span');
export const numberScore = document.createElement('input');
export const summScore = document.createElement('input');
export const buttonScore = document.createElement('button');
export const ctx = document.createElement('canvas');
export const minBalance = document.createElement('span');
export const maxBalance = document.createElement('span');

const auto = document.createElement('div');
const ul = document.createElement('ul');
export const arrDop = [];
export function updateLS() {
  if (localStorage.getItem('autodop') != null) {
    const ls = JSON.parse(localStorage.getItem('autodop'));
    window.localStorage.removeItem('autodop');
    // console.log(ls);

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
    //  console.log(arrDop);
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

  button.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/account');
  });

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
  numberScore.type = 'text';
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

  minBalance.textContent = 0;
  maxBalance.textContent = 100;

  const newWrapBalance = document.createElement('div');
  newWrapBalance.classList.add('score__new-balance-wrap');

  newWrapBalance.addEventListener('click', (e) => {
    e.preventDefault();
    // router.navigate(`/${window.location.href}/belance`);
    console.log(`Деталка баланса:${window.location.href}`);
  });

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
  newWrapBalance.append(titleBalance);
  newWrapBalance.append(wrapDinamic);

  wrapDinamic.append(balanceScore);

  balanceScore.append(ctx);
  wrapDinamic.append(balanceMeaning);
  balanceMeaning.append(maxBalance);
  balanceMeaning.append(minBalance);

  return {
    score,
    buttonScore,
  };
}

scoreDetail();

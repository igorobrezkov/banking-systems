import { getList, createAccaunt } from './api';
import { BACKEND, router } from './index';

export default function accountBank() {
  const accountLk = document.createElement('section');
  accountLk.classList.add('account');
  const container = document.createElement('div');
  container.classList.add('container', 'account__container');
  const title = document.createElement('h1');
  title.classList.add('account__title');
  title.textContent = 'Ваши счета';
  const wrap = document.createElement('div');
  wrap.classList.add('account__wrap');
  const wrapSort = document.createElement('div');
  wrapSort.classList.add('account__wrap-list');
  const sort = document.createElement('div');
  sort.classList.add('accout__sort', 'sort');
  const sortTitle = document.createElement('div');
  sortTitle.textContent = 'Сортировка';
  sortTitle.classList.add('sort__title');

  const list = document.createElement('ul');
  list.classList.add('sort__list');
  const itemNumber = document.createElement('li');
  itemNumber.classList.add('sort__item');
  const linkNumber = document.createElement('a');
  linkNumber.classList.add('sort__link');
  linkNumber.href = '#';
  linkNumber.textContent = 'По номеру';

  const itemBalance = document.createElement('li');
  itemBalance.classList.add('sort__item');
  const linkBalance = document.createElement('a');
  linkBalance.classList.add('sort__link');
  linkBalance.href = '#';
  linkBalance.textContent = 'По балансу';

  const itemTransaction = document.createElement('li');
  itemTransaction.classList.add('sort__item');
  const linkTransaction = document.createElement('a');
  linkTransaction.classList.add('sort__link');
  linkTransaction.href = '#';
  linkTransaction.textContent = 'По последней транзакции';

  const createScore = document.createElement('button');
  createScore.classList.add('account__create-score');
  createScore.textContent = 'Создать новый счёт';

  if ((localStorage.getItem('auth_token_skillbox') != null)) {
    createScore.addEventListener('click', (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
      createAccaunt(user.token, BACKEND);
      const scoreWrap = document.querySelector('.score-wrap');
      scoreWrap.remove();
      renderScores();
    });
  }

  accountLk.append(container);
  container.append(wrap);
  wrap.append(wrapSort);
  wrapSort.append(title);
  wrapSort.append(sort);
  sort.append(sortTitle);

  sort.append(list);
  list.append(itemNumber);
  list.append(itemBalance);
  list.append(itemTransaction);
  itemNumber.append(linkNumber);
  itemBalance.append(linkBalance);
  itemTransaction.append(linkTransaction);

  wrap.append(createScore);

  sort.addEventListener('mouseover', () => {
    list.classList.add('sort__list--block');
    sortTitle.classList.add('sort__title--active');
  });

  sort.addEventListener('mouseout', () => {
    list.classList.remove('sort__list--block');
    sortTitle.classList.remove('sort__title--active');
  });

  const arrLink = [linkNumber, linkBalance, linkTransaction];

  function removeActiveLink() {
    arrLink.forEach((item) => {
      if (item.classList.contains('sort__link--active')) {
        item.classList.remove('sort__link--active');
      }
    });
  }
  arrLink.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      removeActiveLink();
      item.classList.add('sort__link--active');
      list.classList.remove('sort__list--block');
    });
  });

  function renderScores() {
    const scoreWrap = document.createElement('div');
    scoreWrap.classList.add('account__score-wrap', 'score-wrap');
    const listScore = document.createElement('ul');
    listScore.classList.add('score-wrap__list');
    container.append(scoreWrap);
    scoreWrap.append(listScore);

    if ((localStorage.getItem('auth_token_skillbox') != null)) {
      const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
      getList(user.token, BACKEND).then((data) => {
        data.payload.forEach((item) => {
          const itemScore = document.createElement('li');
          itemScore.classList.add('score-wrap__item');
          listScore.append(itemScore);

          const wrapScore = document.createElement('div');
          wrapScore.classList.add('score-wrap__wrap', 'wrap');
          itemScore.append(wrapScore);
          const score = document.createElement('h3');
          score.classList.add('wrap__title');
          score.textContent = item.account;
          wrapScore.append(score);
          const balance = document.createElement('span');
          balance.classList.add('wrap__balance');
          balance.textContent = `${item.balance} ₽`;
          wrapScore.append(balance);

          const transactionBtn = document.createElement('div');
          transactionBtn.classList.add('wrap__transaction-btn');
          wrapScore.append(transactionBtn);

          const wrapperTransaction = document.createElement('div');
          wrapperTransaction.classList.add('wrap__transaction', 'transaction');
          transactionBtn.append(wrapperTransaction);

          const lastTransaction = document.createElement('h4');
          lastTransaction.classList.add('transaction__title');
          lastTransaction.textContent = 'Последния транзакция:';
          wrapperTransaction.append(lastTransaction);
          const dateTransaction = document.createElement('span');
          dateTransaction.classList.add('transaction__date');

          if (item.transactions.length > 0) {
            const date = new Date(item.transactions[0].date);
            const arrMonth = ['январья', 'феврвлья', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            dateTransaction.textContent = `${date.getDate()} ${arrMonth[date.getMonth()]} ${date.getFullYear()} `;
            wrapperTransaction.append(dateTransaction);
          }

          const btn = document.createElement('button');
          btn.classList.add('transaction__btn');
          btn.id = `/account/${item.account}`;
          btn.textContent = 'Открыть';
          btn.setAttribute('data-navigo', '');
          transactionBtn.append(btn);

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate(btn.id);
          });
        });
      });
    }
  }

  renderScores();
  return { accountLk };
}

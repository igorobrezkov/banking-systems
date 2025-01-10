import { getScore } from './api';
import { BACKEND } from '.';
import getArrSortTransiction from './sort';

export const listHistory = document.createElement('ul');
export const listHistoryTitle = document.createElement('ul');
export const wraperHistory = document.createElement('div');

export const removeHistory = () => {
  const titleAll = document.querySelectorAll('.history__title');
  if (titleAll.length > 1) {
    for (let i = 0; i < titleAll.length; i++) {
      if (i !== titleAll.length - 1) {
        titleAll[i].remove();
      }
    }
  }
  const listTitleitem = document.querySelectorAll('.list-title__item');

  if (listTitleitem.length > 0) {
    for (let i = 0; i < listTitleitem.length; i++) {
      if (i > 3) {
        listTitleitem[i].remove();
      }
    }
  }
  const cureetLiAll = document.querySelectorAll('.list__item');
  cureetLiAll.forEach((item) => item.remove());
};

export default function createHistory(id) {
  const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));
  const history = document.createElement('section');
  history.classList.add('history');
  const container = document.createElement('div');
  container.classList.add('container', 'history__container');
  const historyTitle = document.createElement('h2');
  historyTitle.classList.add('history__title');
  historyTitle.textContent = 'История переводов';
  wraperHistory.classList.add('history__wrapper');

  history.append(container);
  container.append(wraperHistory);
  wraperHistory.append(historyTitle);

  listHistoryTitle.classList.add('history__list-title', 'list-title');
  const scoreSend = document.createElement('li');
  scoreSend.classList.add('list-title__item');
  scoreSend.textContent = 'Счёт отправителя';

  const scoreTo = document.createElement('li');
  scoreTo.classList.add('list-title__item');
  scoreTo.textContent = 'Счёт получателя';

  const scoreSumm = document.createElement('li');
  scoreSumm.classList.add('list-title__item', 'list-title__item--summ');
  scoreSumm.textContent = 'Сумма';

  const scoreDate = document.createElement('li');
  scoreDate.classList.add('list-title__item', 'list-title__item--date');
  scoreDate.textContent = 'Дата';

  wraperHistory.append(listHistoryTitle);
  listHistoryTitle.append(scoreSend);
  listHistoryTitle.append(scoreTo);
  listHistoryTitle.append(scoreSumm);
  listHistoryTitle.append(scoreDate);

  listHistory.classList.add('history__list', 'list');
  wraperHistory.append(listHistory);

  const pagination = document.createElement('div');
  pagination.classList.add('pagination', 'pagination--hidden');

  const paginationBtn = document.createElement('button');
  paginationBtn.classList.add('pagination__btn', 'pagination__btn--prev', 'pagination__btn--js');

  const paginationList = document.createElement('ul');
  paginationList.classList.add('pagination__list', 'pagination__list--js');

  const paginationBtn2 = document.createElement('button');
  paginationBtn2.classList.add('pagination__btn', 'pagination__btn--next', 'pagination__btn--js');

  pagination.append(paginationBtn);
  pagination.append(paginationList);
  pagination.append(paginationBtn2);

  getScore(user.token, BACKEND, id).then((data) => {
    const { account } = data.payload;
    const arrSort = getArrSortTransiction(data.payload.transactions).reverse();

    let pre = null;

    const historyCount = 10;

    let currentPage = 1;

    let pagesCount = Math.ceil(arrSort.length / historyCount);

    // Выводится список транзакций
    const renderHistory = (arrHistory, historyContainer, numberOfHistory, page) => {
      removeHistory();

      const firstHistoryIndex = numberOfHistory * page - numberOfHistory;

      const lastHistoryIndex = firstHistoryIndex + numberOfHistory;

      const historyOnPage = arrHistory.slice(firstHistoryIndex, lastHistoryIndex);
      historyOnPage.forEach((element) => {
        const date = new Date(element.date);
        pre = (element.from === account) ? '- ' : '+ ';

        const liHistory = document.createElement('li');
        liHistory.classList.add('list__item');

        const liSend = document.createElement('span');
        liSend.classList.add('list__span');

        const liTo = document.createElement('span');
        liTo.classList.add('list__span');

        const liSumm = document.createElement('span');
        if (pre === '+ ') {
          liSumm.classList.add('list__span', 'list__span--summ', 'list__span--green');
        } else if (pre === '- ') {
          liSumm.classList.add('list__span', 'list__span--summ', 'list__span--red');
        }

        const liDate = document.createElement('span');
        liDate.classList.add('list__span', 'list__span--date');

        liSend.textContent = element.from;
        liTo.textContent = element.to;
        liSumm.textContent = pre + element.amount;
        liDate.textContent = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} `;

        historyContainer.append(liHistory);
        liHistory.append(liSend);
        liHistory.append(liTo);
        liHistory.append(liSumm);
        liHistory.append(liDate);
      });
    };

    renderHistory(arrSort, wraperHistory, historyCount, currentPage);

    if (pagesCount <= 10 && pagesCount > 1) {
      const renderHistoryPagination = (arrHistory, historyContainer, numberOfHistory) => {
        pagesCount = Math.ceil(arrHistory.length / numberOfHistory);

        for (let i = 1; i <= pagesCount; i++) {
          const li = renderHistoryBtn(i);
          paginationList.append(li);
        }

        wraperHistory.after(pagination);
      };

      const renderHistoryBtn = (page) => {
        const li = document.createElement('li');
        li.classList.add('pagination__item');

        li.textContent = page;
        if (currentPage === page) {
          li.classList.add('pagination__item--active');
        }
        return li;
      };

      const updateHistory = () => {
        pagination.addEventListener('click', (e) => {
          e.preventDefault();
          if (e.target.closest('.pagination__item')) {
            currentPage = e.target.textContent;
            removeHistory();
            renderHistory(arrSort, wraperHistory, historyCount, currentPage);
            const cureetLi = document.querySelector('.pagination__item--active');
            if (cureetLi && cureetLi.classList.contains('pagination__item--active')) {
              cureetLi.classList.remove('pagination__item--active');
            }
            e.target.classList.add('pagination__item--active');
          }
        });
      };
      renderHistoryPagination(arrSort, listHistory, historyCount, currentPage);
      updateHistory();

      const handelerPagination = (e) => {
        e.preventDefault();
        const currentActiveLi = document.querySelector('.pagination__item--active');
        let newActiveLi;
        if (e.target.closest('.pagination__btn--next') && currentActiveLi) {
          newActiveLi = currentActiveLi.nextElementSibling;
          currentPage++;
        } else if (e.target.closest('.pagination__btn--prev') && currentActiveLi) {
          newActiveLi = currentActiveLi.previousElementSibling;
          currentPage--;
        }

        if (!newActiveLi && e.target.closest('.pagination__btn--next')) {
          newActiveLi = liPagination[0];
        } else if (!newActiveLi) {
          newActiveLi = liPagination[liPagination.length - 1];
        }

        if (currentActiveLi) {
          currentActiveLi.classList.remove('pagination__item--active');
        }

        if (newActiveLi) {
          newActiveLi.classList.add('pagination__item--active');
        }

        if (currentPage > liPagination.length) {
          currentPage = 1;
        } else if (currentPage < 1) {
          currentPage = liPagination.length;
        }
        removeHistory();
        renderHistory(arrSort, wraperHistory, historyCount, currentPage);
      };

      const liPagination = document.querySelectorAll('.pagination__item');

      paginationBtn.addEventListener('click', handelerPagination);
      paginationBtn2.addEventListener('click', handelerPagination);
    } else if (pagesCount > 10) {
      const pagesCount = Math.ceil(arrSort.length / historyCount);
      const totalPages = pagesCount;
      const page = 1;
      let allPage;

      const createPaginationLi = (li, selector = '', active = false, value = false) => {
        allPage = false;
        (active) ? li.classList.add(selector, 'pagination__item--active') : li.classList.add(selector);
        if (value) li.textContent = value;
        paginationList.append(li);
      };

      const createPagination = (totalPages, page) => {
        const liPag = document.querySelectorAll('.pagination__item');

        if (page > 1) {
          function hanlerPrev(e) {
            e.preventDefault();
            createPagination(totalPages, page - 1);
            removeHistory();
            renderHistory(arrSort, wraperHistory, historyCount, page - 1);
          }

          paginationBtn.addEventListener('click', hanlerPrev);
        }

        if (liPag.length > 0) {
          liPag.forEach((item) => {
            item.remove();
          });
        }
        let active;
        let beforePage = page - 1;
        let afterPage = page + 1;

        if (page > 2) {
          const li = document.createElement('li');
          function hundlerLi1(e) {
            e.preventDefault();
            createPagination(totalPages, 1);
            removeHistory();
            renderHistory(arrSort, wraperHistory, historyCount, 1);
          }
          li.addEventListener('click', hundlerLi1);

          createPaginationLi(li, 'pagination__item', active, 1);
          if (page > 3) {
            const li = document.createElement('li');
            li.classList.add('pagination__item--no-border');
            createPaginationLi(li, 'pagination__item', '', '...');
          }
        }

        if (page === totalPages) {
          beforePage -= 2;
        } else if (page === totalPages - 1) {
          beforePage -= 1;
        }

        if (page === 1) {
          afterPage += 2;
        } else if (page === 2) {
          afterPage += 1;
        }

        for (let plength = beforePage; plength <= afterPage; plength++) {
          if (plength === 0) {
            plength += 1;
          }
          if (page === plength) {
            active = true;
          } else {
            active = false;
          }
          const li = document.createElement('li');
          li.addEventListener('click', (e) => {
            e.preventDefault();
            createPagination(totalPages, plength);
            removeHistory();
            renderHistory(arrSort, wraperHistory, historyCount, plength);
            if (allPage === true) {
              const liAll = document.querySelectorAll('.pagination__item');
              if (liAll.length > 1) {
                for (let i = 0; i < liAll.length; i++) {
                  if (i === liAll.length - 1) {
                    liAll[i].remove();
                  }
                }
              }
            }
          });

          createPaginationLi(li, 'pagination__item', active, plength);
        }

        if (page === totalPages) {
          allPage = true;
        }

        if (page < totalPages - 1) {
          if (page < totalPages - 2) {
            const li = document.createElement('li');
            li.classList.add('pagination__item--no-border');
            createPaginationLi(li, 'pagination__item', '', '...');
          }

          const li = document.createElement('li');
          li.classList.add('pagination__last');
          createPaginationLi(li, 'pagination__item', '', totalPages);
          function hundlerLi3(e) {
            e.preventDefault();

            createPagination(totalPages, totalPages);
            removeHistory();
            renderHistory(arrSort, wraperHistory, historyCount, totalPages);

            if (allPage === true) {
              const liAll = document.querySelectorAll('.pagination__item');
              if (liAll.length > 1) {
                for (let i = 0; i < liAll.length; i++) {
                  if (i === liAll.length - 1) {
                    liAll[i].remove();
                  }
                }
              }
            }
          }
          li.addEventListener('click', hundlerLi3);
        }

        if (page < totalPages) {
          function hanlerNext(e) {
            e.preventDefault();
            createPagination(totalPages, page + 1);
            removeHistory();
            renderHistory(arrSort, wraperHistory, historyCount, page + 1);
          }
          paginationBtn2.addEventListener('click', hanlerNext);
        }
      };

      createPagination(totalPages, page);
      wraperHistory.after(pagination);
    }
  });

  return {
    history,
  };
}

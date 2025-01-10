export default function getArrSortTransiction(arr) {
  const arrCopy = [...arr];
  return arrCopy.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
  });
}

export function getArrSortBalance(arr) {
  const arrCopy = [...arr];
  return arrCopy.sort((a, b) => {
    if (a.balance > b.balance) {
      return -1;
    }
  });
}

export function getArrSortAccount(arr) {
  const arrCopy = [...arr];
  return arrCopy.sort((a, b) => {
    if (a.account > b.account) {
      return -1;
    }
  });
}

export function getArrSortLastTansaction(arr) {
  const arrCopy = [...arr];
  return arrCopy.sort((a, b) => {
    const date1 = (a.transactions[0]) ? a.transactions[0].date : 0;
    const date2 = (b.transactions[0]) ? b.transactions[0].date : 0;
    if (date1 < date2) {
      return -1;
    }
  });
}

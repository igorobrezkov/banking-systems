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
    if (a.transactions.date > b.transactions.date) {
      return -1;
    }
  });
}

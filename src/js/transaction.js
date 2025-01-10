import getArrSortTransiction from './sort';

export function getArrMonth(data, countMonth) {
  const arrMonth = [];
  const arr = data.payload.transactions;
  const arrSort = getArrSortTransiction(arr).reverse();

  let month = '';
  if (arrSort[0]) {
    month = new Date(arrSort[0].date).getUTCMonth() + 1;
  }

  let summ = data.payload.balance;

  let i = 0;

  while (i < arrSort.length && (arrMonth.length < countMonth)) {
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
    } if (arrSort[i].from === data.payload.account) {
      summ += arrSort[i].amount;
    }

    i++;
  }

  return arrMonth;
}

export function getArrMonthFull(data) {
  let arrMonth = [];
  const arrMonthMinus = [];
  const arrMonthPlus = [];
  const arr = data.payload.transactions;
  const arrSort = getArrSortTransiction(arr).reverse();

  let month = '';
  if (arrSort[0]) {
    month = new Date(arrSort[0].date).getUTCMonth() + 1;
  }
  let summMinus = 0;
  let summPlus = 0;

  let i = 0;

  while (i < arrSort.length) {
    if (i === 0) {
      if (arrSort[0].from !== data.payload.account) {
        summPlus += arrSort[0].amount;
        if (!arrSort[1]) {
          arrMonthPlus.push(summPlus);
          arrMonthMinus.push(summMinus);
        }
      } else if (arrSort[0].from === data.payload.account) {
        summMinus += arrSort[0].amount;
        if (!arrSort[1]) {
          arrMonthMinus.push(summMinus);
          arrMonthPlus.push(summPlus);
        }
      }
    }
    if (month !== new Date(arrSort[i].date).getUTCMonth() + 1) {
      arrMonthMinus.push(summMinus);
      arrMonthPlus.push(summPlus);
      summMinus = 0;
      summPlus = 0;

      month = new Date(arrSort[i].date).getUTCMonth() + 1;
    }
    if (arrSort[i].from !== data.payload.account && i !== 0) {
      summPlus += arrSort[i].amount;
    } else if (arrSort[i].from === data.payload.account && i !== 0) {
      summMinus += arrSort[i].amount;
    }

    if ((i === arrSort.length - 1) && arrSort.length > 1) {
      arrMonthMinus.push(summMinus);
      arrMonthPlus.push(summPlus);
    }
    i++;
  }

  const dataMinusArr = [];
  const dataPlusArr = [];
  arrMonth = getArrMonth(data, 12);
  if (arrMonthMinus.length === arrMonthPlus.length) {
    for (let j = 0; j < arrMonthMinus.length; j++) {
      const summTransaction = arrMonthMinus[j] + arrMonthPlus[j];
      const minusProcent = (arrMonthMinus[j] * 100) / summTransaction;
      const plusProcent = (arrMonthPlus[j] * 100) / summTransaction;
      if (arrMonth[j]) {
        const dataMinus = (minusProcent * 0.01) * arrMonth[j].balance;
        dataMinusArr.push(dataMinus);
        const dataPlus = (plusProcent * 0.01) * arrMonth[j].balance;
        dataPlusArr.push(dataPlus);
      }
    }
  }
  if (arrMonthMinus.length === 0 && arrMonthPlus.length > 0) {
    dataPlusArr.push(arrMonthPlus[0]);
    dataMinusArr.push(0);
  }
  const maxPlus = Math.max(...arrMonthPlus);
  const maxMinus = Math.max(...arrMonthMinus);
  const max = (maxPlus > maxMinus) ? maxPlus : maxMinus;

  dataMinusArr.reverse();
  dataPlusArr.reverse();

  return {
    arrMonth, dataMinusArr, dataPlusArr, max,
  };
}

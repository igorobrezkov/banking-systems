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

  let summ = data.payload.balance;
  let summMinus = 0;
  let summPlus = 0;

  let i = 0;

  while (i < arrSort.length) {
    if (i === 0) {
      if (arrSort[0].from !== data.payload.account) {
        summPlus += arrSort[0].amount;
        if (arrSort[1] && month !== new Date(arrSort[1].date).getUTCMonth() + 1) {
          arrMonthPlus.push(summPlus);
          summPlus = 0;
        } else if (arrSort[0] && !arrSort[1]) {
          arrMonthPlus.push(summPlus);
        }
      } if (arrSort[0].from === data.payload.account) {
        summMinus += arrSort[0].amount;
        if (arrSort[1] && month !== new Date(arrSort[1].date).getUTCMonth() + 1) {
          arrMonthMinus.push(summMinus);
          summMinus = 0;
        } else if (arrSort[0] && !arrSort[1]) {
          arrMonthMinus.push(summMinus);
        }
      }
    } else if (i === arrSort.length - 1) {
      if (arrSort[i].from !== data.payload.account) {
        summPlus += arrSort[i].amount;
      }
      arrMonthPlus.push(summPlus);
      if (arrSort[i].from === data.payload.account) {
        summMinus += arrSort[i].amount;
      }

      arrMonthMinus.push(summMinus);
    }

    if (month !== new Date(arrSort[i].date).getUTCMonth() + 1) {
      arrMonthMinus.push(summMinus);
      summMinus = 0;
      arrMonthPlus.push(summPlus);
      summPlus = 0;
      month = new Date(arrSort[i].date).getUTCMonth() + 1;
    }

    if (arrSort[i].from !== data.payload.account && i !== 0) {
      summ -= arrSort[i].amount;
      summPlus += arrSort[i].amount;
    } if (arrSort[i].from === data.payload.account && i !== 0) {
      summ += arrSort[i].amount;
      summMinus += arrSort[i].amount;
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
  const maxPlus = Math.max(...dataPlusArr);
  const maxMinus = Math.max(...dataMinusArr);
  const max = (maxPlus > maxMinus) ? maxPlus : maxMinus;
  // console.log(maxPlus);
  dataMinusArr.reverse();
  dataPlusArr.reverse();
  return {
    arrMonth, dataMinusArr, dataPlusArr, max,
  };
}

import Chart from 'chart.js/auto';
import { maxBalance, minBalance } from './score';

let chart = null;
export let chart2 = null;
export let chart3 = null;
let object = null;
export function getMonth(arr) {
  const arrMonthDesc = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек'];
  const arrMonthS = [];
  if (arr.length > 0) {
    arr.forEach((item) => {
      arrMonthS.push(arrMonthDesc[item.month - 1]);
    });
  }
  return arrMonthS.reverse();
}

export function getBalance(arr) {
  const arrMonthb = [];
  if (arr.length > 0) {
    arr.forEach((item) => {
      arrMonthb.push(item.balance);
    });
  }
  return arrMonthb.reverse();
}
export function createChart(arr, obj, detail = false) {
  if (chart) {
    chart.destroy();
  }

  const arrMonth = arr;

  object = new Chart(obj, {
    type: 'bar',
    title: {
      display: false,
    },
    data: {
      labels: getMonth(arrMonth),
      datasets: [{
        data: getBalance(arrMonth),
        borderWidth: 0,
        backgroundColor: ['#116ACC'],
      },
      ],
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

  if (detail === false) { chart = object; } else if (detail === true) { chart2 = object; }
}

export function createChartTransaction(arrMonth, obj, dataPlusArr, dataMinusArr) {
  if (chart) {
    chart.destroy();
  }

  if (chart3) {
    chart3.destroy();
  }

  minBalance.innerHTML = '0&nbsp;₽';
  maxBalance.innerHTML = `${Math.round(Math.max(...getBalance(arrMonth)))}&nbsp;₽`;

  chart3 = new Chart(obj, {
    type: 'bar',
    title: {
      display: false,
    },
    data: {
      labels: getMonth(arrMonth),

      datasets: [{

        data: dataMinusArr,
        backgroundColor: ['#FD4E5D'],
        tooltip: {
          callbacks: {
            label(tooltipData) {
              const values = tooltipData.dataset.data[tooltipData.dataIndex];
              const result = () => {
                const percentage100 = values + dataPlusArr[tooltipData.dataIndex];
                const percentage = (values * 100) / percentage100;
                return percentage;
              };
              return `негативные:  ${result().toFixed(2)}%`;
            },
          },
        },
      },
      {

        data: dataPlusArr,
        backgroundColor: ['#76CA66'],
        tooltip: {
          callbacks: {
            label(tooltipData) {
              const values = tooltipData.dataset.data[tooltipData.dataIndex];
              const result = () => {
                const percentage100 = values + dataMinusArr[tooltipData.dataIndex];
                const percentage = (values * 100) / percentage100;
                return percentage;
              };
              return `положительные:  ${result().toFixed(2)}%`;
            },
          },
        },

      },

      ],
    },

    options: {

      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {

        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

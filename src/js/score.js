export const scoreNumber = document.createElement('span');

export default function scoreDetail() {
  const score = document.createElement('section');
  score.classList.add('score');
  const container = document.createElement('div');
  container.classList.add('container', 'score__container');
  const wrap1 = document.createElement('div');
  wrap1.classList.add('score_wrapper1');

  const title = document.createElement('h1');
  title.classList.add('score__title');
  title.textContent = 'Просмотр счёта ';

  scoreNumber.classList.add('score__number');

  score.append(container);
  container.append(title);
  container.append(scoreNumber);

  return { score, title, scoreNumber };
}

scoreDetail();

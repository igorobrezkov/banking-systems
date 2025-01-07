export default function atams() {
  const section = document.createElement('section');
  section.classList.add('atams');
  const container = document.createElement('div');
  container.classList.add('container', 'atams__container');
  const title = document.createElement('h1');
  title.classList.add('atams__title');
  title.textContent = 'Карта банкоматов';

  section.append(container);
  container.append(title);

  return section;
}

export default function createHeader() {
  const { body } = document;
  const header = document.createElement('header');
  header.classList.add('header');
  body.append(header);
  const container = document.createElement('div');
  container.classList.add('container', 'header__container');
  header.append(container);
  const headerLogo = document.createElement('a');
  headerLogo.classList.add('header__logo');
  headerLogo.href = '#';
  headerLogo.textContent = 'Coin.';
  container.append(headerLogo);
  return { container };
}

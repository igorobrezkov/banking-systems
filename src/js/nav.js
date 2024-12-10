export default function navigation() {
  const nav = document.createElement('nav');
  nav.classList.add('header__nav');
  const ul = document.createElement('ul');
  ul.classList.add('header__list');
  const itemAtams = document.createElement('li');
  itemAtams.classList.add('header__item');
  const linkAtams = document.createElement('a');
  linkAtams.classList.add('header__link');
  linkAtams.href = '/atams';
  linkAtams.textContent = 'Банкоматы';
  const itemAccount = document.createElement('li');
  itemAccount.classList.add('header__item');
  const linkAccount = document.createElement('a');
  linkAccount.classList.add('header__link');
  linkAccount.href = '/account';
  linkAccount.textContent = 'Счета';
  const itemCurrency = document.createElement('li');
  itemCurrency.classList.add('header__item');
  const linkCurrency = document.createElement('a');
  linkCurrency.classList.add('header__link');
  linkCurrency.href = '/currency';
  linkCurrency.textContent = 'Валюта';
  const itemExit = document.createElement('li');
  itemExit.classList.add('header__item');
  const linkExit = document.createElement('a');
  linkExit.classList.add('header__link');
  linkExit.href = '/';
  linkExit.textContent = 'Выйти';
  linkExit.setAttribute('data-exit', true);

  nav.append(ul);
  ul.append(itemAtams);
  itemAtams.append(linkAtams);
  ul.append(itemAccount);
  itemAccount.append(linkAccount);
  ul.append(itemCurrency);
  itemCurrency.append(linkCurrency);
  ul.append(itemExit);
  itemExit.append(linkExit);

  return { nav, link: [linkAtams, linkAccount, linkCurrency, linkExit], active: linkAccount };
}

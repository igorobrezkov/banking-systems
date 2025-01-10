describe('Банковская система', () => {
  beforeEach(() => {
    cy.visit('http://192.168.0.18:8080/');
  });
  it('валидация авторизации', () => {
    cy.contains('Войти').click();
    cy.get('input[name="login"]').type('de');
    cy.contains('Войти').click();
    cy.get('input[name="pass"]').type('sk');
    cy.contains('Войти').click();
  });
  it('успешная авторизация и просмотр списка счетов', () => {
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="pass"]').type('skillbox');
    cy.contains('Войти').click();
  });

  it('возможность перевести деньги со счета на счет', () => {
    let score;
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="pass"]').type('skillbox');
    cy.contains('Войти').click();
    cy.get('.wrap__title').eq(1).then((data) => {
      console.log(data.text());
      score = data.text();
      cy.contains('Открыть').click();
      cy.get('input[placeholder="номер счета"]').type(score);
      cy.get('input[placeholder="сумма перевода"]').type('100');
      cy.contains('Отправить').click();
      cy.visit('http://192.168.0.18:8080/');
    });
  });
  it.only('Создание нового счета перевод на него и с него денег', () => {
    let score2;
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="pass"]').type('skillbox');
    cy.contains('Войти').click();
    cy.get('.account__create-score').click();
    cy.visit('http://192.168.0.18:8080/');
    cy.get('.wrap__title').last()
      .then((data) => {
        score2 = data.text();
        cy.contains('Открыть').click();
        cy.get('input[placeholder="номер счета"]').type(score2);
        cy.get('input[placeholder="сумма перевода"]').type('100');
        cy.contains('Отправить').click();
        cy.visit('http://192.168.0.18:8080/');
      });
    cy.get('.transaction__btn').last().click();
    cy.get('input[placeholder="номер счета"]').type('74213041477477406320783754');
    cy.get('input[placeholder="сумма перевода"]').type('50');
    cy.contains('Отправить').click();
  });
});

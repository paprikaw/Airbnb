
context('Flow of working with airbrb - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register')
  });
  it('Successfully Signs up', () => {
    const name = 'Happy Eric1';
    const email = 'eric.1unsw@gmail.com';
    const password = 'qweadsf';
    const title = 'WarmHouse1';
    const country = 'Australia';
    const City = 'Sydney';
    const State = 'NSW';
    const Street = 'Banks avenue';
    const Price = 100;
    const nBathRoom = 2;
    const amenity = 'TV, PS4';
    const nBeds = 2;
    cy.get('input[name=name]')
      .focus()
      .type(name);
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('button[type=submit]')
      .click();
    cy.get('#email1')
      .focus()
      .type(email);
    cy.get('#password1')
      .focus()
      .type(password);
    cy.get('.MuiButton-root')
      .click();
    cy.get('button[name=add]')
      .click();
    cy.get('input[name=title]')
      .focus()
      .type(title);
    cy.get('input[name=country]')
      .focus()
      .type(country);
    cy.get('input[name=city]')
      .focus()
      .type(City);
    cy.get('input[name=state]')
      .focus()
      .type(State);
    cy.get('input[name=street]')
      .focus()
      .type(Street);
    cy.get('input[name=price]')
      .focus()
      .type(Price);
    // Create room
    cy.get(':nth-child(11) > .MuiButton-root').click()
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInput-root > #mui-component-select-type').click()
    cy.get('[data-value="Guest Bedroom"]').click()
    cy.get('.MuiBox-root > form > .MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInput-root > .MuiInput-input')
      .focus()
      .type(nBeds);
    cy.get('.MuiBox-root > form > .MuiGrid-container > .MuiGrid-grid-md-6 > .MuiButton-root').click()

    cy.get('input[name=bathroomNumber]')
      .focus()
      .type(nBathRoom);
    cy.get('input[name=amenity]')
      .focus()
      .type(amenity);
    // Submit the form
    cy.get(':nth-child(13) > .MuiButton-root').click();
    // Click menu button
    cy.get('[data-testid="MoreVertIcon"]').click()
    // Click Edit Button
    cy.get('#simple-popover > .MuiPaper-root > div > .MuiButton-root').click()
    // updates
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInput-root > .MuiInput-input')
      .focus()
      .clear()
      .type(`${title} new`);
    // Confirm
    cy.get(':nth-child(14) > .MuiButton-root').click();

    // Publish listing
    cy.get('#PublishButton').click();

    // confirm publishing
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.get('[data-testid="AccountCircleIcon"] > path').click();
    cy.get('.MuiMenuItem-root').click();
  })
})

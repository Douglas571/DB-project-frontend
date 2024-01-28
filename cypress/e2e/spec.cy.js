describe("User interactions", () => {
  const fakeUser = {
    username: "testUser_" + Date.now(),
    password: "123",
    birth_date: null,
    weight_kg: 0,
    height_cm: 0,
  };

  const fakeRoutine = {
    title: "fakeRoutine_" + Date.now(),

    exercises: [
      {
        name: "push ups",
        selectUnit: "Kg",
        unit: "kg",
        sets: [
          { reps: 15, amount: 0 },
          { reps: 13, amount: 0 },
          { reps: 8, amount: 0 },
        ],
      },
      {
        name: "plank",
        selectUnit: "Seg",
        unit: "sec",
        sets: [
          { reps: 0, amount: 30 },
          { reps: 0, amount: 20 },
          { reps: 0, amount: 15 },
        ],
      },
    ],
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("the user should be able to regist a new account, exit and enter again", () => {
    cy.get('[data-test="singup-button"]').click();
    cy.get('[data-test="singup-username"]').type(fakeUser.username);
    cy.get('[data-test="singup-password"]').type(fakeUser.password);
    cy.get('[data-test="singup-regist-button"]').click();
    cy.get('[data-test="user-home-greeting"]').should(
      "contain",
      fakeUser.username
    );

    cy.get('[data-test="close-session-button"]').click();

    cy.get('[data-test="singin-button"]').click();
    cy.get('[data-test="singin-username"]').type(fakeUser.username);
    cy.get('[data-test="singin-password"]').type(fakeUser.password);
    cy.get('[data-test="singin-login-button"]').click();
    cy.get('[data-test="user-home-greeting"]').should(
      "contain",
      fakeUser.username
    );
  });

  it("the user should be able to create a routine and add exercises", () => {
    cy.get('[data-test="singin-button"]').click();
    cy.get('[data-test="singin-username"]').type(fakeUser.username);
    cy.get('[data-test="singin-password"]').type(fakeUser.password);
    cy.get('[data-test="singin-login-button"]').click();
    cy.get('[data-test="user-home-greeting"]').should(
      "contain",
      fakeUser.username
    );

    cy.get('[data-test="user-add-routine-button"]').click();
    cy.get('[data-test="user-add-routine-title"]').type(fakeRoutine.title);
    cy.get('[data-test="user-add-routine-save-button"]').click();

    cy.get('[data-test="user-routine-list"]').should(
      "contain",
      fakeRoutine.title
    );

    cy.get(`[data-test="user-routine-${fakeRoutine.title}"]`).click();
    cy.get('[data-test="routine-title"]').should("contain", fakeRoutine.title);

    // start to add the exercise
    fakeRoutine.exercises.forEach((fakeExercise) => {
      cy.get('[data-test="newExercise-name"]').should("have.value", "");
      cy.get('[data-test="newExercise-name"]').type(fakeExercise.name);
      cy.get('[data-test="newExercise-unit"]')
        .select(fakeExercise.selectUnit)
        .should("have.value", fakeExercise.unit);

      fakeExercise.sets.forEach((set, idx) => {
        cy.get('[data-test="newExercise-new-set-button"]').click();
        if (fakeExercise.unit !== "sec") {
          cy.get(`[data-test="newExercise-set-${idx}-reps"]`).type(set.reps);
        }
        cy.get(`[data-test="newExercise-set-${idx}-amount"]`).type(set.amount);
      });

      cy.get('[data-test="newExercise-save-button"]').click();

      cy.get('[data-test="routine-exercises-list"]').should(
        "contain",
        fakeExercise.name
      );
    });
  });

  it("the user should be able to open exercise and add activities ", () => {
    cy.get('[data-test="singin-button"]').click();
    cy.get('[data-test="singin-username"]').type(fakeUser.username);
    cy.get('[data-test="singin-password"]').type(fakeUser.password);
    cy.get('[data-test="singin-login-button"]').click();
    cy.get('[data-test="user-home-greeting"]').should(
      "contain",
      fakeUser.username
    );

    fakeRoutine.exercises.forEach((fakeExercise) => {
      // go to routine page

      /*
        each row has an index, so the first one should
        be the last activity added. 
      
      */

      cy.get(`[data-test="user-routine-${fakeRoutine.title}"]`).click();
    });
  });
});

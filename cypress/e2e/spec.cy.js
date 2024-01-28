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

        activity: [
          {
            sets: [
              { reps: 5, amount: 0 },
              { reps: 2, amount: 0 },
              { reps: 8, amount: 0 },
            ],
          },
          {
            sets: [
              { reps: 5, amount: 0 },
              { reps: 2, amount: 0 },
              { reps: 8, amount: 0 },
            ],
          },
          {
            sets: [
              { reps: 5, amount: 0 },
              { reps: 2, amount: 0 },
              { reps: 8, amount: 0 },
            ],
          },
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

  before(() => {
    cy.visit("/");
    cy.get('[data-test="singup-button"]').click();
    cy.get('[data-test="singup-username"]').type(fakeUser.username);
    cy.get('[data-test="singup-password"]').type(fakeUser.password);
    cy.get('[data-test="singup-regist-button"]').click();
    cy.get('[data-test="user-home-greeting"]').should(
      "contain",
      fakeUser.username
    );

    cy.get('[data-test="close-session-button"]').click();
  });

  beforeEach(() => {
    cy.visit("/");

    // singin
    cy.get('[data-test="singin-button"]').click();
    cy.get('[data-test="singin-username"]').type(fakeUser.username);
    cy.get('[data-test="singin-password"]').type(fakeUser.password);
    cy.get('[data-test="singin-login-button"]').click();
    cy.get('[data-test="user-home-greeting"]').should(
      "contain",
      fakeUser.username
    );
  });

  afterEach(() => {});

  it.skip("the user should be able to regist a new account, exit and enter again", () => {
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
    cy.get(`[data-test="user-routine-${fakeRoutine.title}"]`).click();

    let exercise = fakeRoutine.exercises[0];

    cy.get(`[data-test="routineView-exercise-${exercise.name}"]`).click();
    cy.get('[data-test="exercise-name"]').should("contain", exercise.name);

    // checking data
    exercise.sets.forEach((set, idx) => {
      cy.get(`[data-test="exercise-sets-${idx}-reps"]`).should(
        "contain",
        set.reps
      );
      cy.get(`[data-test="exercise-sets-${idx}-amount"]`).should(
        "contain",
        set.amount
      );
    });

    // adding activity
    cy.get('[data-test="exercise-add-activity"]').click();

    // fakeRoutine.activity.forEach((act, idx) => {
    //   cy.get(`[data-test="new-activity-set-${idx}-amount"]`).type(act.sets.reps);
    //   cy.get(`[data-test="new-activity-set-${idx}-amount"]`).click(act.sets.amount);
    // });

    let act = fakeRoutine.exercises[0].activity[0];

    act.sets.forEach((set, idx) => {
      cy.get(`[data-test="new-activity-set-${idx}-reps"]`).type(set.reps);
      cy.get(`[data-test="new-activity-set-${idx}-amount"]`).type(set.amount);
    });
    cy.get('[data-test="new-activity-save-button"]').click();

    cy.get('[data-test="activity-list"]').should(
      "contain",
      new Date().toLocaleDateString()
    );

    act.sets.forEach((set, idx) => {
      // !how the fuck do i get the id!!
      cy.get(`[data-test="activity-${act.id}-set-${idx}"]`);
    });
  });
});

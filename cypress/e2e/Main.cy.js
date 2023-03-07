describe("Main Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      urls: [
        {
          id: 1,
          long_url:
            "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          short_url: "http://localhost:3001/useshorturl/1",
          title: "Awesome photo",
        },
        {
          id: 2,
          long_url: "https://totallynotausabelURL/also/I/like/turtles",
          short_url: "http://localhost:3001/useshorturl/2",
          title: "I like Turtles",
        },
      ],
    });
    cy.visit("http://localhost:3000");
  });
  it("Should have a page title visble", () => {
    cy.get("h1").should("be.visible");
  });

  it("Should display shortened urls", () => {
    cy.get("section").children().should("have.length", 2);
    cy.get("#1")
      .should("be.visible")
      .children()
      .should("contain", "Awesome photo")
      .and("contain", "http://localhost:3001/useshorturl/1")
      .and(
        "contain",
        "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
      );

    cy.get("#2")
      .should("be.visible")
      .children()
      .should("contain", "I like Turtles")
      .and("contain", "http://localhost:3001/useshorturl/2")
      .and("contain", "https://totallynotausabelURL/also/I/like/turtles");
  });

  it("Should have a visible form with inputs", () => {
    cy.get("form").should("be.visible");
    cy.get("#urlInput").should("be.visible");
    cy.get("#titleInput").should("be.visible");
  });

  it("Should display values in inputs when typed into", () => {
    cy.get("#titleInput")
      .type("this is a test")
      .should("have.value", "this is a test");
    cy.get("#urlInput").type("hello").should("have.value", "hello");
  });

  it("Should show a new shortened url on successful post", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      id: 3,
      long_url: "this is a post request",
      short_url: "http://localhost:3001/useshorturl/3",
      title: "Post Test",
    });
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      urls: [
        {
          id: 1,
          long_url:
            "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          short_url: "http://localhost:3001/useshorturl/1",
          title: "Awesome photo",
        },
        {
          id: 2,
          long_url: "https://totallynotausabelURL/also/I/like/turtles",
          short_url: "http://localhost:3001/useshorturl/2",
          title: "I like Turtles",
        },
        {
          id: 3,
          long_url: "this is a post request",
          short_url: "http://localhost:3001/useshorturl/3",
          title: "Post Test",
        },
      ],
    });

    cy.get("#titleInput").type("Post Test").should("have.value", "Post Test");
    cy.get("#urlInput")
      .type("this is a post request")
      .should("have.value", "this is a post request");
    cy.get("button").click();

    cy.get("#1").should("be.visible");
    cy.get("#2").should("be.visible");

    cy.get("#3")
      .should("be.visible")
      .children()
      .should("contain", "Post Test")
      .and("contain", "http://localhost:3001/useshorturl/3")
      .and("contain", "this is a post request");
  });
});

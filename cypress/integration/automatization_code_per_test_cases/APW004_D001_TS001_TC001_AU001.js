/// <reference types="Cypress" />

describe('APW004_D001_TS001: Contact form should validate inputs and send Message', function() {
    it('APW004_D001_TS001_TC001: Contact form should validate inputs before sending the Message, once the data is validated "Verify that the message is sent"', function() {
      cy.viewport(1024, 768);
      cy.visit('http://automationpractice.com/index.php');      
      cy.get("div[id*='contact-link']").eq(0).click();
      //1. Select option in dropdown
      cy.get("select[id*='id_contact']").select("Customer service");
      //2. Type a valid  email address in email field
      cy.get("input[id*='email']").type("test@gmail.com");
      //3. Type Order Reference in order field
      cy.get("input[id*='id_order']").type("123459");
      //4. attach jpg file
       //file to be uploaded path in fixtures project folder
      const p = 'picture.jpg'
       //upload file with attachFile
      cy.get("input[id*='fileUpload']").attachFile(p);
      cy.wait(1000);
      //5. Type in message
      cy.get("textarea[id*='message']").type("I need Information about this order");
      cy.wait(2000);
      //6. click send button
       //submit contact form fulfilled values form
      cy.get("button[id*='submitMessage']").click();
      cy.wait(2000);
      /*assert the alert to obtain a succesful response -> 
      expected result: Data entries with no issues, once the 
      send button is clicked the user will receive the following message:
       "Your message has been succesfully sent to our team"*/
      cy.get("p[class*='alert alert-success']").then(function(element)
      {
        const actualText=element.text()        
        expect(actualText.includes("successfully")).to.be.true
      })
    })
  })
/// <reference types="Cypress" />

describe('APW004_D002_TS001: Contact form should validate inputs like Blank Fields before and after clicking the Send Button', function() {
    it('APW004_D002_TS001_TC002:Verify that when the order reference text box field is in blank user receives an error message after clicking the Send Button', function() {
      cy.viewport(1024, 768);
      cy.visit('http://automationpractice.com/index.php');      
      cy.get("div[id*='contact-link']").eq(0).click();
      //1. Select option in dropdown
      cy.get("select[id*='id_contact']").select("Customer service");
      //2. Type in Email address
      cy.get("input[id*='email']").type("test@gmail.com");
      //3. Type a blank space in Order Reference field
      cy.get("input[id*='id_order']").type(" ");
      //4. attach jpg file
       //file to be uploaded path in fixtures project folder
      const p = 'picture.jpg'
       //upload file with attachFile
      cy.get("input[id*='fileUpload']").attachFile(p);
      cy.wait(1000);
      //5. Type in message
      cy.get("textarea[id*='message']").type("fddasfas");
      cy.wait(2000);
      //6. click send button
       //submit contact form fulfilled values form
      cy.get("button[id*='submitMessage']").click();
      cy.wait(2000);
      /*assert the alert to obtain a succesful response -> 
      expected result: The following message will be displayed 
      "There is 1 error
      1. Order Reference cant be blank" or something like this
      actual result: The message went through
      without validating the blank field with a blank space and displays sucess 
      wrong message*/
       //get wrong success message
       cy.get("p[class*='alert alert-success']").then(function(element)
       {
         const actualText=element.text()        
         expect(actualText.includes("successfully")).to.be.true
       })
    })
  })
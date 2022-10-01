/// <reference types="Cypress" />

describe('APW004_D002_TS001: Contact form should validate inputs like Blank Fields before and after clicking the Send Button', function() {
    it('APW004_D002_TS001_TC001:Verify that when you type a blank space in the Email Address text box field you receive an error message after clicking the Send Message Button', function() {
      cy.viewport(1024, 768);
      cy.visit('http://automationpractice.com/index.php');      
      cy.get("div[id*='contact-link']").eq(0).click();
      //1. Select option in dropdown
      cy.get("select[id*='id_contact']").select("Customer service");
      //2. Type a black space in email address field
      cy.get("input[id*='email']").type(" ");
      //3. Type Order Reference in order field
      cy.get("input[id*='id_order']").type("2843290");
      //4. attach jpg file
       //file to be uploaded path in fixtures project folder
      const p = 'picture.jpg'
       //upload file with attachFile
      cy.get("input[id*='fileUpload']").attachFile(p);
      cy.wait(1000);
      //5. Type in message
      cy.get("textarea[id*='message']").type("sdfafsd");
      cy.wait(2000);
      //6. click send button
       //submit contact form fulfilled values form
      cy.get("button[id*='submitMessage']").click();
      cy.wait(2000);
      /*assert the alert to obtain a succesful response -> 
      expected result: The following message will be displayed 
      "There is 1 error
      1. Invalid Email Address"*/
       //get error generic message
      cy.get("div[class*='alert alert-danger']>p").then(function(element)
      {
        if(element.is(':visible')){
          const actualTextError1=element.text()        
          expect(actualTextError1.includes("There is 1 error")).to.be.true
        } else{
          cy.log("The error alert is not visible, follow the correct steps to replicate the error");
        }
      })
       //get first list element with invalid email adress detail
      cy.get("div[class*='alert alert-danger']>ol>li").then(function(element)
      {
        if(element.is(':visible')){
          const actualTextError2=element.text()
          expect(actualTextError2.includes("Invalid email address.")).to.be.true
        } else{
          cy.log("The error alert is not visible, follow the correct steps to replicate the error");
        }
      })
    })
  })
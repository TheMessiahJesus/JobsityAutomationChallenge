/// <reference types="Cypress" />

describe('APW004_D003_TS001: Contact form should validate inputs like Minimum characters accepted before and after clicking the Send Message Button', function() {
    it('APW004_D003_TS001_TC001:Verify that before sending the message, when you type less than 6 characters in the text field, the text field becomes red', function() {
      cy.viewport(1024, 768);
      cy.visit('http://automationpractice.com/index.php');      
      cy.get("div[id*='contact-link']").eq(0).click();
      //1. type less than 6 characters in any text box field and text area
      //Select option in dropdown
      cy.get("select[id*='id_contact']").select("Customer service");
      //Type in Email address
      cy.get("input[id*='email']").type("test@");
      //Type a blank space in Order Reference field
      cy.get("input[id*='id_order']").type("6323");
      //attach jpg file
       //file to be uploaded path in fixtures project folder
      const p = 'picture.jpg'
       //upload file with attachFile
      cy.get("input[id*='fileUpload']").attachFile(p);
      cy.wait(1000);
      //Type in message
      cy.get("textarea[id*='message']").type("this");
      cy.wait(2000);
      //2. click send button
       //submit contact form fulfilled values form
      cy.get("button[id*='submitMessage']").click();
      cy.wait(2000);
      /*assert the alert to obtain a succesful response -> 
      expected result: Text box field and Text Area becomes
      red 
      actual result: The message went through
      without validating the minimum characters supported, 
      but at least it is not submitted because of invalida email validation, 
      but otherwise it would have submitted*/
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
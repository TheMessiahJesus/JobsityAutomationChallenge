/// <reference types="Cypress" />

describe('APW004_D004_TS001: Contact form should validate inputs like Maximum characters accepted before and after clicking the Send Message Button', function() {
    it('APW004_D004_TS001_TC001:Verify that before sending the message, when you type more than 50 characters in the text fields and more than 350 characters in the text area field, the fields becomes red', function() {
      cy.viewport(1024, 768);
      cy.visit('http://automationpractice.com/index.php');      
      cy.get("div[id*='contact-link']").eq(0).click();
      var generateRandomString = alpha_NumericGenerator(50,"letters");
      var generateRandomNumber = alpha_NumericGenerator(50,"numbers");
      //1. Type in more than 50 characters in the text fields.
      //Select option in dropdown
      cy.get("select[id*='id_contact']").select("Customer service");
      //Type in Email address
      cy.get("input[id*='email']").type(generateRandomString+"@mail.com");
      //Type a blank space in Order Reference field
      cy.get("input[id*='id_order']").type(generateRandomNumber);
      //attach jpg file
       //file to be uploaded path in fixtures project folder
      const p = 'picture.jpg'
       //upload file with attachFile
      cy.get("input[id*='fileUpload']").attachFile(p);
      cy.wait(1000);
      //2. Type in more than 350 characters in the text Area
      //Type in message
      generateRandomString = alpha_NumericGenerator(350,"letters");
      cy.get("textarea[id*='message']").type(generateRandomString);
      cy.wait(2000);
      //2. click send button
       //submit contact form fulfilled values form
      cy.get("button[id*='submitMessage']").click();
      cy.wait(2000);
      /*assert the alert to obtain a succesful response -> 
      expected result: Text box field and Text Area becomes
      red 
      actual result: The message went through
      without validating the maximum characters supported*/
       //get overflow 500 error
       cy.get("div[class*='container']>h2>span").then(function(element)
      {
        const actualText=element.text()        
        expect(actualText.includes("500")).to.be.true
      })
      function alpha_NumericGenerator(lengthP, type) {
        var text = "";
        var possible = "";
        if(type==="letters"){
          possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        } else if(type==="numbers"){
          possible = "0123456789"
        }
        for (var i = 0; i < lengthP; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }
    })
  })
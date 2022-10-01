/// <reference types="Cypress" />

describe('APW004_D001_TS001: Contact form should validate inputs and send Message', function() {
    it('APW004_D001_TS001_TC002:Contact form should validate and display a message when "customer service" or "webmaster" is selected inSubject Heading dropdown "', function() {
      cy.viewport(1024, 768);
      cy.visit('http://automationpractice.com/index.php');      
      cy.get("div[id*='contact-link']").eq(0).click();
      //1. Select Customer Service or Webmaster option in Dropdown, not necessary to fullfill the other fields
        //select customer service option
      cy.get("select[id*='id_contact']").select("Customer service");
      /*assert the prompt up value to check if we obtained what we actually wanted -> 
      expected result: Once "Customer Service" is selected in the dropdown the following message 
      will be displayed: "For any question about a product, an order"*/      
       cy.get(".clearfix>.col-xs-12.col-md-3>p[id*='desc_contact2']").then(function(element)
       {
        if(element.is(':visible')){
          const actualText=element.text()
          expect(actualText.includes("For any question about a product, an order")).to.be.true
        } else{
          cy.log("The element is not visible, please select Customer service option before you proceed");
        }
       })
        //wait 3 seconds
      cy.wait(3000)
        //switch options and assert with webmaster
      cy.get("select[id*='id_contact']").select("Webmaster");
      /*assert the prompt up value to check if we obtained what we actually wanted -> 
      expected result: Once "Webmaster" is selected in the dropdown the following message 
      will be displayed: "If a technical problem occurs on this website"*/
      cy.get(".clearfix>.col-xs-12.col-md-3>p[id*='desc_contact1']").then(function(element)
      {   
        if(element.is(':visible')){
          const actualText=element.text()
          expect(actualText.includes("If a technical problem occurs on this website")).to.be.true
        } else{
          cy.log("The element is not visible, please select Webmaster option before you proceed");
        }
      })
    })
  })
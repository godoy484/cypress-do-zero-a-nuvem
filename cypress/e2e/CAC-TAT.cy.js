describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
      cy.visit('./src/index.html')
    })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('1 - Preenche os campos obrigatórios e envia o formulário', () => {
      const longText = Cypress._.repeat('123456789', 30)

    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('de Godoy')
    cy.get('#email').type('guilherme@teste.com')
    cy.get('#phone').type('11966554666')
    cy.get('#open-text-area').type(longText, {delay:0}) 
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  })

  it('2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('de Godoy')
    cy.get('#email').type('guilhermeteste.com')
    cy.get('#phone').type('11966554666')
    cy.get('#open-text-area').type('Teste') 
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('3 - Campo telefone continua vazio quandp preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('4 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('de Godoy')
    cy.get('#email').type('guilherme@teste.com')      
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('5 - Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Guilherme')
      .should('have.value', 'Guilherme')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName')
      .type('de Godoy')
      .should('have.value', 'de Godoy')
      .clear()
      .should('have.value', '')
    
    cy.get('#email')
      .type('guilherme@teste.com')
      .should('have.value', 'guilherme@teste.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('11966554666')
      .should('have.value', '11966554666')
      .clear()
      .should('have.value', '')    
  })

    it('6 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')      
    })

    it('7.1 - Envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    it('7.2 - Envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        //Com o uso do Commands, é possível alterar os dados abaixo que o cypress já vai alterar no teste
        firstName: 'Guilherme',
        lastName: 'de Godoy',
        email: 'guilherme@teste.com',
        text: 'Teste.'
      }

      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get('.success').should('be.visible')
    })

    it('7.3 - Envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    it('#Aula 3: 1 - Seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')     
    })

    it('#Aula 3: 1.1 - Seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria') 
    })

    it('#Aula 3: 2 - Seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog') 
    })

    it('#Aula 4: 1 - Marca o tipo de atendimento "Feedback"', () => {
      cy.get("[name='atendimento-tat']")      
      .check('feedback')
      .should('be.checked')
      /*Resolução Walmyr
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')*/       
    })

    it('#Aula 4: 1.1 - Marca cada tipo de atendimento', () => {
      cy.get("[name='atendimento-tat']")      
      .check('feedback')
      .should('be.checked').wait(1000)

      cy.get("[name='atendimento-tat']")      
      .check('elogio')
      .should('be.checked').wait(1000)

      cy.get("[name='atendimento-tat']")      
      .check('ajuda')
      .should('be.checked').wait(1000)

      //Resolução Walmyr - Aplicando o "each" e o "wrap"
      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
          .check()
          .should('be.checked')
        })
    })

    it('#Aula 5: 1 - Marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
      .last()
      .check()
      .should('be.checked')
    })

    it('#Aula 5: 1.1 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('de Godoy')
    cy.get('#email').type('guilherme@teste.com')    
    cy.get('#open-text-area').type('Teste')
    cy.get('input[type="checkbox"]')
      .check('phone')
      .should('be.checked')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    // Resolução Walmyr
    /*cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('de Godoy')
    cy.get('#email').type('guilherme@teste.com')      
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')*/    
    })

    it('#Aula 6 - 1 - Seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {          
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('#Aula 6 - 1.1 - Seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json',{ action:'drag-drop'})
        .should(input => {          
          expect(input[0].files[0].name).to.equal('example.json')
      })
    })

    it('#Aula 6 - 2 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(input => {          
          expect(input[0].files[0].name).to.equal('example.json')          
      })
    })

    it('#Aula 7 - 1 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
    })

    it('#Aula 7 - 1.1 - Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })
})
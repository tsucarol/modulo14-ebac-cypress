/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
import contratoUsuario from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.token('carol@qa.com.br', 'teste123').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          //TODO:
          cy.request('usuarios').then(response => {
               return contratoUsuario.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          //TODO:
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[1].nome).to.contain('a') // "contain" para não gerar erro no teste
               expect(response.status).to.equal(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          //TODO:
          let nome = faker.person.fullName()
          let email = faker.internet.email()
          let senha = faker.internet.password()

          cy.cadastrarUsuario(nome, email, senha, 'true')
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          //TODO:
          cy.request({
               method: 'POST',
               url: 'usuarios',
               failOnStatusCode: false,
               body: {
                    "nome": "Ana Carollyne Guimarães",
                    "email": "carol@qa.com.br",
                    "password": "teste123",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal("Este email já está sendo usado")
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          //TODO:
          let email = faker.internet.email()
          cy.cadastrarUsuario("Editar usuário", email, "teste123", "true")
               .then(response => {
                    let id = response.body._id

                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         headers: { authotization: token },
                         body: {
                              "nome": "Usuário editado",
                              "email": email,
                              "password": "teste456",
                              "administrador": "false"
                         }
                    }).then(response => {
                         expect(response.body.message).to.equal("Registro alterado com sucesso")
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          //TODO:
          let email = faker.internet.email()
          cy.cadastrarUsuario("Editar usuário", email, "teste123", "true")
               .then(response => {
                    let id = response.body._id

                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                         headers: { authorization: token }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     });


});

import ApiHelper from '../helpers/ApiHelper'
import ApiTestData from '../testData/ApiTestData'

describe('These tests are used to validate the todo API is functioning as intended', () => {
  it('Makes a get call to the todo API and provides parameter \'id\'  then verifies the result', () => {
    const expectedResponse = ApiTestData.idSearchResults
    const parameters = { id: 1 }
    ApiHelper.makeGetCall('/todos', parameters)
      .then(({ status, body }) => {
        ApiHelper.makeTodoGetAssertions(status, body, expectedResponse)
      })
  })

  it('Makes a call to the todo API and provides parameter \'completed\', then verifies the result', () => {
    const expectedResponse = ApiTestData.completedSearchResults
    const parameters = { completed: true }
    ApiHelper.makeGetCall('/todos', parameters)
      .then(({ status, body }) => {
        ApiHelper.makeTodoGetAssertions(status, body, expectedResponse)
      })
  })

  it.only('Makes a post call to create a todo record. Then, makes a get call to verify the record has the correct data before deleting the record', () => {
    const createTodoBody = ApiTestData.createTodoBody
    let options = { url: '/todos', body: createTodoBody, method: 'post' }
    // Makes a put call to create a data entry with known data.
    ApiHelper.makePostCall('/todos', options.body)
      .then(({ status, body }) => {
        const id = body.id // Getting the created Todo id value to perform a get call
        const parameters = { id } // Creates a hash for the id parameter that will be used in the next get call
        options = { url: '/todos', parameters, method: 'get' }
      })
      .then(({ status, body }) => {
        ApiHelper.makeGetCall('/todos', options.parameters)
          .then(({ status, body }) => {
            cy.log('createToDoBody', createTodoBody)
            ApiHelper.makeTodoGetAssertions(status, body, [createTodoBody])
          })
        const id = body.id // Getting the created Todo id value to perform a get call
        options = { url: '/todos', id, method: 'delete' }
      })
      .then(() => {
        ApiHelper.makeDeleteCall('/todos', options.id)
          .then(({ status }) => {
            ApiHelper.makeStatusAssertion(status, 200)
          })
      })
  })
})

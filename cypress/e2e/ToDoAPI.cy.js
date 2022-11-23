import ApiHelper from '../helpers/ApiHelper'
import ApiTestData from '../testData/ApiTestData'

describe('These tests are used to validate the todo API is functioning as intended', () => {
  it('Makes a get call to the todo API and provides parameter \'id\' and \'completed\', then verifies the result', () => {
    const expectedResponse = ApiTestData.idSearchResults
    const options = { url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: { id: 1 }, method: 'get' }
    ApiHelper.makeApiCall(options)
      .then(({ status, body }) => {
        ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })

  it('Makes a call to the todo API and provides parameter \'completed\', then verifies the result', () => {
    const parameters = { completed: true }
    const expectedResponse = ApiTestData.completedSearchResults
    const options = { url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: { completed: true }, method: 'get' }
    ApiHelper.makeApiCall(options)
      .then(({ status, body }) => {
        ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })

  it('Makes a post call to create a todo record. Then, makes a get call to verify the record has the correct data before deleting the record', () => {
    const createTodoBody = ApiTestData.createTodoBody
    cy.log(createTodoBody)
    let options = { url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', body: createTodoBody, method: 'post' }
    ApiHelper.makeApiCall(options)
      .then(({ status, body }) => {
        const id = body.id
        const parameters = { id }
        options = { url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters, method: 'get' }
      })
      .then(({ status, body }) => {
        ApiHelper.makeApiCall(options)
          .then(({ status, body }) => {
            cy.log('createToDoBody', createTodoBody)
            ApiHelper.makeGetAssertions(status, body, [createTodoBody])
          })
        const id = body.id
        const parameters = { id }
        options = { url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', id, method: 'delete' }
      })
      .then(() => {
        ApiHelper.makeApiCall(options)
      })
  })
})

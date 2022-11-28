import ApiHelper from '../helpers/ApiHelper'
import ApiTestData from '../testData/ApiTestData'

describe('These tests are used to validate the todos API is functioning as intended', () => {
  it('Makes a get call to the todo API and provides parameter \'id\'  then verifies the result', () => {
    const expectedResponse = ApiTestData.idSearchResults 
    const parameters = { id: 1 } 
    // Makes get call with the parameters int he parameters hash
    ApiHelper.makeGetCall('/todos', parameters)
      .then(({ status, body }) => {
        ApiHelper.makeTodoGetAssertions(status, body, expectedResponse)
      })
  })

  it('Makes a call to the todo API and provides parameter \'completed\', then verifies the result', () => {
    const expectedResponse = ApiTestData.completedSearchResults
    const parameters = { completed: true }
    // Makes get call with the parameters int he parameters hash
    ApiHelper.makeGetCall('/todos', parameters)
      .then(({ status, body }) => {
        ApiHelper.makeTodoGetAssertions(status, body, expectedResponse)
      })
  })

  it('Makes a post call to create a todo record. Then, makes a get call with \'id\' parameter and validates the correct data is returned', () => {
    const createTodoBody = ApiTestData.createTodoBody
    let options = { body: createTodoBody }
    // Makes a put call to create a data entry with known data.
    ApiHelper.makePostCall('/todos', options.body)
      .then(({ status, body }) => {
        const parameters = { id: body.id } // Creates a hash for the id parameter that will be used in the next get call
        options = { url: '/todos', parameters }
      })
      .then(({ status, body }) => {
        ApiHelper.makeGetCall('/todos', options.parameters)
          .then(({ status, body }) => {
            ApiHelper.makeTodoGetAssertions(status, body, [createTodoBody])
          })
        options = { id: body.id }
      })
      .then(() => {
        ApiHelper.makeDeleteCall('/todos', options.id)
          .then(({ status }) => {
            ApiHelper.makeStatusAssertion(status, 200)
          })
      })
  })

  it('Makes a post call to create a todo record. Then, makes a get call with \'userName\' parameter and validates the correct data is returned', () => {
    const createTodoBody = ApiTestData.createTodoBody
    let options = { body: createTodoBody }
    // Makes a put call to create a data entry with known data.
    ApiHelper.makePostCall('/todos', options.body)
      .then(({ status, body }) => {
        const parameters = { userName: createTodoBody.userName } // Creates a hash for the userName parameter that will be used in the next get call
        options = { url: '/todos', parameters }
      })
      .then(({ status, body }) => {
        ApiHelper.makeGetCall('/todos', options.parameters)
          .then(({ status, body }) => {
            ApiHelper.makeTodoGetAssertions(status, body, [createTodoBody])
          })
        const id = body.id // Getting the created Todo id value to perform a get call
        options = { id }
      })
      .then(() => {
        ApiHelper.makeDeleteCall('/todos', options.id)
          .then(({ status }) => {
            ApiHelper.makeStatusAssertion(status, 200)
          })
      })
  })

  it('Makes a post call to create a todo record. Then, makes a get call with \'userId\' parameter and validates the correct data is returned', () => {
    const createTodoBody = ApiTestData.createTodoBody
    let options = { body: createTodoBody }
    // Makes a put call to create a data entry with known data.
    ApiHelper.makePostCall('/todos', options.body)
      .then(({ status, body }) => {
        const parameters = { userId: createTodoBody.userId } // Creates a hash for the userId parameter that will be used in the next get call
        options = { url: '/todos', parameters }
      })
      .then(({ status, body }) => {
        ApiHelper.makeGetCall('/todos', options.parameters)
          .then(({ status, body }) => {
            ApiHelper.makeTodoGetAssertions(status, body, [createTodoBody])
          })
        const id = body.id // Getting the created Todo id value to perform a get call
        options = { id }
      })
      .then(() => {
        ApiHelper.makeDeleteCall('/todos', options.id)
          .then(({ status }) => {
            ApiHelper.makeStatusAssertion(status, 200)
          })
      })
  })
})

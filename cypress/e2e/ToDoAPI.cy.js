import ApiHelper from '../helpers/ApiHelper';
import ApiTestData from '../testData/ApiTestData';

describe('These tests are used to validate the todo API is functioning as intended', () => {
  it('Makes a get call to the todo API and provides parameter \'id\' and \'completed\', then verifies the result', () => {
    let expectedResponse = [{"todo":"todo 1","completed": false,"userId": 46196,"id": "1"}]
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: {id: 1}, method: 'get'}
    ApiHelper.makeApiCall(options)
      .then( ({ status, body }) => {
        ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })  
  
  it('Makes a call to the todo API and provides parameter \'completed\', then verifies the result', () => {
    let parameters = {completed  : true}
    let expectedResponse = [
      {"todo":"todo 2","completed":true,"userId":46196,"id":"2"},
      {"todo":"todo 3","completed":true,"userId":84872,"id":"3"}
    ]
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: {completed  : true}, method: 'get'}
    ApiHelper.makeApiCall(options)
      .then( ({ status, body }) => {
        ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })

  it ('Makes a post call to create a todo record. Then, makes a get call to verify the record has the correct data before deleting the record', () => {
    let createTodoBody = ApiTestData.createTodoBody
    cy.log(createTodoBody)
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', body: createTodoBody, method: 'post'}
    ApiHelper.makeApiCall(options)
      .then( ({ status, body }) =>{
        let id = body.id
        let parameters = { id: id }
        options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: parameters, method: 'get'}
      })
      .then( ({ status, body }) => {
        ApiHelper.makeApiCall(options)
          .then(({ status, body }) => {
            cy.log('createToDoBody', createTodoBody)
            ApiHelper.makeGetAssertions(status, body, [createTodoBody])
          })
        let id = body.id
        let parameters = { id: id }
        options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', id: id, method: 'delete'}
      })
      .then(() => {
        ApiHelper.makeApiCall(options)
      })
  })
})
import ApiHelper from '../helpers/ApiHelper';

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
      {"todo":"todo 1","completed":true,"userId":46196,"id":"1"},
      {"todo":"todo 3","completed":true,"userId":84872,"id":"3"}
    ]
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: {completed  : true}, method: 'get'}
    ApiHelper.makeApiCall(options)
      .then( ({ status, body }) => {
        // ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })

  it.only('Makes a post call', () => {
    let createTodoBody = {  
      "todo": "todo 3",
      "completed": true,
      "userId": 84872,
      "userName": "Patty Towne"
    }
    cy.log(createTodoBody)
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', body: createTodoBody, method: 'post'}
    ApiHelper.makeApiCall(options)
      .then( ({ status, body }) => {
        let id = body.id
        options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', id: id, method: 'delete'}
      })
      .then(() => {
        ApiHelper.makeApiCall(options)
      })

  })
})
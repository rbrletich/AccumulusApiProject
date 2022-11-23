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
  
  it('Makes a call to the todo API and pro,vides parameter \'completed\', then verifies the result', () => {
    let parameters = {completed  : true}
    let expectedResponse = [
      {"todo":"todo 1","completed":true,"userId":46196,"id":"1"},
      {"todo":"todo 3","completed":true,"userId":84872,"id":"3"}
    ]
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters: {completed  : true}, method: 'get'}
    ApiHelper.makeApiCall(options)
      .then( ({ status, body }) => {
        ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })

  it('Makes a post call', () => {
    let options = {url: 'https://637d2c3e9c2635df8f833d30.mockapi.io/todos', body: {"todo":"todo 3","completed":true,"userId":84872}, method: 'post'}
    ApiHelper.makeApiCall(options)

  })
})
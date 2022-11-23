import ApiHelper from '../helpers/ApiHelper';

describe('These tests are used to validate the todo API is functioning as intended', () => {
  it('Makes a get call to the todo API and provides parameter \'id\' and \'completed\', then verifies the result', () => {
    let parameters = {id: 1}
    let expectedResponse = [{"todo":"todo 1","completed": true,"userId": 46196,"id": "1"}]
    ApiHelper.makeApiCall('https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters)
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
    ApiHelper.makeApiCall('https://637d2c3e9c2635df8f833d30.mockapi.io/todos', parameters)
      .then( ({ status, body }) => {
        ApiHelper.makeGetAssertions(status, body, expectedResponse)
      })
  })  
 
})
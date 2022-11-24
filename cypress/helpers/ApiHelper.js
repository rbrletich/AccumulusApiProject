class ApiHelper {
  makeApiCall (options) {
    let response = []
    switch (options.method) {
      case 'get':
        response = this.makeGetCall(options.url, options.parameters)
        return response
        break
      case 'post':
        response = this.makePostCall(options.url, options.body)
        return response
        break
      case 'put':
        response = this.makePutCall(options.url, options.body, options.id)
        return response
        break
      case 'delete':
        response = this.makeDeleteCall(options.url, options.id)
    }
    return response
  }

  makeGetCall (url, parameters) {
    url = this.appendParameters(url, parameters)
    const response = cy.request(url)
    cy.log('The response is:', response)
    return response
  }

  makePostCall (url, body) {
    const response = cy.request('POST', url, body)
    return response
  }

  makePutCall (url, body, id) {
    url = url + '/' + id
    const response = cy.request('PUT', url, body, id)
    return response
  }

  makeDeleteCall (url, id) {
    cy.log('id', id)
    url = url + '/' + id
    const response = cy.request('DELETE', url)
    return response
  }

  // This method takes parameters url and parameters.  It uses a for loop to append all parameters to the request url.
  appendParameters (url, parameters) {
    const keys = Object.keys(parameters)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (i === 0) {
      	cy.log('the parameter being appended is:', parameters[key])
        url = url + '?' + key + '=' + parameters[key]
      } else {
        url = url + '&' + key + '=' + parameters[key]
      }
    }
    cy.log('This is the url:', url)
    return url
  }

  // This takes parameters status, body, and expectedResults.  First it verifies a 200 status is returned and verifies
  // the expected number of responses are returned in the body.  It then iterates through each key value pair for each
  // value in the expected results array and performs assertions to confirm the response body contains the expected values.
  makeGetAssertions (status, body, expectedResponse, expectedStatus = 200) {
    this.makeStatusAssertion(status, expectedStatus) // Confirms the status matches the 
	  this.makeResponseAssertions(body, expectedResponse)  
  }

  makeResponseAssertions(body, expectedResponse){
    expect(body.count).to.eq(expectedResponse.length)
    for (let i = 0; i <expectedResponse.length; i++) {
      let keys = Object.keys(expectedResponse[i]) //  Gets the keys passed in expectedRespons to select which validations will be performed.
      for (let j=0; j<keys.length; j++){
        cy.log('The following assertion verifies the value of ' + keys[j] + 'returned in the API response matches the expected value')
        expect(body.todos[i][keys[j]]).to.eq(expectedResponse[i][keys[j]])
      }
    }
  }

  makeStatusAssertion (status, expectedStatus) {
    expect(status).to.eq(expectedStatus)
  }
}

module.exports = new ApiHelper()

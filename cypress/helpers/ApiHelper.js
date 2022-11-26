class ApiHelper {
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

  // This methos is used to append the url to make get calls if one or more parameters are to be passed in.
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

  // This takes parameters status, body, and expectedResponse, and an options expected Status.  It then calls
  // makeStatusAssertions and makeTodResponseAssertions to valide the response functions as expected.
  makeTodoGetAssertions (status, body, expectedResponse, expectedStatus = 200) {
    this.makeStatusAssertion(status, expectedStatus) // Confirms the response status matches the expected value
	  this.makeTodoResponseAssertions(body, expectedResponse) // Performs assertions on the response body
  }

  // This method is used to make assertion on the body of the Todo API response.
  makeTodoResponseAssertions (body, expectedResponse) {
    expect(body.count).to.eq(expectedResponse.length)
    // Iterate through each element of the expectedResponse array to allow for multiple Todos to be validated if a response
    // is expected to return multiple Todos.
    for (let i = 0; i < expectedResponse.length; i++) {
      const keys = Object.keys(expectedResponse[i]) //  Gets the keys passed in expectedRespons to select which validations will be performed.
      // Iterate through each key in the expectedResponse value to validate the expected values returned.  Any key value pair provided in
      // expectedResponse will be validated against the API response.
      for (let j = 0; j < keys.length; j++) {
        cy.log('The following assertion verifies the value of ' + keys[j] + 'returned in the API response matches the expected value')
        expect(body.todos[i][keys[j]]).to.eq(expectedResponse[i][keys[j]])
      }
    }
  }

  // This method is used to verify the expected status was returned by an API call.
  makeStatusAssertion (status, expectedStatus = 200) {
    expect(status).to.eq(expectedStatus)
  }
}

module.exports = new ApiHelper()

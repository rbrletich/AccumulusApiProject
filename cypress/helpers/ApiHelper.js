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

  // This takes parameters status, body, and expected results.  First it verifies a 200 status is returned
  //  It iterates through the response body to verify the expected values are returned returned in the response.
  makeGetAssertions (status, body, expectedResponse, expectedStatus = 200) {
    this.makeStatusAssertion(status, expectedStatus)
    if (expectedResponse != []) expect(body.count).to.eq(expectedResponse.length)
    for (let i = 0; i < expectedResponse.length; i++) {
	  expect(body.todos[i].todo).to.eq(expectedResponse[i].todo)
	  expect(body.todos[i].completed).to.eq(expectedResponse[i].completed)
	  if (typeof expectedResponse[i].id !== 'undefined')expect(body.todos[i].id).to.eq(expectedResponse[i].id)
	}
  }

  makeStatusAssertion (status, expectedStatus) {
    expect(status).to.eq(expectedStatus)
  }
}

module.exports = new ApiHelper()

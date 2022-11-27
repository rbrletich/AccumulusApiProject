This project features tests to cover a basic 'todos' API that uses a get call to returns a list of todo items 

API endpoint: https://637d2c3e9c2635df8f833d30.mockapi.io/todos

To run the tests:

1) Clone the git repository
2) Navigate to the AccumulusApiAutomationProject directory
3) Use npm install to install the project dependencies
4a) Use 'npx cypress run --e2e' to run the e2e
	i) The test will run and results are available in the terminal
	ii) You can view an html report of the run in the '/AccumulusApiAutomationProject/report/html' directory
4b) Use 'npx cypress open' to open cypress
	i) Select 'E2E testing'
	ii) Select the browser to test and click the 'Start E2E Testing in ...'
	iii) Click the 'TodoApi.cy.js' spec
	iv) The tests will run
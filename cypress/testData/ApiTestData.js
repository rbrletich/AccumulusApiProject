class ApiTestData {
  createTodoBody = {
    todo: 'Finish the Accumulus coding challenge',
    completed: false,
    userId: 84872,
    userName: 'Patty Towne'
  }

  updateTodoBody = {
    todo: 'Finish the Accumulus coding challenge',
    completed: true,
    userId: 2345,
    userName: 'Richard Brletich'
  }

  undoUpdateTodoBody = {
    todo: 'Finish the Accumulus coding challenge',
    completed: false,
    userId: 2345,
    userName: 'Richard Brletich'
  }

  idSearchResults = [
    {
      todo: 'todo 1',
      completed: false,
      userId: 69657,
      id: '1'
    }
  ]

  completedSearchResults = [
    { todo: 'todo 2', completed: true, userId: 82049, id: '2' },
    { todo: 'todo 3', completed: true, userId: 99953, id: '3' }
  ]
}

module.exports = new ApiTestData()

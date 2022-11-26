class ApiTestData {
  
  createTodoBody = {
    todo: 'Finish the Accumulus coding challenge',
    completed: false,
    userId: 84872,
    userName: 'Richard Brletich'
  }

  idSearchResults = [
    {
      todo: 'todo 1',
      completed: false,
      userId: 25557,
      id: '1'
    }
  ]

  completedSearchResults = [
    { todo: 'todo 2', completed: true, userId: 44629, id: '2' },
    { todo: 'todo 3', completed: true, userId: 72704, id: '3' }
  ]
}

module.exports = new ApiTestData()

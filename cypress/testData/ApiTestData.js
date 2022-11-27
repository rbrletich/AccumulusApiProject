class ApiTestData {
  // This is used to create a custom 'Todo' record then perform assertions against the created record  
  createTodoBody = {
    todo: 'Finish the Accumulus coding challenge',
    completed: false,
    userId: 84872,
    userName: 'Richard Brletich'
  }

  // This is used to perform assertions against the Todo record with id: 1
  idSearchResults = [
    {
      todo: 'todo 1',
      completed: false,
      userId: 25557,
      id: '1'
    }
  ]

  // This is used to perform assertions against the Todo records with complated: true
  completedSearchResults = [
    { todo: 'todo 2', completed: true, userId: 44629, id: '2' },
    { todo: 'todo 3', completed: true, userId: 72704, id: '3' }
  ]
}

module.exports = new ApiTestData()

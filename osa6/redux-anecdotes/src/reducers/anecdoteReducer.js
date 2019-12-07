import anecdotesService from '../services/anecdotes'

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll() 
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
  
}

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id !== action.data.id ? a : action.data).sort((a, b) => b.votes - a.votes)

    case 'ADD':
      return state.concat(action.data).sort((a, b) => b.votes - a.votes)

    case 'INIT_ANECDOTES':
        return action.data.sort((a, b) => b.votes - a.votes)

    default: 
      return state
  }
}

export default anecdoteReducer
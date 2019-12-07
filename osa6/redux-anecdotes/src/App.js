import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initAnecdotes()
  },[props])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)
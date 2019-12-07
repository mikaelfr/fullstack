import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const increment = (str) => {
    store.dispatch({
      type: str
    })
  }

  return (
    <div>
      <button onClick={() => increment('GOOD')}>hyvä</button> 
      <button onClick={() => increment('OK')}>neutraali</button> 
      <button onClick={() => increment('BAD')}>huono</button>
      <button onClick={() => increment('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

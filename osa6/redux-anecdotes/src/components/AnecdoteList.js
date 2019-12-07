import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.addVote(anecdote)

        const content = props.visibleAnecdotes.filter(e => e.id === anecdote.id)[0].content 
        props.setNotification(`you voted '${content}'`, 5)
    }

    return(
        <div>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
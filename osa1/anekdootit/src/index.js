import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Anecdote = ({title, anecdote, points}) => (
    <>
        <h1>{title}</h1>
        <p>{anecdote}</p>
        <p>has {points} votes</p>
    </>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(6).fill(0))

    const indexOfMostVotes = points.indexOf(Math.max(...points))

    const setSelection = () => setSelected(Math.floor((Math.random() * 6)))
    const addPoints = (anecdote) =>  {
        const copy = [...points]
        copy[anecdote]++
        setPoints(copy)
    }
 
    return (
        <div>
            <div>
                <Anecdote title={'Anecdote of the day'} anecdote={props.anecdotes[selected]} points={points[selected]} />
                <Button handleClick={() => addPoints(selected)} text={'vote'} />
                <Button handleClick={setSelection} text={'next anecdote'} />
            </div>
            <div>
                <Anecdote title={'Anecdote with most votes'} anecdote={props.anecdotes[indexOfMostVotes]} points={points[indexOfMostVotes]} />
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));


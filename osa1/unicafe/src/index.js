import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Feedback = ({handlerGood, handlerNeutral, handlerBad}) => (
    <div>
        <h1>Give feedback</h1>
        <Button handleClick={handlerGood} text='good' />
        <Button handleClick={handlerNeutral} text='neutral' />
        <Button handleClick={handlerBad} text='bad' />
    </div>
)

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad)/all || 0
    const positive = good/all || 0

    if (all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <Statistic text={'good'} value={good} />
                    <Statistic text={'neutral'} value={neutral} />
                    <Statistic text={'bad'} value={bad} />
                    <Statistic text={'all'} value={all} />
                    <Statistic text={'average'} value={average} />
                    <Statistic text={'positive'} value={positive} />
                </tbody>
            </table>
        </div>
    )
}
    

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handlerGood = () => setGood(good + 1)
    const handlerNeutral = () => setNeutral(neutral + 1)
    const handlerBad = () => setBad(bad + 1)

    return (
        <div>
            <Feedback handlerGood={handlerGood} handlerNeutral={handlerNeutral} handlerBad={handlerBad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

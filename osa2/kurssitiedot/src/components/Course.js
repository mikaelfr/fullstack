import React from 'react'

const Header = props =>
<h2>{props.course}</h2>

const Total = props => {
const total = props.parts.reduce((s, p) => s + p.exercises, 0)

return <b>yhteensä {total} tehtävää</b>
}


const Part = props =>
<p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  const parts = (props) => props.parts.map(part => <Part key={part.id} part={part} />)

  return (
      <div>
          {parts(props)}
      </div>
  )
}

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
import React from 'react'

const Persons = ({persons, filter, deleteElement}) => {
    const rows = () => persons.map(person => {
        if (person.name.concat(' ').concat(person.number).toLowerCase().includes(filter.toLowerCase()))
        {
          return <p key={person.name}>{person.name} {person.number} <button onClick={() => deleteElement(person.id)}>delete</button></p>
        }
        return null
      })

    return (
        <>
        {rows()}
        </>
    )
}

export default Persons
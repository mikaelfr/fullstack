import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import { getAll, create, deletePerson, updateNumber } from './services/Server'

import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    }

    console.log(persons)

    if (persons.map(p => p.name).includes(newName))
    {
      if (window.confirm(`${person.name} is already added to phonebook, replace old number with a new one?`)) {
        const p = persons.filter(p => p.name === newName)[0]

        updateNumber(p, newNumber)
        .then(response => {
          setPersons(persons.map(pers => pers.id !== p.id ? pers : response))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`${person.name}'s number changed succesfully`)
          setTimeout(() => { setSuccessMessage(null) }, 3000)
        })
        .catch(error => {
          setPersons(persons.filter(pers => pers.id !== p.id))
          setErrorMessage(`${person.name} was already deleted from server`)
          setTimeout(() => { setErrorMessage(null) }, 3000)
        })
      }
      
      return;
    }

    create(person)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`${person.name} added succesfully`)
        setTimeout(() => { setSuccessMessage(null) }, 3000)
      })
      .catch(error => {
        setErrorMessage(`Couldn't add ${person.name}`)
        setTimeout(() => { setErrorMessage(null) }, 3000)
      })
    }

  const deleteElement = id => {
    const person = persons.filter(p => p.id === id)[0]
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        setSuccessMessage(`${person.name} removed succesfully`)
        setTimeout(() => { setSuccessMessage(null) }, 3000)
      })
      .catch(error => {
        setPersons(persons.filter(pers => pers.id !== id))
        setErrorMessage(`${person.name} was already deleted from server`)
        setTimeout(() => { setErrorMessage(null) }, 3000)
      })
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteElement={deleteElement} />
    </div>
  )
}

export default App
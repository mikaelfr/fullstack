import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const updateNumber = (person, newNumber) => {
    const url = `${baseUrl}/${person.id}`
    const changedPerson = { ...person, number: newNumber }
    const request = axios.put(url, changedPerson)
    return request.then(response => response.data)
}

export { getAll, create, deletePerson, updateNumber }
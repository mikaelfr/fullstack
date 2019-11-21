require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/person")

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
    .then(person => {
        res.json(person.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${Date().toString()}</p>`)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = new Person ({
        name: body.name,
        number: body.number,
        _id: body.id
    })

    Person.findByIdAndUpdate(body.id, person, { new: true })
    .then(updated => {
        res.json(updated.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number missing' })
    }

    Person.find({ name: body.name })
    .then(result => {
        if (result.length > 0) {
            return res.status(400).json({ error: 'name must be unique' })
        }
        else {
            const person = new Person({
                "name": body.name,
                "number": body.number
            })
        
            person.save().then(response => {
                res.json(response.toJSON())
            })
            .catch(error => next(error))
        }
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    response.status(404).end()

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
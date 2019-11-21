const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("password required")
    process.exit(1)
} 

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-vvk6k.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    console.log("phonebook:")
    Person.find({})
    .then(persons => {
        persons.forEach(p => console.log(`${p.name} ${p.number}`))
        mongoose.connection.close()
    })
}
else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    })
}

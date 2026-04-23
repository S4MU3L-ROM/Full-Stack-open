import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/Form.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import personService from './services/persons'
import './index.css'
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState('success')

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const showMessage = (text, type = 'success') => {
        setMessage(text)
        setMessageType(type)

        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const add = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        )

        if (existingPerson) {
            const confirmUpdate = window.confirm(
                `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
            )

            if (!confirmUpdate) {
                return
            }

            const updatedPerson = {
                ...existingPerson,
                number: newNumber
            }

            personService
                .update(existingPerson.id, updatedPerson)
                .then(response => {
                    setPersons(
                        persons.map(person =>
                            person.id !== existingPerson.id ? person : response.data
                        )
                    )
                    showMessage(`Changed ${response.data.name}'s number`, 'success')
                    setNewName('')
                    setNewNumber('')
                })
                .catch(() => {
                    showMessage(
                        `Information of ${existingPerson.name} has already been removed from server`,
                        'error'
                    )
                    setPersons(persons.filter(person => person.id !== existingPerson.id))
                })

            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(response.data))
                showMessage(`Added ${response.data.name}`, 'success')
                setNewName('')
                setNewNumber('')
            })
            .catch(() => {
                showMessage('The person could not be added', 'error')
            })
    }

    const deletePerson = (id, name) => {
        const confirmDelete = window.confirm(`Delete ${name}?`)

        if (!confirmDelete) {
            return
        }

        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
                showMessage(`Deleted ${name}`, 'success')
            })
            .catch(() => {
                showMessage(
                    `Information of ${name} has already been removed from server`,
                    'error'
                )
                setPersons(persons.filter(person => person.id !== id))
            })
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} type={messageType} />

            <Filter search={search} handleSearchChange={handleSearchChange} />

            <h3>Add a new</h3>

            <PersonForm
                add={add}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons
                personsToShow={personsToShow}
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App
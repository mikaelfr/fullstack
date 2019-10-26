import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Info from './Info';
import Filter from './Filter';

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
 
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const rows = () => {
    if (filter.length === 0) {
      return null
    }

    const filteredArray = countries
    .filter(country => {
      if (country.name.toLowerCase().includes(filter.toLowerCase())) {
        return true
      }
      return false
    })

    console.log()

    if (filteredArray.length >= 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (filteredArray.length === 1) {
      return <Info data={filteredArray[0]} />
    }

    return filteredArray.map(country => {
      return <Filter key={country.name} name={country.name} setFilter={setFilter} />
    })
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        {rows()}
      </div>
    </>
  );
}

export default App;

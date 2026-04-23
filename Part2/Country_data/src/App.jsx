import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Countries from "./Components/Countries.jsx";

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => setCountries(response.data))
  } , []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
      <div>
        <div>
          find countries <input value={search} onChange={handleSearchChange} />
        </div>

        <Countries countries={filteredCountries} search = {search} onShowCountry={setSearch}/>
      </div>
  )
}




export default App

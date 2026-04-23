const Countries = ({ countries, search, onShowCountry }) => {
    if (search === "") {
        return <p></p>
    }
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => (
                    <div key={country.cca3}>
                        <p>{country.name.common}</p>
                        <button onClick={() => onShowCountry(country.name.common)}>Show</button>
                    </div>
                ))}
            </div>
        )
    }

    if (countries.length === 1) {
        const country = countries[0]

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital?.[0]}</p>
                <p>Area {country.area}</p>

                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages || {}).map(language => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>

                <img
                    src={country.flags.png}
                    alt={`flag of ${country.name.common}`}
                    width="150"
                />
            </div>
        )
    }

    return null
}

export default Countries
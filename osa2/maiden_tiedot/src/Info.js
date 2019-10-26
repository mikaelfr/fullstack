import React from 'react'
import Weather from './Weather'

const Info = ({ data }) => {
    const languages = () => data.languages.map(language => {
        return <li key={language.iso639_1}>{language.name}</li>
    })

    return (
        <div>
            <h2>{data.name}</h2> 
            <p>capital {data.capital}</p>
            <p>population {data.population}</p>
            
            <h3>languages</h3>
            <ul>
                {languages()}
            </ul>

            <img src={data.flag} alt="flag" style={{width: 100 + '%', maxWidth: 300 + 'px'}} />

            <Weather country={data.name} />
        </div>
    )
}

export default Info
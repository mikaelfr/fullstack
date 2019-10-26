import React from 'react'

const Filter = ({name, setFilter}) => {
    return (
        <>
            <p>{name} <button onClick={() => setFilter(name)}>show</button></p>
        </>
    )
}

export default Filter
import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const onFilterChange = event => {
        event.preventDefault()
        props.filterChange(event.target.value)
    }

    return(
        <div>
            filter <input type='text' onChange={onFilterChange}></input>
        </div>
    )
}

const mapDispatchToProps = {
    filterChange
}

export default connect(null, mapDispatchToProps)(Filter)
import React, {Fragment,Component} from 'react'

const SearchField = (props) =>{
    const {onHandleChange, onHandleSubmit, state} = props
    return(
        <form>
            <small>Enter The Search Text Here</small><br/>
            <input value={state.searchData} name='searchData' onChange={onHandleChange}/><br/>
            <button onClick={onHandleSubmit}>Search</button>
        </form>
    )
}

export default SearchField
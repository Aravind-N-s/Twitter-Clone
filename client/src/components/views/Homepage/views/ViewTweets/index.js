import React,{Fragment, Component} from 'react'   

const ViewTweet = (props) =>{
    const {receivedData} = props.state
    console.log(receivedData)
    return(
        <Fragment>
            {receivedData.length == 0 ? (
                'Create A Search Request'
            ) : (
                receivedData.map(x => {
                    return <h5 key={x}>{x}</h5>
                })
            )}
        </Fragment>
    )
}

export default ViewTweet
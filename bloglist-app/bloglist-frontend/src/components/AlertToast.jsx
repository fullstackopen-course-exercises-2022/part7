import React from 'react'

const AlertToast = (props) => {
    if(props.message.includes('ERROR')) {
        return (
            <div className="alert alert-danger" id="error">
                {props.message === null ? null : props.message}
            </div>
        )
    } else {
        return (
            <div className="alert alert-success" id="success">
                {props.message === null ? null : props.message}
            </div>
        )
    }
}

export default AlertToast
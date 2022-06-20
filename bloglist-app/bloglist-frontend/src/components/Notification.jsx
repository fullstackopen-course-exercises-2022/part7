import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
    if(notification === null) {
        return null
    }
    return (
        <div className="alert-info">{notification}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const connectNotification = connect(mapStateToProps)(Notification)

export default connectNotification
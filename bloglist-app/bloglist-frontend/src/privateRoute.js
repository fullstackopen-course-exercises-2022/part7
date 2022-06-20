import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const currentUser = useSelector(state => state.auth)
    const { user } = currentUser
    if(!user) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return children
}

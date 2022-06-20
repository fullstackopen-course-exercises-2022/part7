import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { initializeUsers } from '../features/users/usersReducer'

function UsersView({ users }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])
    return (
        <div>
            {users?.length > 0 ? users.map(user => (
                <div key={user.id}>
                    <h3><a href={`/user/${user.id}`}>{user.name}</a></h3>
                    <p>{user.username}</p>
                    <p>{user.blog.length}</p>
                </div>
            )): <p>No users currently found</p>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const connectUsers = connect(mapStateToProps)(UsersView)

export default connectUsers
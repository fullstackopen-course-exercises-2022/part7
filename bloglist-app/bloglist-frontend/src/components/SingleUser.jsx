import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { initializeUsers } from '../features/users/usersReducer'

function SingleUser({ users }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])
    const { userId } = useParams()
    const singleUser = users.find(user => user.id === userId)
    return (
        <div>
            <h4>{singleUser?.name}</h4>
            <p>{singleUser?.username}</p>
            <div>
                {singleUser?.blog?.length > 0 ? singleUser?.blog?.map(userBlog => (
                    <span key={userBlog?.id}>
                        <h5>{userBlog?.title}</h5>
                        <p>{userBlog?.author}</p>
                        <a href={userBlog?.url}>{userBlog?.title}</a>
                        <p>{userBlog?.likes}</p>
                    </span>
                )): <p>No blogs found by this user!</p>}
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const connectUsers = connect(mapStateToProps)(SingleUser)

export default connectUsers
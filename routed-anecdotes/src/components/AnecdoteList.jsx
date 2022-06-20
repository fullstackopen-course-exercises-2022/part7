import React from 'react'
import { useNavigate } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} onClick={() => navigate(`/anecdote/${anecdote.id}`)}>{anecdote.content}</li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList

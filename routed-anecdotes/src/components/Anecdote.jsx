import React from 'react'
import {useParams} from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const { anecdoteId } = useParams()
  const anecdote = anecdoteId ?
    anecdotes.find(anecdote => anecdote.id === Number(anecdoteId)) : null

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdote.content}
      </ul>
    </div>
  )
}

export default Anecdote
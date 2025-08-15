import { useDispatch, useSelector } from 'react-redux'
import { Upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const Anecdote = ({ anecdote, handleUpvote }) => {
  return(
      <div>
          <div>
            {anecdote.content} 
          </div>
          <div>
            has {anecdote.votes} 
            <button onClick={handleUpvote}>vote</button>
          </div>
      </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }

    const filteredList = anecdotes.filter(( a ) => a.content.includes(filter))
    const sortedList = filteredList.sort((currentAnecdote, nextAnecdote) => nextAnecdote.votes - currentAnecdote.votes)
    return  sortedList
  })

  const handleLike = (id, content) =>{
    dispatch(Upvote(id))
    dispatch(setNotification(`you voted '${content}'`, 5000))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleUpvote={() => handleLike(anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
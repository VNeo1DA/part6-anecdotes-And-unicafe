import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote} from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const  dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }, 
    onError: (error) => {
      const errorEncountered = error.response.data
      console.log(errorEncountered.error)
      dispatch({type: 'ERROR', payload: { content : errorEncountered.error }})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({type: 'ADD', payload: { content : content }})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm
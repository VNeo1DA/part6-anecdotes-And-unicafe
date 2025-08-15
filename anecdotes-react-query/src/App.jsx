
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useNotificationDispatch } from './NotificationContext'
import  Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'

function App() {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const  dispatch = useNotificationDispatch()
  
  const handleVote = (anecdote) => {
    console.log('voted')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: 'VOTE', payload: { content : anecdote.content }})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  
  if (result.error){
    return <div>anecdote service not available due to problems in server</div>
  }
  console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  return (  
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>        
      )}
      <br/>
      <AnecdoteForm />
    </div>
  )
}

export default App
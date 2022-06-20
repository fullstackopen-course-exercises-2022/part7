import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'

const CreateNew = (props) => {
    const navigate = useNavigate()
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const reset = (evt) => {
        evt.preventDefault();
        content.resetForm()
        author.resetForm()
        info.resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/anecdotes')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form>
                <div>
                    content
                    <input name='content' {...content} />
                </div>
                <div>
                    author
                    <input name='author' {...author} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...info} />
                </div>
                <button onClick={handleSubmit}>create</button>
                <button onClick={reset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew
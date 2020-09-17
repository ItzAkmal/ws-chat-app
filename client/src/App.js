import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import socket from './socket'

const App = () => {
	const [username, setUsername] = useState('')
	const [messages, setMessages] = useState([])
	const inputRef = useRef()

	useEffect(() => {
		let name = prompt('Username')
		while (!name || name === '') {
			name = prompt('Username\nError: Username cannot be empty!')
		}
		if (name === '') {
			name = 'username<NULL>'
		}
		setUsername(name)

		inputRef.current.focus()

		socket.on('recieve-message', (data) => {
			setMessages((prev) => [data, ...prev])
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)

		const messageObject = {
			username,
			body: formData.get('message'),
		}

		// setMessages([...messages, messageObject])
		socket.emit('send-message', messageObject)
		e.target.reset()
	}

	const focus = () => {
		inputRef.current.focus()
	}

	return (
		<div
			onClick={focus}
			className='flex flex-col items-center justify-center w-screen h-screen bg-blue-300'>
			<div className='flex w-full h-full sm:w-1/2'>
				<div className='flex flex-col flex-grow w-full mx-5 my-20 overflow-hidden border border-gray-700 rounded-md sm:mx-0 '>
					<div className='flex items-center justify-between h-12 space-y-0 bg-indigo-500'>
						<span className='ml-5 text-4xl font-semibold text-white uppercase'>
							Chatter
						</span>
						<span className='px-2 py-0 mr-5 text-center bg-indigo-400 rounded-md right-5'>
							User - <span className='font-semibold'>{username}</span>
						</span>
					</div>
					<div className='flex flex-col-reverse flex-grow overflow-y-auto bg-white'>
						{messages.map((data, i) => (
							<Message message={data} key={i} index={i} />
						))}
					</div>
					<form
						onSubmit={handleSubmit}
						className='flex border-t border-gray-900'>
						<input
							name='message'
							type='text'
							ref={inputRef}
							autoComplete='off'
							className='w-full px-4 py-2 text-black placeholder-black transition duration-300 ease-in-out bg-gray-500 focus:bg-gray-300 focus:outline-none'
							placeholder='Message...'
						/>
						<button
							type='submit'
							className='px-4 py-2 text-white uppercase transition duration-300 ease-in-out bg-indigo-500 rounded-none focus:outline-none hover:bg-indigo-700'>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

const Message = ({ message, index }) => {
	const even = index % 2 === 0
	return (
		<div
			className={clsx(
				'w-full px-3 py-2 border-b border-gray-600',
				even ? 'bg-gray-100' : ''
			)}>
			<div className='text-xl font-semibold text-blue-500'>
				{message.username}
			</div>
			<div>{message.body}</div>
		</div>
	)
}

export default App

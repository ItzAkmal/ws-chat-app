import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import socket from './socket'

const App = () => {
	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen bg-blue-300'>
			<div className='flex w-1/2 h-full'>
				<div className='flex flex-col flex-grow w-full my-20 overflow-hidden border border-gray-700 rounded-md '>
					<div className='flex items-center justify-center h-12 bg-indigo-500'>
						<span className='text-4xl font-semibold text-white uppercase'>
							Chatter
						</span>
					</div>
					<div className='flex flex-col-reverse flex-grow overflow-y-auto bg-white'>
						{[...Array(15)].map((data, i) => (
							<Message index={i} />
						))}
					</div>
					<div className='flex border-t border-gray-900'>
						<input
							type='text'
							className='w-full px-4 py-2 text-black placeholder-black transition duration-300 ease-in-out bg-gray-500 focus:bg-gray-300 focus:outline-none'
							placeholder='Message...'
						/>
						<button className='px-4 py-2 text-white uppercase transition duration-300 ease-in-out bg-indigo-500 rounded-none focus:outline-none hover:bg-indigo-700'>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const Message = ({ index }) => {
	const even = index % 2 === 0
	return (
		<div
			className={clsx(
				'w-full px-3 py-2 border-b border-gray-600',
				even ? 'bg-gray-300' : ''
			)}>
			<div className='text-xl font-semibold text-blue-500'>Akmal</div>
			<div>This is the message</div>
		</div>
	)
}

export default App

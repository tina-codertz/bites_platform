import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen  bg-blue-300'>
        <div className='py-7 px-5 items-center bg-gray-100 rounded-lg'>
            <h1 className='mb-8 font-bold text-2xl'>Welcome to T-square bites point </h1>
        <Link to="/items" className='py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-800  justify-center'>View items</Link>

        </div>

    </div>
  )
}

export default Home
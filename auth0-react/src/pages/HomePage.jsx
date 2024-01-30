import React from 'react'
import LogoutButton from '../components/LogoutButton';
import Profile from '../components/Profile';

const  HomePage = () => {
  return (
    <div className='w-fit mx-auto py-10 p-5 h-full bg-red-200'>
        <div className='text-2xl flex justify-center w-fit mx-auto'>Home Page</div>
        <LogoutButton/>
        <Profile/>
    </div>
  )
}

export default HomePage
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {

  const loginStatus = useSelector((state) => state.auth)

  return !loginStatus ? (
    <div className='text-center mt-10 align-middle p-10'>Please Login First to add Company name</div>
  ) : (
    <>
    <div className='text-center'>
      You Logged in
    </div>
    </>
  )
}

export default Home
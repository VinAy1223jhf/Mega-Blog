import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth_serices';
import { login, logout } from './store/authSlice';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom'



function App() {

  useEffect(() => {
    authService.getCurrentUser() // getCurrentUse vala method run krwao
      .then((userData) => { // agr getCurentuser vala mathod chl gya aur koi error na aaya
        if (userData) { // agr userdata hai kuch
          dispatch(login({ userData }));
        } else {
          dispatch(logout())
        }
      })

      .finally(() => setLoading(false));
  }, [])


  const [loading, setLoading] = useState(true);//agr data na aaye toh loading ka icon dikhana hai, isiliye state bnai
  const dispatch = useDispatch()

  return !loading ? (

    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <h1>Hello</h1>
}


export default App

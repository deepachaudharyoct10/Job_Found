import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navbar}  from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Login, Signup } from './components/auth/Login'
const appRouter = createBrowserRouter([{
  path:'/',
  element:<Home></Home>
},{
  path:'/login',
  element:<Login></Login>
},
{
path:'/signup',
element:<Signup></Signup>
}


])
function App() {

  return (
    <>
    {/* <Navbar></Navbar> */}
    <RouterProvider router ={appRouter}></RouterProvider>
       
    </>
  )
}

export default App

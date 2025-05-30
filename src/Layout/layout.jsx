import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <>
    <Outlet/>
    </>
  )
}

export default layout

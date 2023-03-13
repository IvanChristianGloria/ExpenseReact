import React from 'react'
import Navbar from './module/Navbar/Navbar'
import Home from './module/Home/Home'
import Table from './module/Table/Table'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Router = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/table' element={<Table/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )

} 

export default Router
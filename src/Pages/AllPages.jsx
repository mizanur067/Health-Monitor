import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './HomePage'
const AllPages = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                </Routes>
            </Router>


        </div>
    )
}

export default AllPages
import React from 'react'
import {Routes, Route ,BrowserRouter as Router} from 'react-router-dom';
import Userlayout from './Userlayout';
import LandingPageSkill from './skill/LandingPage';
import LandingPageExpense from './expense/LandingPage';
const RoutesFile = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Userlayout/>} />
            <Route path="/skill" element={<LandingPageSkill/>}/>
            <Route path="/expense" element={<LandingPageExpense/>}/>
        </Routes>
    </Router>
  )
}

export default RoutesFile
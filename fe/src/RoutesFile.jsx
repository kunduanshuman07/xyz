import React, { Suspense } from 'react'
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Userlayout from './Userlayout';
import LandingPageSkill from './skill/LandingPage';
import LandingPageExpense from './expense/LandingPage';
import LoginComponent from './common/LoginComponent';
import { useAuth } from './context/AuthProvider';
import { LinearProgress } from '@mui/material';
const RoutesFile = () => {
  const { auth } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path='/*'
          element={
            <Suspense fallback={<LinearProgress color='info' />}>
              {auth ? <Userlayout /> : <Navigate to="/auth" replace />}
            </Suspense>
          }
        />
        <Route path="/auth" element={<LoginComponent />} />
        <Route path="/skill/*" element={
          <Suspense fallback={<LinearProgress color='info' />}>
            {auth ? <LandingPageSkill /> : <Navigate to="/auth" replace />}
          </Suspense>
        } />
        <Route path="/expense/*" element={
          <Suspense fallback={<LinearProgress color='info' />}>
            {auth ? <LandingPageExpense /> : <Navigate to="/auth" replace />}
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default RoutesFile
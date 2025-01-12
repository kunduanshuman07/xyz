import React from 'react'
import AppbarComponent from '../expense/components/AppbarComponent'
import { SkillTabs } from './utils'
import { Route, Routes } from 'react-router-dom'
import Overview from './pages/Overview'
import { Box } from '@mui/material'
const LandingPage = () => {
  return (
    <>
    <div><AppbarComponent expenseTabs={SkillTabs}/></div>
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px 20px',
          marginTop: '50px',
        }}
      >


    <Routes>
      <Route path="overview" element={<Overview/>}/>
    </Routes>
      </Box>
    </>
  )
}

export default LandingPage
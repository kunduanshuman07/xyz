import React from 'react';
import AppbarComponent from './components/AppbarComponent';
import { Route, Routes } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import { Box } from '@mui/material';
import {expenseTabs} from './utils';
const LandingPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppbarComponent expenseTabs={expenseTabs}/>
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
          <Route path="/overview" element={<OverviewPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default LandingPage;

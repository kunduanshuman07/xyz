import React from 'react';
import AppbarComponent from '../common/AppbarComponent';
import { Route, Routes } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import { Box } from '@mui/material';
import {expenseTabs} from './utils';
import CreateExpensePage from './pages/CreateExpensePage';
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
          <Route path="/create" element={<CreateExpensePage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default LandingPage;

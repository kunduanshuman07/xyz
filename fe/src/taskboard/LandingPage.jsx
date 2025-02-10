import React from 'react';
import AppbarComponent from '../common/AppbarComponent';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { taskboardTabs } from './utils';
import OverViewPage from './pages/OverViewPage';
import ActiveSprintPage from './pages/ActiveSprintPage';
import AllSprintsPage from './pages/AllSprintsPage';
import IssuesPage from './pages/IssuesPage';
import ReactDND from "./components/ReactDND"
const LandingPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppbarComponent expenseTabs={taskboardTabs} />
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
          <Route path='/overview' element={<OverViewPage />} />
          <Route path='/active-sprint' element={<ActiveSprintPage />} />
          <Route path='/all-sprints' element={<AllSprintsPage />} />
          <Route path='/issues' element={<IssuesPage />} />
          <Route path='/checker' element={<ReactDND />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default LandingPage;

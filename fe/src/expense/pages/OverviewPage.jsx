import React, { useEffect, useState } from 'react'
import { Box, Button } from "@mui/material";
import DashboardTilesGrid from '../components/DashboardTilesGrid';
import { buttons } from '../../theme';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpenseOverviewGrid from '../components/ExpenseOverviewGrid';
import { axiosInstance } from '../../hooks/useApiCall';

const OverviewPage = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    const fetchExpenseOverview = async () => {
      const response = await axiosInstance({
        url: '/expense/fetch-expenses',
        method: 'POST',
        data: { empid: user?.empid }
      })
      console.log(response);
    }

    fetchExpenseOverview();

  }, []);
  return (
    <Box display="flex" flexDirection='column'>
      <DashboardTilesGrid />
      <Box display='flex'>
        <Button variant='contained' sx={{ textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} startIcon={<TimelineIcon />}>History</Button>
      </Box>
      <ExpenseOverviewGrid />
    </Box>
  )
}

export default OverviewPage;
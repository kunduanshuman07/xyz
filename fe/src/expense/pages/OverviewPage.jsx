import React from 'react'
import { Box, Button } from "@mui/material";
import DashboardTilesGrid from '../components/DashboardTilesGrid';
import { buttons } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpenseOverviewGrid from '../components/ExpenseOverviewGrid';

const OverviewPage = () => {
  return (
    <Box display="flex" flexDirection='column'>
      <DashboardTilesGrid />
      <Box display='flex'>
        <Button variant='contained' sx={{textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}} startIcon={<AddIcon/>}>New Expense</Button>
        <Button variant='contained' sx={{textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}} startIcon={<BookmarkIcon/>}>Drafts</Button>
      </Box>
      <ExpenseOverviewGrid/>
    </Box>
  )
}

export default OverviewPage;
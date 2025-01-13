import React from 'react'
import Grid from '@mui/material/Grid2';
import DashboardTile from './DashboardTile';

const DashboardTilesGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <DashboardTile type={1} data={5} />
      </Grid>
      <Grid size={4}>
        <DashboardTile type={2} data={1} />
      </Grid>
      <Grid size={4}>
        <DashboardTile type={3} data={2} />
      </Grid>
      <Grid size={5}>
        <DashboardTile type={4} data={12000} currency={'INR'} />
      </Grid>
      <Grid size={3}>
        <DashboardTile type={5} data={'Medical Expense'}/>
      </Grid>
      <Grid size={4}>
        <DashboardTile type={6} data={14} />
      </Grid>
    </Grid>
  )
}

export default DashboardTilesGrid
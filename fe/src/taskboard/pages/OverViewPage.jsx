import React from 'react'
import Grid from "@mui/material/Grid2";
import EpicTileComp from '../components/EpicTileComp';
import { Typography } from '@mui/material';
import IssuePriorityTime from '../components/IssuePriorityTime';
import IssueStatusGraphComp from '../components/IssueStatusGraphComp';
import PriorityRadialGraphComp from '../components/PriorityRadialGraphComp';
import ActiveSprintProgressGraphComp from '../components/ActiveSprintProgressGraphComp';
import SprintStatusGraphComp from '../components/SprintStatusGraphComp';
import AssigneeIssueGraphComp from '../components/AssigneeIssueGraphComp';

const OverViewPage = () => {
  return (
    <Grid container spacing={2} sx={{ display: "flex" }}>
      <Grid size={3}>
        <Grid container spacing={1} rowSpacing={0.5}>
          <Grid size={12} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <EpicTileComp />
          </Grid>
          <Grid size={12} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <EpicTileComp />
          </Grid>
          <Grid size={12} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <EpicTileComp />
          </Grid>
        </Grid>
      </Grid>
      <IssueStatusGraphComp />
      <PriorityRadialGraphComp />
      <ActiveSprintProgressGraphComp/>
      <SprintStatusGraphComp/>
      <AssigneeIssueGraphComp/>
      <Grid size={4} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", marginY: "auto", padding: "5px" }}>
        <Typography sx={{ fontFamily: "montserrat", fontSize: "12px", fontWeight: "bold", color: "gray" }}>
          Priority vs Completion Time
        </Typography>
        <IssuePriorityTime />
      </Grid>
      <Grid size={4} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <EpicTileComp />
      </Grid>
      <Grid size={4} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <EpicTileComp />
      </Grid>
      <Grid size={4} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <EpicTileComp />
      </Grid>
    </Grid>
  )
}

export default OverViewPage
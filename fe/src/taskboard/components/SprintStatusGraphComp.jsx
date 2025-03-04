import { Typography } from '@mui/material'
import React from 'react'
import SprintStatusGraph from './ActiveSprintStatus'
import Grid from "@mui/material/Grid2"
const SprintStatusGraphComp = () => {
  return (
    <Grid size={3} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", marginY: "auto", padding: "5px" }}>
        <Typography sx={{ fontFamily: "montserrat", fontSize: "12px", fontWeight: "bold", color: "gray" }}>
          Active Sprint Issues
        </Typography>
        <SprintStatusGraph />
      </Grid>
  )
}

export default SprintStatusGraphComp
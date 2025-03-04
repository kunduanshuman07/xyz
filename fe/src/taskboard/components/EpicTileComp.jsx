import { Box, Typography } from '@mui/material'
import React from 'react'

const EpicTileComp = () => {
  return (
    <Box display={'flex'} flexDirection={'row'} padding={'10px'}>
      <Box display={'flex'} flexDirection={'column'}>
        <Typography sx={{ fontFamily: "montserrat", fontSize: "14px", fontWeight: "bold", color: "gray" }}>
          Epics
        </Typography>
        <Typography sx={{ fontFamily: "montserrat", fontSize: "16px", fontWeight: "bold" }}>
          10
        </Typography>
      </Box>
      <img src='/images/Sprints.svg' alt='Epics' width={25} height={25} style={{ margin: "auto 0px auto auto" }} />
    </Box>
  )
}

export default EpicTileComp
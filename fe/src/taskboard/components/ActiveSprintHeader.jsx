import React from 'react'
import { Box, Button, Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { text } from '../../theme';
import AssigneeFilterSelect from './AssigneeFilterSelect';


const ActiveSprintHeader = () => {
  return (
    <Box display="flex">
      <Typography sx={{ fontFamily: "montserrat", fontWeight: "bold", marginY: "auto" }}>
        Project-GAMA : SP91
      </Typography>
      <input
        type='text'
        placeholder='Search'
        style={{ background: '#F2F2F2', border: "none", lineHeight: "22px", width: "200px", fontSize: "12px", padding: "5px 20px", borderRadius: "8px", color: text.primary, margin: "auto 20px", fontFamily: "Montserrat" }}
      />
      <AssigneeFilterSelect width={300}/>
      <Button startIcon={<AccessTimeIcon />} size='small' sx={{ textTransform: "none", marginLeft: "auto", fontSize: "12px", color: "gray", fontFamily: "montserrat" }}>
        2 days
      </Button>
      <Button variant='contained' size='small' sx={{ textTransform: "none", marginLeft: "10px", fontSize: "12px", bgcolor: "#091E420F", fontFamily: "montserrat", boxShadow: "none", color: "black" }}>
        Complete Sprint
      </Button>
    </Box>
  )
}

export default ActiveSprintHeader
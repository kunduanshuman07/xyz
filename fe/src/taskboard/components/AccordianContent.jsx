import { Avatar, Box, Button, Checkbox, Typography } from '@mui/material'
import React from 'react'
import BugReportIcon from '@mui/icons-material/BugReport';
import EmergencyIcon from '@mui/icons-material/Emergency';
import { tabs } from '../../theme';

const AccordianContent = () => {
    const text = "SPOG Frontend: Redirection based on Error and anomalies details";
    return (
        <Box display='flex' bgcolor='white' border={`1px solid #091E420F`} paddingY="2px" borderRadius='5px' sx={{ cursor: "pointer" }}>
            <Checkbox size='small' />
            <Button startIcon={<BugReportIcon sx={{ fontSize: "10px" }} />} size='small' sx={{ textTransform: "none", fontSize: "10px", fontWeight: "bold", fontFamily: "montserrat" }} color='warning'>AN-3571</Button>
            <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", margin: "auto 20px", width: "40%" }}>
                {text.length > 70 ? `${text.slice(0, 70)}...` : text}
            </Typography>
            <Typography sx={{ bgcolor: "purple", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px", marginLeft: "auto" }}>SP-91</Typography>
            <Typography sx={{ bgcolor: "blueviolet", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px" }}>Anshuman Kundu</Typography>
            <Typography sx={{ bgcolor: "green", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px" }}>Release Version</Typography>
            <Typography sx={{ fontSize: "10px", fontFamily: "montserrat", marginY: "auto", marginLeft: "auto", marginRight: "10px"}}>2d</Typography>
            <EmergencyIcon sx={{ fontSize: "10px", color: "red", margin: "auto 5px" }} />
            <Avatar sx={{ width: "20px", height: "20px", fontSize: "8px", margin: "auto 5px", fontWeight: "bold", fontFamily: "montserrat", bgcolor: tabs.background }}>
                AK
            </Avatar>
        </Box>
    )
}

export default AccordianContent
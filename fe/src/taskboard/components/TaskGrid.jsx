import React, { useState } from 'react'
import Grid from "@mui/material/Grid2";
import { Avatar, Box, Button, Typography } from '@mui/material';
import { tabs, text } from '../../theme';
import BugReportIcon from '@mui/icons-material/BugReport';
import EmergencyIcon from '@mui/icons-material/Emergency';
import CreateIssueDialog from './CreateIssueDialog';

const TaskGrid = ({ label }) => {
    const [open, setOpen] = useState(false);
    return (
        <Grid size={4} sx={{ bgcolor: "#091E420F", minHeight: "500px", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "12px", fontFamily: "montserrat", color: text.primary }}>
                {label}
            </Typography>
            <Box display='flex' flexDirection='column' sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "5px", bgcolor: "white", marginTop: "10px", padding: "5px 10px", cursor: "pointer", ":hover": { bgcolor: "#e8e9eb" } }}>
                <Typography sx={{ fontFamily: "montserrat", fontSize: "12px" }}>Anshuman Kundu</Typography>
                <Typography sx={{ bgcolor: "blueviolet", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "5px auto 5px 0px" }}>Anshuman Kundu</Typography>
                <Box display='flex'>
                    <Button startIcon={<BugReportIcon sx={{ fontSize: "10px" }} />} size='small' sx={{ textTransform: "none", fontSize: "10px", fontWeight: "bold", fontFamily: "montserrat", marginRight: "auto" }} color='warning'>AN-3571</Button>
                    <Typography sx={{ fontSize: "10px", fontFamily: "montserrat", marginY: "auto" }}>2d</Typography>
                    <EmergencyIcon sx={{ fontSize: "10px", color: "red", margin: "auto 5px" }} />
                    <Avatar sx={{ width: "20px", height: "20px", fontSize: "8px", margin: "auto 5px", fontWeight: "bold", fontFamily: "montserrat", bgcolor: tabs.background }}>
                        AK
                    </Avatar>
                </Box>
            </Box>
            <Button sx={{ textTransform: "none", marginTop: "10px", textAlign: "left", color: tabs.background }} onClick={() => setOpen(true)}>+ Create Issue</Button>
            {open && <CreateIssueDialog open={open} setOpen={setOpen} />}
        </Grid>
    )
}

export default TaskGrid
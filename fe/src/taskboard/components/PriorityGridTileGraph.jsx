import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import EmergencyIcon from '@mui/icons-material/Emergency';
import PriorityLineGraph from './PriorityLineGraph';

const PriorityGridTileGraph = () => {
    return (
        <Box 
            display={'flex'} 
            flexDirection={'column'} 
            sx={{ 
                borderRadius: "8px", 
                bgcolor: "#fcfafa", 
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
                width: "100%" 
            }}
        >
            <Box display={'flex'} flexDirection={'column'} padding='10px'>
                <Typography sx={{ fontFamily: "montserrat", fontSize: "14px", color: "gray", fontWeight: "bold", marginY: "auto" }}> <EmergencyIcon sx={{ color: "red", fontSize: "14px" }} /> High Priority Issues</Typography>
                <Typography sx={{ fontFamily: "montserrat", fontSize: "24px", color: "gray", fontWeight: "bold", marginY: "auto" }}>10</Typography>
            </Box>
            <Box width={'100%'} sx={{ padding: 0, margin: 0, marginBottom: "-15px" }}>
                <PriorityLineGraph />
            </Box>
        </Box>
    );
}

export default PriorityGridTileGraph;

import { Box, Typography } from '@mui/material'
import React from 'react'

const EpicAccordian = ({ data }) => {
    return (
        <Box display='flex' flexDirection={'column'} bgcolor='white' padding="5px 10px" borderRadius='5px' sx={{ cursor: "pointer" }} marginTop={'2px'}>
            <Typography sx={{ bgcolor: "orange", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "12px", width: "100%", fontFamily: "montserrat", fontWeight: "bold", margin: "auto auto auto 0px", ":hover": { bgcolor: "#d18a06" } }}>{data?.label}</Typography>
        </Box>
    )
}

export default EpicAccordian
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import ApprovedIcon from '@mui/icons-material/Recommend';
import RejectIcon from '@mui/icons-material/ThumbDownAlt';
import ProgressIcon from '@mui/icons-material/Cached';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MediationIcon from '@mui/icons-material/Mediation';
import { buttons, text } from '../../theme';

const typeRenders = {
    1: {
        text: "Approved",
        color: "#B6E9D6",
        icon: <ApprovedIcon sx={{ fontSize: "50px" }} />
    },
    2: {
        text: "In Progress",
        color: "#F8B758",
        icon: <ProgressIcon sx={{ fontSize: "50px" }} />
    },
    3: {
        text: "Rejected",
        color: "#E19C9B",
        icon: <RejectIcon sx={{ fontSize: "50px" }} />
    },
    4: {
        text: "Total Claimed Amount",
        color: buttons.background,
        icon: <AttachMoneyIcon sx={{ fontSize: "50px" }} />
    },
    5: {
        text: "Last Claim Cateogry",
        color: "#4667DF",
        icon: <MediationIcon sx={{ fontSize: "50px" }} />
    },
    6: {
        text: "Average Processing Time",
        color: "#9E8ED3",
        icon: <AccessTimeFilledIcon sx={{ fontSize: "50px" }} />
    }
}

const DashboardTile = ({ type, data, currency }) => {
    return (
        <Box display='flex' sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "15px"
        }}
        >
            <Box display='flex' flexDirection='column' marginY="auto">
                <Typography fontFamily='Montserrat' color={text.primary}>
                    {typeRenders[type].text}
                </Typography>
                <Typography fontFamily='Montserrat' fontWeight={'bold'} sx={{ fontSize: "20px" }}>
                    {type === 4 && currency} {data}{type === 4 ? ".00" : type === 6 ? " hrs" : ""}
                </Typography>
            </Box>
            <IconButton sx={{ margin: "auto 0px auto auto", color: typeRenders[type].color }}>
                {typeRenders[type].icon}
            </IconButton>
        </Box>
    )
}

export default DashboardTile
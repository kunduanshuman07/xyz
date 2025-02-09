import { Avatar, Box, Button, Checkbox, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import EmergencyIcon from '@mui/icons-material/Emergency';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { tabs } from '../../theme';

const priorityIcons = {
    0: {icon : <PriorityHighIcon sx={{ fontSize: "16px", color: "red", margin: "auto 5px" }} />, title : "High"},
    1: {icon : <EmergencyIcon sx={{ fontSize: "16px", color: "yellow", margin: "auto 5px" }} />, title : "Medium"},
    2: {icon : <LowPriorityIcon sx={{ fontSize: "16px", color: "blue", margin: "auto 5px" }} />, title : "Low"}
}

const AccordianContent = ({ data, setviewissue, setviewissuedata, setSelectedIssues, comp=false }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleViewIssue = () => {
        setviewissuedata(data);
        setviewissue(true);
    };

    const handleIssueSelection = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        setSelectedIssues((prev) => {
            if (checked) {
                return [...prev, data];
            } else {
                return prev.filter((issue) => issue.id !== data.id);
            }
        });
    };
    const statuslabels = {
        0: "Setup",
        1: "Inprogress",
        2: "Done"
    }
    return (
        <Box display='flex' bgcolor='white' border={`1px solid #091E420F`} paddingY={!comp?"2px":"6px"} borderRadius='5px' sx={{ cursor: "pointer", ":hover": { bgcolor: "#f5f5f5" } }}>
            {!comp && <Checkbox size='small' checked={isChecked} onChange={handleIssueSelection} />}
            <Box display={'flex'} width={'100%'} onClick={handleViewIssue}>
                <Button startIcon={<BugReportIcon sx={{ fontSize: "10px" }} />} size='small' sx={{ textTransform: "none", fontSize: "10px", fontWeight: "bold", fontFamily: "montserrat" }} color='warning'>{data?.projid} - {data?.id}</Button>
                <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", margin: "auto auto auto 10px", width: "40%" }}>
                    {data?.issuename?.length > 70 ? `${data?.issuename?.slice(0, 70)}...` : data?.issuename}
                </Typography>
                <Tooltip title='Status'>
                    <Typography sx={{ bgcolor: "skyblue", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px"}}>{statuslabels[data?.status]}</Typography>
                </Tooltip>
                <Tooltip title='Sprint'>
                    <Typography sx={{ bgcolor: "purple", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px", }}>{data?.sprintname}</Typography>
                </Tooltip>
                <Tooltip title='Epic'>
                    <Typography sx={{ bgcolor: "blueviolet", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px" }}>{data?.epicname}</Typography>
                </Tooltip>
                <Tooltip title='Release Version'>
                    <Typography sx={{ bgcolor: "green", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "auto 10px" }}>{data?.relversion}</Typography>
                </Tooltip>
                <Tooltip title='Estimated Time'>
                    <Typography sx={{ fontSize: "10px", fontFamily: "montserrat", marginY: "auto", marginLeft: "auto", marginRight: "10px" }}>{data?.orig_estimate}</Typography>
                </Tooltip>
                <Tooltip title={`${priorityIcons[data?.priority]?.title} Priority`}>
                    {priorityIcons[data?.priority]?.icon}
                </Tooltip>
                <Tooltip title='Assignee'>
                    {!data?.empid ? (
                        <Typography sx={{ fontFamily: "montserrat", fontWeight: "bold", fontSize: "8px", color: "gray", margin: "auto 5px" }}>
                            Unassigned
                        </Typography>
                    ) : (
                        <Avatar sx={{ width: "20px", height: "20px", fontSize: "8px", margin: "auto 5px", fontWeight: "bold", fontFamily: "montserrat", bgcolor: tabs.background }}>
                            {data?.empname?.split(' ')[0][0]}{data?.empname?.split(' ')[1][0]}
                        </Avatar>
                    )}
                </Tooltip>
            </Box>
        </Box>
    );
};

export default AccordianContent;

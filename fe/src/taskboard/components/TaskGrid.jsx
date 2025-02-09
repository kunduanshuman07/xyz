import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid2";
import { Avatar, Box, Button, Typography } from '@mui/material';
import { tabs, text } from '../../theme';
import BugReportIcon from '@mui/icons-material/BugReport';
import EmergencyIcon from '@mui/icons-material/Emergency';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import CreateIssueDialog from './CreateIssueDialog';
import { axiosInstance } from '../../hooks/useApiCall';
import ViewIssueDialog from './ViewIssueDialog';

const TaskGrid = ({ id, label, data, handleFetchTasks }) => {
    const priorityIcons = {
        0: { icon: <PriorityHighIcon sx={{ fontSize: "16px", color: "red", margin: "auto 5px" }} />, title: "High" },
        1: { icon: <EmergencyIcon sx={{ fontSize: "16px", color: "yellow", margin: "auto 5px" }} />, title: "Medium" },
        2: { icon: <LowPriorityIcon sx={{ fontSize: "16px", color: "blue", margin: "auto 5px" }} />, title: "Low" }
    }
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [issues, setIssues] = useState([]);
    const [sprints, setsprints] = useState([]);
    const [sprintlabels, setsprintlabels] = useState({});
    const [epics, setEpics] = useState({});
    const [epiclabels, setepiclabels] = useState([]);
    const [assignees, setAssignees] = useState({});
    const [assigneeLabels, setassigneelabels] = useState([])
    const [viewissue, setviewissue] = useState(false);
    const [viewissuedata, setviewissuedata] = useState();
    const handleFetchIssues = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-issues",
                method: "GET",
            })
            setIssues(response?.data?.results);
            handleFetchTasks();
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const handleFetchEpics = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-epics",
                method: "GET",
            })
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result?.id] = result?.epicname;
                return acc;
            }, {});
            const epicData = response?.data?.results?.map((result, index) => ({
                id: result?.id,
                label: result?.epicname
            }))
            setepiclabels(formattedData);
            setEpics(epicData);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const handleFetchAssignees = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-assignees",
                method: "GET",
            })
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result?.empid] = result?.empname;
                return acc;
            }, {});
            const assigneeData = response?.data?.results?.map((result, index) => ({
                id: result?.empid,
                label: result?.empname
            }))
            setassigneelabels(formattedData);
            setAssignees(assigneeData);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const handleFetchSprints = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-sprints",
                method: "GET",
            })
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result?.id] = result?.sprintname;
                return acc;
            }, {});
            const sprintData = response?.data?.results?.map((result, index) => ({
                id: result?.id,
                label: result?.sprintname
            }))
            setsprintlabels(formattedData);
            setsprints(sprintData);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const handleUpdateIssue = async ({ key, value, issueid }) => {
        try {
            await axiosInstance({
                url: "/taskboard/update-issue",
                method: "POST",
                data: { key: key, value: value, issueid: issueid }
            })
            handleFetchIssues();
            handleFetchTasks();

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleCreateIssue = async ({ issuename, relversion, priority }) => {
        setLoading(true);
        try {
            await axiosInstance({
                url: "/taskboard/create-issue-wsprint",
                method: "POST",
                data: { issuename, relversion, priority, sprintid: data?.[0]?.sprintid }
            })
        } catch (error) {

        } finally {
            setOpen(false);
            handleFetchIssues();
            handleFetchTasks();
        }
    }
    useEffect(() => {
        handleFetchIssues();
        handleFetchSprints();
        handleFetchEpics();
        handleFetchAssignees();
        handleFetchTasks();
    }, [])
    const handleViewIssue = (task) => {
        setviewissuedata(task);
        setviewissue(true);
    };
    return (
        <Grid size={4} sx={{ bgcolor: "#091E420F", minHeight: "500px", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "12px", fontFamily: "montserrat", color: text.primary }}>
                {label}
            </Typography>
            {data?.map((task, index) => (
                task?.status === id &&
                <Box display='flex' flexDirection='column' sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "5px", bgcolor: "white", marginTop: "10px", padding: "5px 10px", cursor: "pointer", ":hover": { bgcolor: "#e8e9eb" } }} onClick={() => handleViewIssue(task)} key={index}>
                    <Typography sx={{ fontFamily: "montserrat", fontSize: "12px" }}>{task?.issuename}</Typography>
                    <Typography sx={{ bgcolor: "blueviolet", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "5px auto 5px 0px" }}>{task?.epicname}</Typography>
                    <Box display='flex'>
                        <Button startIcon={<BugReportIcon sx={{ fontSize: "10px" }} />} size='small' sx={{ textTransform: "none", fontSize: "10px", fontWeight: "bold", fontFamily: "montserrat", marginRight: "auto" }} color='warning'>P001-{task?.id}</Button>
                        <Typography sx={{ fontSize: "10px", fontFamily: "montserrat", marginY: "auto" }}>{task?.orig_estimate}d</Typography>
                        {priorityIcons[task?.priority]?.icon}
                        <Avatar sx={{ width: "20px", height: "20px", fontSize: "8px", margin: "auto 5px", fontWeight: "bold", fontFamily: "montserrat", bgcolor: tabs.background }}>
                            {task?.empname?.split(' ')[0][0]}{task?.empname?.split(' ')[1][0]}
                        </Avatar>
                    </Box>
                </Box>
            ))}
            {id === 0 &&
                <>
                    <Button sx={{ textTransform: "none", marginTop: "10px", textAlign: "left", color: tabs.background }} onClick={() => setOpen(true)}>+ Create Issue</Button>
                    {open && <CreateIssueDialog open={open} setOpen={setOpen} handleCreateIssue={handleCreateIssue}/>}
                </>
            }
            {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} epics={epics} assignees={assignees} epiclabels={epiclabels} assigneelabels={assigneeLabels} handleUpdate={handleUpdateIssue} sprintlabels={sprintlabels} sprints={sprints} />}
        </Grid>
    )
}

export default TaskGrid
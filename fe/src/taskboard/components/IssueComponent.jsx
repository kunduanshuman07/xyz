import React, { useEffect, useState } from 'react'
import AccordianContent from '../components/AccordianContent'
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material'
import CreateIssueDialog from './CreateIssueDialog'
import { axiosInstance } from '../../hooks/useApiCall'
import ViewIssueDialog from './ViewIssueDialog'
import { tabs } from '../../theme'
import BulkEditDrawer from './BulkEditDrawer'
import { issuestatus, priorities } from '../utils'
import IssuePageFilter from "./IssuePageFilter"

const IssueComponent = () => {
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
    const [selectedIssues, setselectedIssues] = useState([]);

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleCreateIssue = async ({ issuename, relversion, priority }) => {
        setLoading(true);
        try {
            await axiosInstance({
                url: "/taskboard/create-issue",
                method: "POST",
                data: { issuename, relversion, priority }
            })
        } catch (error) {

        } finally {
            setOpen(false);
            handleFetchIssues();
        }
    }
    const handleFetchIssues = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-issues",
                method: "GET",
            })
            setIssues(response?.data?.results);
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
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        handleFetchIssues();
        handleFetchSprints();
        handleFetchEpics();
        handleFetchAssignees();
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <IssuePageFilter />
            <Box display={'flex'}>
                <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginY: "10px" }} color='info' onClick={() => setOpen(true)}>+ Create a new Issue</Button>
                {selectedIssues?.length > 0 &&
                    <Box sx={{ background: tabs.background, padding: "0px 10px", borderRadius: "5px", margin: "auto auto auto 30px" }} display={'flex'}>
                        <Button sx={{ color: "white", textTransform: "none", ":hover": { color: "gray" } }} onClick={toggleDrawer('right', true)}>Bulk Edit</Button>
                    </Box>}
            </Box>
            <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", color: "gray", fontWeight: "bold", marginLeft: "auto", marginRight: "10px" }}>*Click to view details or edit</Typography>
            <Box display={'flex'} flexDirection={'column'} sx={{ maxHeight: "450px", overflowY: "auto" }} padding="5px" borderRadius={'10px'} >
                {issues?.map((issue, index) => (
                    <AccordianContent data={issue} key={index} setviewissue={setviewissue} setviewissuedata={setviewissuedata} setSelectedIssues={setselectedIssues} />
                ))}
            </Box>
            {open && <CreateIssueDialog open={open} setOpen={setOpen} handleCreateIssue={handleCreateIssue} />}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
            {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} epics={epics} assignees={assignees} epiclabels={epiclabels} assigneelabels={assigneeLabels} handleUpdate={handleUpdateIssue} sprintlabels={sprintlabels} sprints={sprints} />}
            {state?.right && <BulkEditDrawer toggleDrawer={toggleDrawer} state={state} anchor='right' assigneelist={assignees} selectedIds={selectedIssues} priorities={priorities} epics={epics} statuses={issuestatus} sprints={sprints} handleFetchIssues={handleFetchIssues} setSelectedIssues={setselectedIssues} setState={setState} />}
        </div>
    )
}

export default IssueComponent
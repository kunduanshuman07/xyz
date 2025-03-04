import React, { useEffect, useState } from 'react'
import AccordianContent from '../components/AccordianContent'
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material'
import CreateIssueDialog from './CreateIssueDialog'
import ViewIssueDialog from './ViewIssueDialog'
import { tabs } from '../../theme'
import BulkEditDrawer from './BulkEditDrawer'
import { issuestatus, priorities } from '../utils'
import { useTaskboard } from '../../context/TaskboardProvider'
import { useAssigneeFilter } from '../../context/AssigneFilterProvider'

const IssueComponent = () => {
    const [open, setOpen] = useState(false);
    const {
        issues,
        sprintArray,
        epics,
        assignees,
        loading,
        fetchIssues,
        createIssue
    }
        = useTaskboard();
    const { search, personName, statusFilters, sprintFilters, epicFilters } = useAssigneeFilter();
    const [viewissue, setviewissue] = useState(false);
    const [viewissuedata, setviewissuedata] = useState();
    const [selectedIssues, setselectedIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    useEffect(() => {
        if (issues) {
            let filteredData = [...issues];
    
            // Filter by Assignee (personName)
            if (personName.length > 0) {
                filteredData = filteredData.filter(issue => personName.includes(issue.empid));
            }
    
            // Filter by Search (issuename)
            if (search) {
                filteredData = filteredData.filter(issue =>
                    issue.issuename.toLowerCase().includes(search?.toLowerCase())
                );
            }
    
            // Filter by Status
            if (statusFilters.length > 0) {
                filteredData = filteredData.filter(issue => statusFilters.includes(issue.status));
            }
    
            // Filter by Epics
            if (epicFilters.length > 0) {
                filteredData = filteredData.filter(issue => epicFilters.includes(issue.epicid));
            }
    
            // Filter by Sprint
            if (sprintFilters.length > 0) {
                filteredData = filteredData.filter(issue => sprintFilters.includes(issue.sprintid));
            }
    
            setFilteredIssues(filteredData);
        }
    }, [epicFilters, issues, personName, search, sprintFilters, statusFilters]);
    
    console.log(filteredIssues);
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Box display={'flex'}>
                <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginY: "10px" }} color='info' onClick={() => setOpen(true)}>+ Create a new Issue</Button>
                {selectedIssues?.length > 0 &&
                    <Box sx={{ background: tabs.background, padding: "0px 10px", borderRadius: "5px", margin: "auto auto auto 30px" }} display={'flex'}>
                        <Button sx={{ color: "white", textTransform: "none", ":hover": { color: "gray" } }} onClick={toggleDrawer('right', true)}>Bulk Edit</Button>
                    </Box>}
            </Box>
            {!loading && issues?.length === 0 ?
                <Typography sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "montserrat", color: "gray", marginTop: "30px" }}>No Issues in this Project, start by creating one.</Typography>
                :
                <>
                    <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", color: "gray", fontWeight: "bold", marginLeft: "auto", marginRight: "10px" }}>*Click to view details or edit</Typography>
                </>
            }
            <Box display={'flex'} flexDirection={'column'} sx={{ maxHeight: "420px", overflowY: "auto" }} padding="5px" borderRadius={'10px'} >
                {filteredIssues?.map((issue, index) => (
                    <AccordianContent data={issue} key={index} setviewissue={setviewissue} setviewissuedata={setviewissuedata} setSelectedIssues={setselectedIssues} />
                ))}
            </Box>
            {open && <CreateIssueDialog open={open} setOpen={setOpen} handleCreateIssue={createIssue} />}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
            {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} />}
            {state?.right && <BulkEditDrawer toggleDrawer={toggleDrawer} state={state} anchor='right' assigneelist={assignees} selectedIds={selectedIssues} priorities={priorities} epics={epics} statuses={issuestatus} sprints={sprintArray} handleFetchIssues={fetchIssues} setSelectedIssues={setselectedIssues} setState={setState} />}

        </div>
    )
}

export default IssueComponent
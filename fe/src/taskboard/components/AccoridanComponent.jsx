import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AccordianContent from './AccordianContent';
import { axiosInstance } from '../../hooks/useApiCall';
import ViewIssueDialog from './ViewIssueDialog';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { buttons, tabs, text } from '../../theme';
import { useTaskboard } from '../../context/TaskboardProvider';
import { useAssigneeFilter } from '../../context/AssigneFilterProvider';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.5rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .02)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AccordianComponent() {
    const {
        issues,
        sprints,
        sprintLabels,
        sprintArray,
        epics,
        epicLabels,
        assignees,
        assigneeLabels,
        loading,
        setLoading,
        fetchAllData,
        updateIssue,
    }
        = useTaskboard();
    const { personName, search } = useAssigneeFilter();
    const [viewissue, setviewissue] = useState(false);
    const [viewissuedata, setviewissuedata] = useState();
    const [selectedIssues, setselectedIssues] = useState([]);
    const [filteredSprints, setFilteredSprints] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);

    const handleStartUpdateSprint = async (sprintid, status) => {
        try {
            await axiosInstance({
                url: status === 2 ? "/taskboard/start-sprint" : status === 1 ? "/taskboard/end-sprint" : "",
                method: "POST",
                data: { sprintid: sprintid }
            })
            fetchAllData();
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const sprintstatus = {
        0: "Completed",
        1: "Active",
        2: "Planned"
    }

    React.useEffect(() => {
        if (sprints && issues) {
            let filteredData = issues;

            if (personName.length > 0) {
                filteredData = filteredData.filter(issue => personName.includes(issue.empid));
            }

            if (search) {
                filteredData = filteredData.filter(issue =>
                    issue.issuename.toLowerCase().includes(search?.toLowerCase())
                );
            }

            const filteredSprintIds = new Set(filteredData.map(issue => issue.sprintid));
            const filteredSprintData = sprints.filter(sprint => filteredSprintIds.has(sprint.id));

            if (personName.length === 0 && !search) {
                setFilteredIssues(issues);
                setFilteredSprints(sprints);
            } else {
                setFilteredIssues(filteredData);
                setFilteredSprints(filteredSprintData);
            }
        }
    }, [sprints, personName, issues, search]);

    return (
        <div style={{ marginTop: "20px" }}>
            {filteredSprints?.map((sprint, index) => (
                <Accordion key={index} defaultExpanded={index === 0}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography component="span" sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat", marginY: "auto" }}>{sprint?.sprintname}</Typography>
                        <Typography component="span" sx={{ fontSize: "10px", bgcolor: "violet", padding: "2px 5px", color: "white", borderRadius: "5px", fontWeight: "bold", fontFamily: "montserrat", margin: "auto 20px" }}>{sprintstatus[sprint?.status]}</Typography>
                        <Typography component="span" sx={{ fontSize: "10px", color: text.primary, fontFamily: "montserrat", margin: "auto 0px auto auto" }}><span style={{ color: "gray", fontWeight: "bold" }}>Created : </span> {new Date(sprint?.created).toLocaleDateString()}</Typography>
                        {(sprint?.status === 1 || sprint?.status === 0) &&
                            <Typography component="span" sx={{ fontSize: "10px", color: text.primary, fontFamily: "montserrat", margin: "auto 0px auto 20px" }}><span style={{ color: "gray", fontWeight: "bold" }}>Started : </span> {new Date(sprint?.startdate).toLocaleDateString()}</Typography>
                        }
                        {sprint?.status === 0 &&
                            <Typography component="span" sx={{ fontSize: "10px", color: text.primary, fontFamily: "montserrat", margin: "auto 0px auto 20px" }}><span style={{ color: "gray", fontWeight: "bold" }}>Ended : </span> {new Date(sprint?.enddate).toLocaleDateString()}</Typography>
                        }
                        {sprint?.status !== 0 && <Button sx={{ bgcolor: buttons.background, textTransform: "none", color: "white", fontFamily: "montserrat", fontSize: "10px", margin: "auto 10px" }} size='small' onClick={() => handleStartUpdateSprint(sprint?.id, sprint?.status)}>{sprint?.status === 1 ? "Complete Sprint" : sprint?.status === 2 ? "Start Sprint" : ""}</Button>}
                    </AccordionSummary>
                    <AccordionDetails>
                        {filteredIssues?.map((issue, index) => (
                            issue?.sprintid === sprint.id &&
                            <AccordianContent data={issue} key={index} setviewissue={setviewissue} setviewissuedata={setviewissuedata} setSelectedIssues={setselectedIssues} comp={true} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
            {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} epics={epics} assignees={assignees} epiclabels={epicLabels} assigneelabels={assigneeLabels} handleUpdate={updateIssue} sprintlabels={sprintLabels} sprints={sprintArray} />}
            {selectedIssues?.length > 0 && <Box sx={{ position: 'fixed', top: "80%", left: "50%", background: tabs.background, padding: "10px", borderRadius: "10px" }}>
                <Typography sx={{ fontFamily: "montserrat", fontSize: "12px", color: "white" }}>Add Assignee</Typography>
            </Box>}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
            {!loading && sprints?.length === 0 &&
                <Typography sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "montserrat", color: "gray" }}>No Sprints in this Project, start by creating one.</Typography>
            }
        </div>
    );
}

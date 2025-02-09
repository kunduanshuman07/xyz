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
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { tabs, text } from '../../theme';

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

export default function AccordianComponent({ sprints, setsprints }) {
    const [sprintArray, setsprintArray] = useState([]);
    const [sprintlabels, setsprintlabels] = useState({});
    const [loading, setLoading] = useState(false);
    const [issues, setIssues] = useState([]);
    const [epics, setEpics] = useState({});
    const [epiclabels, setepiclabels] = useState([]);
    const [assignees, setAssignees] = useState({});
    const [assigneeLabels, setassigneelabels] = useState([])
    const [viewissue, setviewissue] = useState(false);
    const [viewissuedata, setviewissuedata] = useState();
    const [selectedIssues, setselectedIssues] = useState([]);
    const handleFetchSprints = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-sprints",
                method: "GET",
            })
            setsprints(response?.data?.results);
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result?.id] = result?.sprintname;
                return acc;
            }, {});
            const sprintData = response?.data?.results?.map((result, index) => ({
                id: result?.id,
                label: result?.sprintname
            }))
            setsprintlabels(formattedData);
            setsprintArray(sprintData);
        } catch (error) {

        } finally {
            setLoading(false);
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


    React.useEffect(() => {
        handleFetchIssues();
        handleFetchEpics();
        handleFetchAssignees();
        handleFetchSprints();
    }, [])
    const sprintstatus = {
        0: "Completed",
        1: "Active",
        2: "Planned"
    }
    return (
        <div style={{ marginTop: "20px" }}>
            {sprints?.map((sprint, index) => (
                <Accordion key={index} defaultExpanded={index === 0}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography component="span" sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat" }}>{sprint?.sprintname}</Typography>
                        <Typography component="span" sx={{ fontSize: "10px", bgcolor: "violet", padding: "2px 5px", color: "white", borderRadius: "5px", fontWeight: "bold", fontFamily: "montserrat", marginLeft: "20px" }}>{sprintstatus[sprint?.status]}</Typography>
                        <Typography component="span" sx={{ fontSize: "12px", marginLeft: "auto", fontFamily: "montserrat" }}>Tentative Dates - </Typography>
                        <Box display={'flex'} marginLeft={'5px'} marginY="auto">
                            <Typography component="span" sx={{ fontSize: "10px", color: text.primary, fontFamily: "montserrat" }}><span style={{ color: "gray", fontWeight: "bold" }}>Start Date : </span> {new Date(sprint?.startdate).toLocaleDateString()}</Typography>
                            <Typography component="span" sx={{ fontSize: "10px", color: text.primary, fontFamily: "montserrat", marginLeft: "20px" }}><span style={{ color: "gray", fontWeight: "bold" }}>End Date : </span> {new Date(sprint?.enddate).toLocaleDateString()}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {issues?.map((issue, index) => (
                            issue?.sprintid === sprint.id &&
                            <AccordianContent data={issue} key={index} setviewissue={setviewissue} setviewissuedata={setviewissuedata} setSelectedIssues={setselectedIssues} comp={true}/>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
            {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} epics={epics} assignees={assignees} epiclabels={epiclabels} assigneelabels={assigneeLabels} handleUpdate={handleUpdateIssue} sprintlabels={sprintlabels} sprints={sprintArray} />}
            {selectedIssues?.length > 0 && <Box sx={{ position: 'fixed', top: "80%", left: "50%", background: tabs.background, padding: "10px", borderRadius: "10px" }}>
                <Typography sx={{ fontFamily: "montserrat", fontSize: "12px", color: "white" }}>Add Assignee</Typography>
            </Box>}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
        </div>
    );
}

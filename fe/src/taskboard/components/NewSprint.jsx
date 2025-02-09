import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid2";
import { Backdrop, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { buttons } from '../../theme';
import AccordianContent from './AccordianContent';
import ViewIssueDialog from './ViewIssueDialog';
import { axiosInstance } from '../../hooks/useApiCall';
import CreateIssueDialog from './CreateIssueDialog';
const NewSprint = ({ handleCloseDialog, sprints, setsprints }) => {
  const [sprintname, setsprintname] = useState('');
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState([]);
  const [epics, setEpics] = useState({});
  const [epiclabels, setepiclabels] = useState([]);
  const [assignees, setAssignees] = useState({});
  const [assigneeLabels, setassigneelabels] = useState([])
  const [viewissue, setviewissue] = useState(false);
  const [viewissuedata, setviewissuedata] = useState();
  const [selectedIssues, setselectedIssues] = useState([]);
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

  const handleFetchSprints = async () => {
    try {
      const response = await axiosInstance({
        url: "/taskboard/get-sprints",
        method: "GET",
      })
      setsprints(response?.data?.results);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  const handleCreateSprint = async () => {
    try {
      await axiosInstance({
        url: "/taskboard/create-sprint",
        method: "POST",
        data: { sprintname, startdate, enddate, issuelist: selectedIssues }
      })
      handleFetchSprints();
      handleFetchIssues();
    } catch (error) {

    } finally {
      handleCloseDialog();
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetchSprints();
    handleFetchIssues();
    handleFetchEpics();
    handleFetchAssignees();
  }, [])
  return (
    <Grid container spacing={2} sx={{ marginTop: "10px" }}>
      <Grid size={4}>
        <TextField
          placeholder={"Sprint Name"}
          label={""}
          value={sprintname}
          onChange={(e) => setsprintname(e.target.value)}
          fullWidth
          required
          size="small"
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "0.8rem",
              fontFamily: "Montserrat",
            },
            ".css-1kfabtt-MuiFormLabel-root-MuiInputLabel-root": {
              fontSize: "0.8rem"
            },
            fontSize: "0.8rem"
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder={"Start Date"}
          label={"Start Date"}
          type='date'
          value={startdate}
          onChange={(e) => setstartdate(e.target.value)}
          fullWidth
          required
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "0.8rem",
              fontFamily: "Montserrat",
            },
            ".css-1kfabtt-MuiFormLabel-root-MuiInputLabel-root": {
              fontSize: "0.8rem"
            },
            fontSize: "0.8rem"
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder={"End Date"}
          label={"End Date"}
          type='date'
          value={enddate}
          onChange={(e) => setenddate(e.target.value)}
          fullWidth
          required
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "0.8rem",
              fontFamily: "Montserrat",
            },
            ".css-1kfabtt-MuiFormLabel-root-MuiInputLabel-root": {
              fontSize: "0.8rem"
            },
            fontSize: "0.8rem"
          }}
        />
      </Grid>
      <Grid size={12} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", marginY: "10px", color: "gray", fontWeight: "bold" }}>
          *Add Issues from the below list or you can add later as well
        </Typography>
        <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginRight: "auto", marginY: "10px" }} color='info' onClick={() => setOpen(true)}>+ Create a new Issue</Button>
        <Box display={'flex'} flexDirection={'column'} sx={{ height: "230px", overflowY: "auto" }} padding="5px" borderRadius={'10px'} >
          {issues?.map((issue, index) => (
            <AccordianContent data={issue} key={index} setviewissue={setviewissue} setviewissuedata={setviewissuedata} setSelectedIssues={setselectedIssues} />
          ))}
        </Box>
        {open && <CreateIssueDialog open={open} setOpen={setOpen} handleCreateIssue={handleCreateIssue} />}
        <Backdrop open={loading}>
          <CircularProgress sx={{ color: "white" }} />
        </Backdrop>
        {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} epics={epics} assignees={assignees} epiclabels={epiclabels} assigneelabels={assigneeLabels} handleUpdate={handleUpdateIssue} />}
        <Box display={'flex'}>
          <Button variant='contained' sx={{ textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background }} onClick={handleCreateSprint}>Create Sprint</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NewSprint
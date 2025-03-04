import React, { useState } from 'react'
import Grid from "@mui/material/Grid2";
import { Backdrop, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { buttons } from '../../theme';
import AccordianContent from './AccordianContent';
import ViewIssueDialog from './ViewIssueDialog';
import { axiosInstance } from '../../hooks/useApiCall';
import CreateIssueDialog from './CreateIssueDialog';
import { useTaskboard } from '../../context/TaskboardProvider';
const NewSprint = ({ handleCloseDialog }) => {
  const {
    issues,
    epics,
    epicLabels,
    assignees,
    assigneeLabels,
    loading,
    setLoading,
    fetchIssues,
    fetchSprints,
    updateIssue,
    createIssue
  }
    = useTaskboard();
  const [open, setOpen] = useState(false);
  const [sprintname, setsprintname] = useState('');
  const [viewissue, setviewissue] = useState(false);
  const [viewissuedata, setviewissuedata] = useState();
  const [selectedIssues, setselectedIssues] = useState([]);

  const handleCreateSprint = async () => {
    try {
      await axiosInstance({
        url: "/taskboard/create-sprint",
        method: "POST",
        data: { sprintname, issuelist: selectedIssues }
      })
      fetchIssues();
      fetchSprints();
    } catch (error) {

    } finally {
      handleCloseDialog();
      setLoading(false);
    }
  }
  return (
    <Grid container spacing={2} sx={{ marginTop: "10px" }}>
      <Grid size={6}>
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
        {open && <CreateIssueDialog open={open} setOpen={setOpen} handleCreateIssue={createIssue} />}
        <Backdrop open={loading}>
          <CircularProgress sx={{ color: "white" }} />
        </Backdrop>
        {viewissue && <ViewIssueDialog open={viewissue} setOpen={setviewissue} data={viewissuedata} epics={epics} assignees={assignees} epiclabels={epicLabels} assigneelabels={assigneeLabels} handleUpdate={updateIssue} />}
        <Box display={'flex'}>
          <Button variant='contained' sx={{ textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background }} onClick={handleCreateSprint}>Create Sprint</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NewSprint
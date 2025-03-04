import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material"
import AssigneeFilterSelect from './AssigneeFilterSelect';
import { useTaskboard } from "../../context/TaskboardProvider";

const ActiveSprintHeader = () => {
  const { sprints } = useTaskboard();
  const [activeSprint, setActiveSprint] = useState();
  const findActiveSprint = () => {
    const sprintData = sprints.find((sprint, index) => sprint.status === 1)
    setActiveSprint(sprintData);
  }
  useEffect(() => {
    findActiveSprint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprints]);
  return (
    <Box display="flex">
      <Typography sx={{ fontFamily: "montserrat", fontWeight: "bold", marginY: "auto", marginRight: "20px" }}>
        Project - {activeSprint?.projid} : {activeSprint?.sprintname}
      </Typography>
      <AssigneeFilterSelect width={300} />
      <Button variant='contained' size='small' sx={{ textTransform: "none", marginLeft: "auto", fontSize: "12px", bgcolor: "#091E420F", fontFamily: "montserrat", boxShadow: "none", color: "black" }}>
        Complete Sprint
      </Button>
    </Box>
  )
}

export default ActiveSprintHeader
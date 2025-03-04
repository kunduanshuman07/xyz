import React, { useState } from 'react'
import AccordianComponent from '../components/AccoridanComponent'
import { Box, Button } from '@mui/material'
import AssigneeFilterSelect from '../components/AssigneeFilterSelect'
import CreateSprintDialog from '../components/CreateSprintDialog'

const BacklogPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Box display={'flex'}>
        <AssigneeFilterSelect />
        <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginLeft: "auto", marginY: "10px" }} color='info' onClick={() => setOpen(true)} variant='contained' size='small'>+ Plan Sprint</Button>
      </Box>
      <AccordianComponent />
      {open && <CreateSprintDialog open={open} setOpen={setOpen} />}
    </div>
  )
}

export default BacklogPage
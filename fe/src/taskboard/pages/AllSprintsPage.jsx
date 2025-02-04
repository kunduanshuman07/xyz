import React, { useState } from 'react'
import AccordianComponent from '../components/AccoridanComponent'
import { Box, Button } from '@mui/material'
import AssigneeFilterSelect from '../components/AssigneeFilterSelect'
import { text } from '../../theme'
import CreateSprintDialog from '../components/CreateSprintDialog'

const BacklogPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Box display={'flex'}>
        <input
          type='text'
          placeholder='Search'
          style={{ background: '#F2F2F2', border: "none", lineHeight: "24px", width: "200px", fontSize: "12px", padding: "5px 20px", borderRadius: "8px", color: text.primary, margin: "auto 10px auto 0px", fontFamily: "Montserrat" }}
        />
        <AssigneeFilterSelect />
        <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginLeft: "auto", marginY: "10px" }} color='info' onClick={() => setOpen(true)} variant='contained' size='small'>+ New Sprint</Button>
      </Box>
      <AccordianComponent />
      {open && <CreateSprintDialog open={open} setOpen={setOpen}/>}
    </div>
  )
}

export default BacklogPage
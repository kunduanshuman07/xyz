import React, { useState } from 'react'
import AccordianContent from '../components/AccordianContent'
import { Box, Button } from '@mui/material'
import CreateIssueDialog from './CreateIssueDialog'

const IssueComponent = ({ comp }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginRight: "auto", marginY: "10px" }} color='info' onClick={() => setOpen(true)}>+ Create a new Issue</Button>
            <Box display={'flex'} flexDirection={'column'} sx={{ maxHeight: comp ? "230px" : "450px", overflowY: "auto" }} padding="5px" borderRadius={'10px'} >
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
                <AccordianContent />
            </Box>
            {open && <CreateIssueDialog open={open} setOpen={setOpen}/>}
        </div>
    )
}

export default IssueComponent
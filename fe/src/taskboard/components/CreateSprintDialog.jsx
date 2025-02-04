import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import { buttons } from '../../theme';
import CloseIcon from "@mui/icons-material/CloseSharp";
import NewSprint from './NewSprint';

const CreateSprintDialog = ({ open, setOpen }) => {
    const handleCloseDialog = () => {
        setOpen(false);
    }
    return (
        <Dialog maxWidth="lg" fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogTitle display='flex'>
                <Typography sx={{ fontSize: "16px", color: buttons.background, fontFamily: "montserrat", marginY: "auto", fontWeight: "bold" }}>
                    Create a new Sprint
                </Typography>
                <IconButton size='small' sx={{ marginLeft: "auto" }} onClick={handleCloseDialog}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: 'column'}}>
                <NewSprint/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSprintDialog
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { buttons } from '../../theme';
import CloseIcon from "@mui/icons-material/CloseSharp";
import Grid from "@mui/material/Grid2";
const CreateEpicDialog = ({ open, setOpen, handleCreateEpic }) => {
    const [epicname, setepicname] = useState("");
    const handleCloseDialog = () => {
        setOpen(false);
    }
    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogTitle display='flex'>
                <Typography sx={{ fontSize: "16px", color: buttons.background, fontFamily: "montserrat", marginY: "auto", fontWeight: "bold" }}>
                    Create a new Epic
                </Typography>
                <IconButton size='small' sx={{ marginLeft: "auto" }} onClick={handleCloseDialog}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: 'column' }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            placeholder={"Epic Name"}
                            label={""}
                            value={epicname}
                            onChange={(e) => setepicname(e.target.value)}
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
                </Grid>
                <Button variant='contained' sx={{ textTransform: "none", marginX: "auto", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background }} onClick={() => handleCreateEpic({epicname})}>Create Epic</Button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEpicDialog
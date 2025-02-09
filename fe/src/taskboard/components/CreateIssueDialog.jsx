import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { buttons } from '../../theme';
import CloseIcon from "@mui/icons-material/CloseSharp";
import Grid from "@mui/material/Grid2";
import { priorities } from '../utils';

const CreateIssueDialog = ({ open, setOpen, handleCreateIssue }) => {
  const [issuename, setissuename] = useState('');
  const [relversion, setrelversion] = useState('');
  const [priority, setpriority] = useState();
  const handleCloseDialog = () => {
    setOpen(false);
  }
  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle display='flex'>
        <Typography sx={{ fontSize: "16px", color: buttons.background, fontFamily: "montserrat", marginY: "auto", fontWeight: "bold" }}>
          Create a new Issue
        </Typography>
        <IconButton size='small' sx={{ marginLeft: "auto" }} onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          <Grid size={12}>
            <TextField
              placeholder={"Name"}
              value={issuename}
              onChange={(e) => setissuename(e.target.value)}
              label={"Name"}
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
          <Grid size={6}>
            <TextField
              placeholder={"Priority"}
              label={"Priority"}
              value={priority}
              onChange={(e) => setpriority(e.target.value)}
              fullWidth
              select
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
            >
              {priorities?.map((option, index) => (
                <MenuItem value={option?.id} key={index}>{option?.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              placeholder={"Release Version"}
              label={"Release Version"}
              value={relversion}
              onChange={(e) => setrelversion(e.target.value)}
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
        <Button variant='contained' sx={{ textTransform: "none", marginX: "auto", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background }} onClick={() => handleCreateIssue({ issuename, relversion, priority })}>Create Issue</Button>
      </DialogContent>
    </Dialog >
  )
}

export default CreateIssueDialog
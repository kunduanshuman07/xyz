import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { buttons } from '../../theme';
import CloseIcon from "@mui/icons-material/CloseSharp";
import Grid from "@mui/material/Grid2";

const CreateIssueDialog = ({ open, setOpen }) => {
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
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              placeholder={"Name"}
              label={""}
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
          <Grid size={8}>
            <TextField
              placeholder={"Description"}
              label={""}
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
              placeholder={"Priority"}
              label={""}
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
              placeholder={"Epic"}
              label={""}
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
              placeholder={"Sprint"}
              label={""}
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
              placeholder={"Release Version"}
              label={""}
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
              placeholder={"Assignee"}
              label={""}
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
              placeholder={"Credits"}
              label={""}
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
              placeholder={"Original Estimate (days)"}
              label={""}
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
        <Button variant='contained' sx={{ textTransform: "none", marginX: "auto", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background }}>Create Issue</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateIssueDialog
import React from 'react'
import Grid from "@mui/material/Grid2";
import { Box, Button, TextField, Typography } from '@mui/material';
import IssueComponent from './IssueComponent';
import { buttons } from '../../theme';
const NewSprint = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <TextField
          placeholder={"Sprint Name"}
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
          placeholder={"Start Date"}
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
          placeholder={"End Date"}
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
      <Grid size={12}>
        <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", marginY: "10px", color: "gray", fontWeight: "bold" }}>
          *Add Issues from the below list or you can add later as well
        </Typography>
        <IssueComponent comp={true} />
        <Box display={'flex'}>
          <Button variant='contained' sx={{ textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background }}>Create Sprint</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NewSprint
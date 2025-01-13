import React from 'react'
import Grid from "@mui/material/Grid2"
import { Box, Button, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { buttons, tabs, text } from '../../theme'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PublishIcon from '@mui/icons-material/Publish';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const CreateExpensePage = () => {
  return (
    <Grid container spacing={3} sx={{
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      padding: "15px"
    }}>
      <Grid size={4}>
        <TextField
          placeholder='Purpose'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder='Category'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder='Expense Name'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder='Project'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={2}>
        <TextField
          placeholder='Currency'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={3}>
        <TextField
          placeholder='Amount'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={3}>
        <TextField
          placeholder='Reciept Date'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder='Purpose'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder='Category'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          placeholder='Expense Name'
          fullWidth
          size='small'
          sx={{
            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
              fontSize: "12px",
              fontFamily: "Montserrat",
            }
          }}
        />
      </Grid>
      <Grid size={12}>
        <Box display={'flex'} flexDirection={'column'} bgcolor={text.secondary} height={'150px'} borderRadius={'10px'} paddingX={'10px'} sx={{ cursor: "pointer" }}>
          <Typography sx={{ fontFamily: "Montserrat", color: text.primary, margin: "20px auto", fontWeight: "bold" }}>Upload Attachment</Typography>
          <CloudUploadIcon sx={{ marginX: "auto", color: tabs.backgroundm, fontSize: "36px" }} />
          <Typography sx={{ color: buttons.background, fontSize: "12px", fontWeight: "bold", margin: "10px auto", fontFamily: "Montserrat" }}>Supported formats : .xlxs, pdf, png</Typography>
        </Box>
      </Grid>
      <Grid size={12} display={'flex'}>
        <Typography sx={{ margin: "auto 10px", fontSize: "12px", fontFamily: "Montserrat", color: 'gray', fontWeight: "bold" }}>Uploaded Attachments : </Typography>
      </Grid>
      <Grid size={12} display={'flex'}>
        <Checkbox checkedIcon={<DoneAllIcon />} />
        <Typography sx={{ margin: "auto 10px", fontFamily: "Montserrat", color: text.primary }}>I hereby declare that the provided information is true !</Typography>
      </Grid>
      <Grid size={12} display={'flex'}>
        <Box display={'flex'} marginLeft={"auto"}>
          <Button variant='contained' sx={{ textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} startIcon={<BookmarkIcon />}>Save</Button>
          <Button variant='contained' sx={{ textTransform: "none", marginX: "10px", marginY: "20px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} startIcon={<PublishIcon />}>Submit</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CreateExpensePage
import { Avatar, Box, Button, TextField } from '@mui/material'
import React from 'react'
import { buttons } from '../../theme'

const CommentsFieldComp = ({ user, comment, setComment, handleAddComment }) => {
    return (
        <Box display={'flex'}>
            <Avatar sx={{ width: "20px", height: "20px", marginY: "auto", fontSize: "8px", bgcolor: buttons.background }}>
                {user?.empname?.split(' ')[0][0]}{user?.empname?.split(' ')[1][0]}
            </Avatar>
            <TextField
                size="small"
                placeholder="Add Comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                sx={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "10px",
                    marginY: "auto",
                    marginLeft: "5px",
                    ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
                        fontSize: "0.5rem",
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                    },
                    ".css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input": {
                        height: "0.5rem",
                    },
                }}
            />
            <Button size="small" color="secondary" sx={{ textTransform: "none", fontFamily: "montserrat" }} onClick={handleAddComment}>Add</Button>
        </Box>
    )
}

export default CommentsFieldComp
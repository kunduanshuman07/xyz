import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Close as CloseIcon, Done as DoneIcon } from "@mui/icons-material";

const DisplayCommentsComp = ({ x, user, handleEditComment, handleDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [newcomment, setnewcomment] = useState(x?.comment)
    const handleEdit = () => {
        setEditMode(true);
    }
    const handleUpdateComment = async () => {
        await handleEditComment(x.newCommentId, newcomment);
        setEditMode(false);
    }
    return (
        <Box display={'flex'} marginTop={'12px'}>
            <Avatar sx={{ width: "30px", height: "30px", marginY: "auto", fontSize: "10px" }}>
                {x?.empname?.split(' ')[0][0]}{x?.empname?.split(' ')[1][0]}
            </Avatar>
            <Box display={'flex'} flexDirection={'column'}>
                <Typography sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat", color: "gray", marginLeft: "10px" }}>{x?.empname}  <span style={{ fontSize: "8px", marginLeft: "10px", fontWeight: "bold" }}>{new Date(x?.date).toLocaleTimeString()}</span></Typography>
                {!editMode ?
                    <Typography sx={{
                        fontSize: "10px", fontFamily: "montserrat", marginLeft: "10px", wordWrap: "break-word",
                        whiteSpace: "normal",
                        marginY: "5px",
                        maxWidth: "450px",
                    }}>{x?.comment}</Typography> :
                    <Box display={'flex'} width={'100%'}>
                        <TextField
                            value={newcomment}
                            onChange={(e) => setnewcomment(e.target.value)}
                            placeholder={newcomment}
                            size='small'
                            sx={{
                                marginLeft: "10px",
                                // marginY: "1px",
                                width: "400px",
                                ".css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                                    fontSize: "0.6rem",
                                    fontFamily: "Montserrat",
                                },
                                ".css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input": {
                                    height: "0.5rem",
                                },
                            }}
                        />
                        <CloseIcon
                            sx={{ fontSize: "12px", color: "black", bgcolor: "#f5f3f2", borderRadius: "2px", cursor: "pointer", marginY: "auto", marginLeft: "20px" }}
                            onClick={() => setEditMode(false)}
                        />
                        <IconButton sx={{ fontSize: "12px", color: "black", bgcolor: "#f5f3f2", borderRadius: "2px", cursor: "pointer", marginY: "auto", marginLeft: "10px", padding: "1px" }} onClick={handleUpdateComment}>
                            <DoneIcon sx={{ fontSize: "12px" }} />
                        </IconButton>
                    </Box>
                }
                <Box display={'flex'} marginLeft={'10px'}>
                    <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", marginY: "auto" }}>{new Date(x?.date).toLocaleDateString()}</Typography>
                    {user?.empid === x?.empid &&
                        <Box display={'flex'}>
                            {/* <Button size="small" sx={{ fontSize: "10px", textTransform: "none", fontFamily: "montserrat", marginY: "auto" }} onClick={handleEdit}>Edit</Button> */}
                            <Button size="small" sx={{ fontSize: "10px", textTransform: "none", fontFamily: "montserrat", marginY: "auto" }} onClick={() => handleDelete(x.newCommentId)}>Delete</Button>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default DisplayCommentsComp
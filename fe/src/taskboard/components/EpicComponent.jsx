import React, { useEffect, useState } from 'react'
import AccordianContent from '../components/EpicAccordian'
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material'
import CreateEpicDialog from './CreateEpicDialog'
import { axiosInstance } from "../../hooks/useApiCall";

const EpicComponent = ({ comp }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [epics, setEpics] = useState([]);
    const handleCreateEpic = async ({ epicname }) => {
        setLoading(true);
        try {
            await axiosInstance({
                url: "/taskboard/create-epic",
                method: "POST",
                data: { epicname }
            })
        } catch (error) {

        } finally {
            setOpen(false);
            handleFetchEpics();
        }
    }
    const handleFetchEpics = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/get-epics",
                method: "GET",
            })
            setEpics(response?.data?.results);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        handleFetchEpics();
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Button sx={{ textTransform: "none", marginTop: "5px", textAlign: "left", marginRight: "auto", marginY: "10px" }} color='info' onClick={() => setOpen(true)}>+ Create a new Epic</Button>
            <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", color: "gray", fontWeight: "bold", marginLeft: "auto", marginRight: "10px" }}>*Click to view details</Typography>
            <Box display={'flex'} flexDirection={'column'} sx={{ maxHeight: comp ? "330px" : "490px", overflowY: "auto" }} padding="5px" borderRadius={'10px'} >
                {epics?.map((epic, index) => (
                    <AccordianContent key={index} data={epic} />
                ))}
            </Box>
            {open && <CreateEpicDialog open={open} setOpen={setOpen} handleCreateEpic={handleCreateEpic} />}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
        </div>
    )
}

export default EpicComponent
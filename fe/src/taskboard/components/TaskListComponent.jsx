import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid2";
import TaskGrid from "./TaskGrid";
import { axiosInstance } from '../../hooks/useApiCall';
import { Backdrop, CircularProgress } from '@mui/material';

const items = [
    {
        id: 0,
        label: "TO DO",
    },
    {
        id: 1,
        label: "IN PROGRESS"
    },
    {
        id: 2,
        label: "DONE"
    }
]

const TaskListComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setloading] = useState(false);
    const handleFetchIssues = async () => {
        try {
            const response = await axiosInstance({
                url: "/taskboard/active-sprint-tasks",
                method: "GET",
            })
            setTasks(response?.data?.results);
        } catch (error) {

        } finally {
            setloading(false);
        }
    }
    useEffect(() => {
        handleFetchIssues();
    }, [])
    return (
        <Grid sx={{ marginTop: "20px" }} container spacing={2}>
            {items?.map((x, index) => (
                <TaskGrid label={x.label} key={index} id={x.id} data={tasks} handleFetchTasks={handleFetchIssues}/>
            ))}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
        </Grid>
    )
}

export default TaskListComponent
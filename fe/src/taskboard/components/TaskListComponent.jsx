import React from 'react'
import Grid from "@mui/material/Grid2";
import TaskGrid from "./TaskGrid";

const items = [
    {
        label: "TO DO",
    },
    {
        label: "IN PROGRESS"
    },
    {
        label: "DONE"
    }
]

const TaskListComponent = () => {
    return (
        <Grid sx={{ marginTop: "20px" }} container spacing={2}>
            {items?.map((x, index) => (
                <TaskGrid label={x.label} key={index} />
            ))}
        </Grid>
    )
}

export default TaskListComponent
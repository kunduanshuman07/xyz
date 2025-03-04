import React from 'react'
import Grid from "@mui/material/Grid2";
import TaskGrid from "./TaskGrid";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    return (
        <Grid sx={{ marginTop: "20px" }} container spacing={2}>
            {items?.map((x, index) => (
                <DndProvider backend={HTML5Backend} key={index}>
                    <TaskGrid label={x.label} key={index} id={x.id} />
                </DndProvider>
            ))}
        </Grid>
    )
}

export default TaskListComponent
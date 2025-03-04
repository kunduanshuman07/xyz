import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid2";
import { Avatar, Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { tabs, text } from '../../theme';
import BugReportIcon from '@mui/icons-material/BugReport';
import EmergencyIcon from '@mui/icons-material/Emergency';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { axiosInstance } from '../../hooks/useApiCall';
import ViewIssueDialog from './ViewIssueDialog';
import { useDrag, useDrop } from 'react-dnd';
import { useTaskboard } from '../../context/TaskboardProvider';
import { useAssigneeFilter } from '../../context/AssigneFilterProvider';

const ItemTypes = {
    TASK: 'task',
};

const TaskCard = ({ task, priorityIcons, handleViewIssue }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <Box
            ref={drag}
            display='flex'
            flexDirection='column'
            sx={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
                bgcolor: "white",
                marginTop: "10px",
                padding: "5px 10px",
                cursor: "pointer",
                opacity: isDragging ? 0.5 : 1,
                ":hover": { bgcolor: "#e8e9eb" },
            }}
            onClick={() => handleViewIssue(task)}
        >
            <Typography sx={{ fontFamily: "montserrat", fontSize: "12px" }}>{task?.issuename}</Typography>
            <Typography sx={{ bgcolor: "blueviolet", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "10px", fontFamily: "montserrat", fontWeight: "bold", margin: "5px auto 5px 0px" }}>{task?.epicname}</Typography>
            <Box display='flex'>
                <Button startIcon={<BugReportIcon sx={{ fontSize: "10px" }} />} size='small' sx={{ textTransform: "none", fontSize: "10px", fontWeight: "bold", fontFamily: "montserrat", marginRight: "auto" }} color='warning'>P001-{task?.id}</Button>
                <Typography sx={{ fontSize: "10px", fontFamily: "montserrat", marginY: "auto" }}>{task?.orig_estimate}d</Typography>
                {priorityIcons[task?.priority]?.icon}
                <Avatar sx={{ width: "20px", height: "20px", fontSize: "8px", margin: "auto 5px", fontWeight: "bold", fontFamily: "montserrat", bgcolor: tabs.background }}>
                    {task?.empname?.split(' ')[0][0]}{task?.empname?.split(' ')[1][0]}
                </Avatar>
            </Box>
        </Box>
    );
};

const TaskGrid = ({ id, label }) => {
    const priorityIcons = {
        0: { icon: <PriorityHighIcon sx={{ fontSize: "16px", color: "red", margin: "auto 5px" }} />, title: "High" },
        1: { icon: <EmergencyIcon sx={{ fontSize: "16px", color: "yellow", margin: "auto 5px" }} />, title: "Medium" },
        2: { icon: <LowPriorityIcon sx={{ fontSize: "16px", color: "blue", margin: "auto 5px" }} />, title: "Low" }
    }

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => onDropTask(item.task, id),
    }));

    const [viewissue, setviewissue] = useState(false);
    const [viewissuedata, setviewissuedata] = useState();
    const [filteredTasks, setFilteredTasks] = useState([]);
    const {
        tasks,
        loading,
        setLoading,
        fetchActiveSprintTasks,
        fetchIssues,
    } = useTaskboard();
    const { personName, search } = useAssigneeFilter();
    const onDropTask = async (task, newStatus) => {
        try {
            await axiosInstance({
                url: "/taskboard/update-issue",
                method: "POST",
                data: { key: 'status', value: newStatus, issueid: task?.id }
            })
            fetchIssues();
            fetchActiveSprintTasks();
        } catch (error) {

        } finally {
            setLoading(false);
        }

    };
    const handleViewIssue = (task) => {
        setviewissuedata(task);
        setviewissue(true);
    };
    useEffect(() => {
        if (tasks) {
            let filteredData = tasks;

            if (personName.length > 0) {
                filteredData = filteredData.filter(task => personName.includes(task.empid));
            }

            if (search) {
                filteredData = filteredData.filter(task =>
                    task.issuename?.toLowerCase().includes(search?.toLowerCase())
                );
            }

            setFilteredTasks(filteredData);
        }
    }, [personName, tasks, search]);

    return (
        <Grid
            ref={drop}
            size={4}
            sx={{ bgcolor: "#091E420F", minHeight: "500px", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column" }}
        >
            <Typography sx={{ fontSize: "12px", fontFamily: "montserrat", color: text.primary }}>{label}</Typography>
            {filteredTasks && filteredTasks?.map((task, index) => (
                task?.status === id && (
                    <TaskCard
                        key={index}
                        task={task}
                        onDropTask={onDropTask}
                        priorityIcons={priorityIcons}
                        handleViewIssue={handleViewIssue}
                    />
                )
            ))}
            {viewissue && (
                <ViewIssueDialog
                    open={viewissue}
                    setOpen={setviewissue}
                    data={viewissuedata}
                />
            )}
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
        </Grid>
    )
}

export default TaskGrid
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { buttons, text } from '../../theme';
import { axiosInstance } from '../../hooks/useApiCall';

const BulkEditDrawer = ({ toggleDrawer, state, anchor, assigneelist, selectedIds, sprints, priorities, statuses, epics, handleFetchIssues, setSelectedIssues, setState }) => {
    const [priority, setpriority] = useState();
    const [status, setstatus] = useState();
    const [assignee, setassignee] = useState();
    const [sprint, setsprint] = useState();
    const [epic, setepic] = useState();

    const edittableFields = [
        {
            label: "Priority",
            value: priority,
            options: priorities,
            setterfunction: setpriority,
        },
        {
            label: "Status",
            value: status,
            options: statuses,
            setterfunction: setstatus,
        },
        {
            label: "Assignee",
            value: assignee,
            options: assigneelist,
            setterfunction: setassignee,
        },
        {
            label: "Sprint",
            value: sprint,
            options: sprints,
            setterfunction: setsprint,
        },
        {
            label: "Epic",
            value: epic,
            options: epics,
            setterfunction: setepic,
        },
    ]

    const handleApplyEdits = async () => {
        try {
            const updates = {};

            if (priority !== undefined) updates.priority = priority;
            if (status !== undefined) updates.status = status;
            if (assignee !== undefined) updates.empid = assignee;
            if (sprint !== undefined) updates.sprintid = sprint;
            if (epic !== undefined) updates.epicid = epic;

            if (Object.keys(updates).length === 0) return;

            const issueIds = selectedIds?.map((issue, index) => {
                return issue.id;
            })

            await axiosInstance({
                url: "/taskboard/update-issues-bulk",
                method: "POST",
                data: { updates, issueids: issueIds }
            });
            handleFetchIssues();
        } catch (error) {
            console.error("Error updating issues:", error);
        } finally {
            setState({right: false});
        }
    };


    const list = (anchor) => (
        <Box
            display={'flex'}
            flexDirection={'column'}
            sx={{ width: 250, paddingX: "10px" }}
            role="presentation"
        >
            <Typography sx={{fontSize: "12px", fontFamily: "montserrat", margin: "10px auto 0px auto", color: text.primary, fontWeight: "bold"}}>Bulk Edit on Selected Issues</Typography>
            {edittableFields?.map((x, index) => (
                <TextField
                    size="small"
                    label={x.label}
                    value={x.value}
                    onChange={(e) => x.setterfunction(e.target.value)}
                    select={true}
                    fullWidth
                    // autoFocus
                    sx={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        marginTop: "15px",
                        ".css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                            fontFamily: "Montserrat",
                            fontSize: "12px"
                        },
                    }}
                >
                    {x?.options?.map((option, index) => (
                        <MenuItem value={option?.id} key={index} sx={{ fontSize: "14px", fontFamily: "montserrat" }}>{option?.label}</MenuItem>
                    ))}
                </TextField>
            ))}
            <Box display={'flex'} marginTop={'30px'}>
                <Button sx={{ textTransform: "none", bgcolor: buttons.background }} variant='contained' onClick={handleApplyEdits}>Apply Edits</Button>
                <Button sx={{ textTransform: "none", marginLeft: "10px", bgcolor: "gray" }} variant='contained' onClick={toggleDrawer('right', false)}>Cancel</Button>
            </Box>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}

export default BulkEditDrawer;
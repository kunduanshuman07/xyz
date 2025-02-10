import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseSharp";
import Grid from "@mui/material/Grid2";
import { issuestatus, priorities } from "../utils";
import EditableField from "./EditableField";
import TextAreaComp from "./TextAreaComp";
import { buttons, text } from "../../theme";
import { axiosInstance } from "../../hooks/useApiCall";

const ViewIssueDialog = ({ open, setOpen, data, epics, assignees, epiclabels, assigneelabels, handleUpdate, sprintlabels, sprints }) => {
    const user = JSON.parse(sessionStorage.getItem("User"));
    const [priority, setpriority] = useState(data?.priority);
    const [status, setstatus] = useState(data?.status);
    const [assignee, setassignee] = useState(data?.empid);
    const [sprint, setsprint] = useState(data?.sprintid);
    const [epic, setepic] = useState(data?.epicid);
    const [org_estimate, setorgestimate] = useState(data?.orig_estimate);
    const [logged_estimate, setloggedestimate] = useState(data?.logged_estimate);
    const [credits, setcredits] = useState(data?.credits);
    const [description, setDescription] = useState(data?.issue_desc);
    const [comments, setComments] = useState(data?.comments);
    const [comment, setComment] = useState();
    const [loading, setLoading] = useState();

    const statuslabels = {
        0: "Setup",
        1: "Inprogress",
        2: "Done"
    }

    const prioritylabels = {
        0: "High",
        1: "Medium",
        2: "Low"
    }

    const toggleModes = {
        'orig_estimate': 'org',
        'logged_estimate': 'logged',
        'credits': 'credits',
        'issue_desc': 'desc'
    }

    const [editModes, setEditModes] = useState({
        priority: false,
        status: false,
        assignee: false,
        sprint: false,
        epic: false,
        org: false,
        logged: false,
        credits: false,
        desc: false,
    });

    const handleEditToggle = (field) => {
        setEditModes((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleValueChange = async (e, func, key, togglemode) => {
        func(e.target.value);
        await handleUpdate({ key: key, value: e.target.value, issueid: data?.id });
        handleEditToggle(togglemode);
    }

    const handleValueChangeWOSelect = async ({ value, key }) => {
        await handleUpdate({ key: key, value: value, issueid: data?.id });
        handleEditToggle(toggleModes[key]);
    };
    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance({
                url: "/taskboard/fetch-comments",
                method: "POST",
                data: { issueid: data?.id }
            })
            console.log(data);
            setComments(response?.data);
            setComment('');
        } catch (error) {

        } finally {
            // setOpen(false);
        }
    }
    const handleAddComment = async () => {
        setLoading(true);
        try {
            await axiosInstance({
                url: "/taskboard/add-comment",
                method: "POST",
                data: { empid: user?.empid, empname: user?.empname, comment: comment, issueid: data?.id }
            })
            fetchComments();
        } catch (error) {

        } finally {
            // setOpen(false);
        }
    }
    useEffect(() => {
        fetchComments();
    }, [])
    const edittableFields = [
        {
            label: "Priority",
            value: priority,
            options: priorities,
            textdisplay: prioritylabels[priority],
            setterfunction: setpriority,
            toggleMode: 'priority',
            select: true,
            woSelect: "",
            keyid: 'priority'
        },
        {
            label: "Status",
            value: status,
            options: issuestatus,
            textdisplay: statuslabels[status],
            setterfunction: setstatus,
            toggleMode: 'status',
            select: true,
            woSelect: "",
            keyid: 'status'
        },
        {
            label: "Assignee",
            value: assignee,
            options: assignees,
            textdisplay: assigneelabels[assignee],
            setterfunction: setassignee,
            toggleMode: 'assignee',
            select: true,
            woSelect: "",
            keyid: 'empid'
        },
        {
            label: "Sprint",
            value: sprint,
            options: sprints,
            textdisplay: sprintlabels[sprint],
            setterfunction: setsprint,
            toggleMode: 'sprint',
            select: true,
            woSelect: "",
            keyid: 'sprintid'
        },
        {
            label: "Epic",
            value: epic,
            options: epics,
            textdisplay: epiclabels[epic],
            setterfunction: setepic,
            toggleMode: 'epic',
            select: true,
            woSelect: "",
            keyid: 'epicid'
        },
        {
            label: "Org Estimate (days)",
            value: org_estimate,
            options: '',
            textdisplay: org_estimate,
            setterfunction: setorgestimate,
            toggleMode: 'org',
            select: false,
            woSelect: handleValueChangeWOSelect,
            keyid: 'orig_estimate'
        },
        {
            label: "Utilized Time (days)",
            value: logged_estimate,
            options: '',
            textdisplay: logged_estimate,
            setterfunction: setloggedestimate,
            toggleMode: 'logged',
            select: false,
            woSelect: handleValueChangeWOSelect,
            keyid: 'logged_estimate'
        },
        {
            label: "Credits",
            value: credits,
            options: '',
            textdisplay: credits,
            setterfunction: setcredits,
            toggleMode: 'credits',
            select: false,
            woSelect: handleValueChangeWOSelect,
            keyid: 'credits'
        },
    ]

    return (
        <Dialog maxWidth="md" fullWidth open={open} onClose={handleCloseDialog}>
            <DialogTitle display="flex">
                <Typography
                    sx={{
                        fontSize: "15px",
                        color: "black",
                        fontFamily: "montserrat",
                        marginY: "auto",
                        fontWeight: "bold",
                    }}
                >
                    {data?.projid} - {data?.id}
                </Typography>
                <IconButton size="small" sx={{ marginLeft: "auto" }} onClick={handleCloseDialog}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ display: "flex" }}>
                    <Grid size={8} sx={{ display: "flex", flexDirection: "column", height: "400px", overflowY: "auto", paddingX: "8px" }}>
                        <Typography sx={{ fontFamily: "montserrat", fontSize: "18px" }}>{data?.issuename}</Typography>
                        <Typography
                            sx={{
                                bgcolor: "green",
                                padding: "2px 5px",
                                color: "white",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontFamily: "montserrat",
                                fontWeight: "bold",
                                marginTop: "10px",
                                marginRight: "auto",
                            }}
                        >
                            {data?.relversion}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", fontFamily: "montserrat", fontSize: "12px", color: "gray", marginTop: "10px" }}>Description</Typography>
                        {editModes['desc'] ?
                            <TextAreaComp handleEditToggle={handleEditToggle} description={description} setdescription={setDescription} handleValueChangeWOSelect={handleValueChangeWOSelect} />
                            :
                            <Box
                                sx={{
                                    color: "black",
                                    fontFamily: "montserrat",
                                    marginTop: "10px",
                                    fontWeight: "bold",
                                    background: "#f5f3f2",
                                    minHeight: "100px",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleEditToggle('desc')}
                            >
                                <Typography sx={{ fontSize: "10px", fontFamily: "montserrat", color: text.primary, fontWeight: "bold" }}>{description}</Typography>
                            </Box>
                        }
                        <Box display="flex" marginY="10px">
                            <Button
                                size="small"
                                sx={{
                                    padding: "1px 5px",
                                    // bgcolor: "whitesmoke",
                                    textTransform: "none",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    fontFamily: "montserrat",
                                }}
                            >
                                Comments
                            </Button>
                        </Box>
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
                        {comments?.map((x, index) => (
                            <Box display={'flex'} marginTop={'12px'}>
                                <Avatar sx={{ width: "30px", height: "30px", marginY: "auto", fontSize: "10px" }}>
                                    {x?.empname?.split(' ')[0][0]}{x?.empname?.split(' ')[1][0]}
                                </Avatar>
                                <Box display={'flex'} flexDirection={'column'}>
                                    <Typography sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat", color: "gray", marginLeft: "10px" }}>{x?.empname}  <span style={{fontSize: "8px", marginLeft: "10px", fontWeight: "bold"}}>{new Date(x?.date).toLocaleTimeString()}</span></Typography>
                                    <Typography sx={{
                                        fontSize: "10px", fontFamily: "montserrat", marginLeft: "10px", wordWrap: "break-word",
                                        whiteSpace: "normal",
                                        marginY: "5px",
                                        maxWidth: "450px",
                                    }}>{x?.comment}</Typography>
                                    <Box display={'flex'} marginLeft={'10px'}>
                                        <Typography sx={{ fontFamily: "montserrat", fontSize: "10px", marginY: "auto" }}>{new Date(x?.date).toLocaleDateString()}</Typography>
                                        {user?.empid === x?.empid &&
                                            <Box display={'flex'}>
                                                <Button size="small" sx={{ fontSize: "10px", textTransform: "none", fontFamily: "montserrat", marginY: "auto" }}>Edit</Button>
                                                <Button size="small" sx={{ fontSize: "10px", textTransform: "none", fontFamily: "montserrat", marginY: "auto" }}>Delete</Button>
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                    <Grid size={4} sx={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}>
                        <Typography sx={{ fontSize: "12px", fontFamily: "montserrat", fontWeight: "bold", color: "gray" }}>
                            Date Created: {new Date(data?.created).toLocaleDateString()}
                        </Typography>
                        {edittableFields?.map((x, index) => (
                            <EditableField
                                label={x.label}
                                value={x.value}
                                options={x.options}
                                textdisplay={x.textdisplay}
                                onChange={(e) => handleValueChange(e, x.setterfunction, x.keyid, x.toggleMode)}
                                onEditToggle={() => handleEditToggle(x.toggleMode)}
                                editMode={editModes[x.toggleMode]}
                                select={x.select}
                                woSelect={x.woSelect}
                                func={x.setterfunction}
                                keyid={x.keyid}
                            />
                        ))}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ViewIssueDialog;

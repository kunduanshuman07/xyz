import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseSharp";
import Grid from "@mui/material/Grid2";
import { issuestatus, priorities } from "../utils";
import EditableField from "./EditableField";
import TextAreaComp from "./TextAreaComp";
import { text } from "../../theme";
import { axiosInstance } from "../../hooks/useApiCall";
import DisplayCommentsComp from "./DisplayCommentsComp";
import CommentsFieldComp from "./CommentsFieldComp";
import { useTaskboard } from "../../context/TaskboardProvider";

const ViewIssueDialog = ({ open, setOpen, data }) => {
    const { 
            sprintArray,
            sprintLabels,
            epics,
            epicLabels,
            assignees,
            assigneeLabels,
            setLoading,
            updateIssue
         } = useTaskboard();
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
        await updateIssue({ key: key, value: e.target.value, issueid: data?.id });
        handleEditToggle(togglemode);
    }

    const handleValueChangeWOSelect = async ({ value, key }) => {
        await updateIssue({ key: key, value: value, issueid: data?.id });
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
            setComments(response?.data);
            setComment('');
        } catch (error) {

        } finally {
            setLoading(false);
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
        }
    }

    const handleDeleteComment = async (commentid) => {
        setLoading(true);
        try {
            await axiosInstance({
                url: "/taskboard/delete-comment",
                method: "POST",
                data: { commentid: commentid, issueid: data?.id }
            })
            fetchComments();
        } catch (error) {

        } finally {
        }
    }

    const handleEditComment = async (commentid, newComment) => {
        setLoading(true);
        try {
            await axiosInstance({
                url: "/taskboard/edit-comment",
                method: "POST",
                data: { commentid: commentid, issueid: data?.id, newcomment: newComment }
            })
            fetchComments();
        } catch (error) {

        } finally {
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
            textdisplay: assigneeLabels[assignee],
            setterfunction: setassignee,
            toggleMode: 'assignee',
            select: true,
            woSelect: "",
            keyid: 'empid'
        },
        {
            label: "Sprint",
            value: sprint,
            options: sprintArray,
            textdisplay: sprintLabels[sprint],
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
            textdisplay: epicLabels[epic],
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
                                    textTransform: "none",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    fontFamily: "montserrat",
                                }}
                            >
                                Comments
                            </Button>
                        </Box>
                        <CommentsFieldComp user={user} comment={comment} setComment={setComment} handleAddComment={handleAddComment} />
                        {comments?.map((x, index) => (
                            <DisplayCommentsComp x={x} user={user} key={index} handleDelete={handleDeleteComment} handleEditComment={handleEditComment}/>
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
                                key={index}
                            />
                        ))}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ViewIssueDialog;

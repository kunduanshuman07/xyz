import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IssueStatusGraph from './IssueStatusGraph'
import { axiosInstance } from "../../hooks/useApiCall"
import Grid from "@mui/material/Grid2"
const IssueStatusGraphComp = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const fetchIssueStatues = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/taskboard-overview/issue-statuses");
            if (response?.status === 200) {
                setData(response?.data?.results)
            }
        } catch (error) {
            console.error("Error creating issue:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchIssueStatues();
    }, [])
    return (
        <Grid size={3} sx={{ borderRadius: "8px", bgcolor: "#fcfafa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", marginY: "auto", padding: "5px" }}>
            <Typography sx={{ fontFamily: "montserrat", fontSize: "12px", fontWeight: "bold", color: "gray" }}>
                Issue Status
            </Typography>
            <IssueStatusGraph data={data} />
        </Grid>
    )
}

export default IssueStatusGraphComp
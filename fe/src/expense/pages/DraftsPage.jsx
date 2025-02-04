import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid2"
import ExpenseDrafts from "../components/ExpenseDrafts";
import { axiosInstance } from '../../hooks/useApiCall';

const DraftsPage = () => {
    const user = JSON.parse(sessionStorage.getItem("User"));
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        const fetchExpenseOverview = async () => {
            setloading(true);
            try {
                const response = await axiosInstance({
                    url: '/expense/fetch-drafts',
                    method: 'POST',
                    data: { empid: user?.empid }
                })
                setdata(response?.data?.results);
            } catch (err) {
                seterror(err);
            } finally {
                setloading(false);
            }
        }

        fetchExpenseOverview();

    }, []);
    return (
        <Grid container spacing={3} sx={{
            padding: "15px",
            marginTop: "20px"
        }}>
            <ExpenseDrafts data = {data}/>
        </Grid>
    )
}

export default DraftsPage
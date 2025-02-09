import React from 'react'
import IssueComponent from '../components/IssueComponent'
import EpicComponent from '../components/EpicComponent'
import Grid from '@mui/material/Grid2';

const IssuesPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={9}>
                <IssueComponent/>
            </Grid>
            <Grid size={3}>
                <EpicComponent/>
            </Grid>
        </Grid>
    )
}

export default IssuesPage
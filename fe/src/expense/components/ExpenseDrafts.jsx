import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { buttons } from '../../theme';

export default function ExpenseDrafts({ setFormData, handleTabChange }) {
    const handleEdit = (index) => {
        setFormData('');
        handleTabChange(null, '1');
    }
    return (
        <Grid container sx={{ width: '100%' }}>
            <Grid container size={12} sx={{ marginTop: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", padding: "10px", borderRadius: "10px" }}>
                <Grid size={1} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>No.</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>1</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Project</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Project</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Name</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Medical Expense</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Amount</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Expense Amount</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Purpose</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Expense Purpose</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Category</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Expense Category</Typography>
                </Grid>
                <Grid size={1}>
                    <Button variant='contained' size='small' sx={{ textTransform: "none", borderRadius: "8px", bgcolor: buttons.background }} startIcon={< EditAttributesIcon />}>Edit</Button>
                </Grid>
            </Grid>
            <Grid container size={12} sx={{ marginTop: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", padding: "10px", borderRadius: "10px" }}>
                <Grid size={1} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>No.</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>1</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Project</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Project</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Name</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Medical Expense</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Amount</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Expense Amount</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Purpose</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Expense Purpose</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Category</Typography>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>Expense Category</Typography>
                </Grid>
                <Grid size={1}>
                    <Button variant='contained' size='small' sx={{ textTransform: "none", borderRadius: "8px", bgcolor: buttons.background }} startIcon={< EditAttributesIcon />} onClick={() => handleEdit(1)}>Edit</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

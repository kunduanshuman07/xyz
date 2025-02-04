import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { buttons } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { currencies } from '../utils';

export default function ExpenseDrafts({ data }) {
    const navigate = useNavigate();
    const handleEdit = (item) => {
        const serializedItem = encodeURIComponent(JSON.stringify(item));
        navigate(`/expense/create?data=${serializedItem}`);
    }
    return (
        <>
            {data?.length === 0 &&
                <Grid size={12}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", textAlign: "center", color: "gray", fontWeight: "bold" }}>You have no saved expenses !</Typography>
                </Grid>
            }
            <Grid container sx={{ width: '100%' }}>
                {data?.map((item, index) => (
                    <Grid container size={12} sx={{ marginTop: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", padding: "10px", borderRadius: "10px" }}>
                        <Grid size={1} sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>No.</Typography>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>{index + 1}</Typography>
                        </Grid>
                        <Grid size={2}>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Project</Typography>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>{item?.projid}-{item?.projname}</Typography>
                        </Grid>
                        <Grid size={2}>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Name</Typography>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>{item?.expensename}</Typography>
                        </Grid>
                        <Grid size={2}>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "8px", textAlign: "left", color: "gray", fontWeight: "bold" }}>Expense Amount</Typography>
                            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", textAlign: "left" }}>{`${currencies?.find(i => i.id === item?.currencyid)?.currency} ${item?.amount}`}</Typography>
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
                            <Button variant='contained' size='small' sx={{ textTransform: "none", borderRadius: "8px", bgcolor: buttons.background }} startIcon={< EditAttributesIcon />} onClick={() => handleEdit(item)}>Edit</Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

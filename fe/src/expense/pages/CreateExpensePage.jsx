import React from 'react'
import Grid from "@mui/material/Grid2"
import ExpenseSubmitComp from '../components/ExpenseSubmitComp';
import useApiCall from '../../hooks/useApiCall';
import { useLocation } from 'react-router-dom';

const CreateExpensePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serializedItem = queryParams.get('data');
  const item = JSON.parse(decodeURIComponent(serializedItem));

  const { data, error, loading } = useApiCall(
    '/expense/expense-taxonomy',
    'GET',
  );

  return (
    <Grid container spacing={3} sx={{
      padding: "15px",
      marginTop: "20px"
    }}>
      <ExpenseSubmitComp data={data} item={item}/>
    </Grid>
  )
}

export default CreateExpensePage
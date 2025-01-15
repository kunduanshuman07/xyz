import React, { useState } from 'react'
import Grid from "@mui/material/Grid2"
import { Tab, Tabs } from '@mui/material';
import ExpenseSubmitComp from '../components/ExpenseSubmitComp';
import ExpenseDrafts from '../components/ExpenseDrafts';
import useApiCall from '../../hooks/useApiCall';

const CreateExpensePage = () => {
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState('1');
  const { data, error, loading } = useApiCall(
    '/expense/expense-taxonomy',
    'GET',
  );

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={3} sx={{
      padding: "15px",
    }}>
      <Grid size={12} display={'flex'}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="Raise Expense" sx={{ textTransform: "none", fontFamily: "Montserrat" }} />
          <Tab value="2" label="Drafts" sx={{ textTransform: "none", fontFamily: "Montserrat" }} />
        </Tabs>
      </Grid>
      {value === '1' && <ExpenseSubmitComp data={data} />}
      {value === '2' && <ExpenseDrafts setFormData={setFormData} handleTabChange={handleTabChange} />}
    </Grid>
  )
}

export default CreateExpensePage
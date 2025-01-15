import React, { useEffect, useState } from 'react'
import AppbarComponent from '../expense/components/AppbarComponent'
import { SkillTabs } from './utils'
import { Route, Routes } from 'react-router-dom'
import Overview from './pages/Overview'
import { Box } from '@mui/material'
import axios from "axios";
const LandingPage = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const empid = "E001";
  const [error,seterror] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const handleGetEmpData = async () => {
    // setloading(true);
    try {
        const response = await axios.get(`${BASE_URL}/getEmpDetail`);
        if (response?.status === 200) {
            // localStorage.setItem("User", JSON.stringify(response?.data?.user));
            // setAuth(true);
            // navigate('/');
            console.log("getiing emp details on fe",response.data);
            setEmployeeDetails(response.data);
        }
        else {
            seterror(response?.data?.errormsg);
        }
    } catch (error) {
        seterror(error.message);
    }
    finally {
        // setloading(false);
    }
}

useEffect(() => {
handleGetEmpData();
},[])


  return (
    <>
    <div><AppbarComponent expenseTabs={SkillTabs}/></div>
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px 20px',
          marginTop: '50px',
        }}
      >


    <Routes>
      <Route path="overview" element={<Overview employeeDetails={employeeDetails}/>}/>
    </Routes>
      </Box>
    </>
  )
}

export default LandingPage
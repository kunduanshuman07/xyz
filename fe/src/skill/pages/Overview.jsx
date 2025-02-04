import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    DataGridPremium,
    GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
    GridToolbar,
    useGridApiRef,
    useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useEffect } from 'react';
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
    fontSize: "14px",
    margin: "0px",
    "&.MuiButtonBase-root MuiAccordionSummary-root MuiAccordionSummary-gutters": {
        minHeight: 0,
        height: "20px",
    },
    "&.MuiAccordionSummary-content.Mui-expanded": {
        marginBottom: "41px",
    },
    // "&.MuiButtonBase-root": {
    //   padding: "0px 16px !important",
    // },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    "&.MuiAccordionDetails-root": {
        padding: "10px 4px 5px 20px",
    },
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "#1a90ff",
        ...theme.applyStyles("dark", {
            backgroundColor: "#308fe8",
        }),
    },
}));
const Accordion = styled(MuiAccordion)(({ theme }) => ({
    "&.MuiAccordion-root.Mui-expanded": {
        margin: "0px",
    },
}));


const Overview = ({ employeeDetails }) => {
    const [empDetails, setempDetails] = useState([]);
    const renderAccordion = (params) => {
        let data = params?.row?.data1;
        console.log("params", data[0]?.deptId)
        return (
            <Accordion
                key={data[0]?.deptId}
                sx={{
                    height: "20px",
                    ".MuiCollapse-root .MuiCollapse-wrapper": {
                        marginTop: "-23px",
                    },
                }}
            >
                
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={`panel${data[0].deptId}-header`}
                    sx={{
                        minHeight: "0px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        display="flex"
                        sx={{
                            fontSize: "12px",
                            fontFamily: "montserrat",
                            overflow: "hidden",
                            flexGrow: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: "120px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {data[0].primaryName}
                        </Box>
                        <Box sx={{ width: "90px" }}>
                            <BorderLinearProgress
                                variant="determinate"
                                value={data.PrimaryScale * 20}
                                sx={{
                                    //   marginTop: "4px",
                                    marginLeft: "17px",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginLeft: "10px" }}>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                {data[0].PrimaryScale}
                            </Typography>
                        </Box>

                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {Array.isArray(data[0].techStckList) &&
                        data[0].techStckList.map((subSkill, subIndex) => (
                            <Box
                                key={subSkill.techStkId}
                                display="flex"
                                sx={{ fontSize: "10px" }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "10px",
                                        fontFamily: "montserrat",
                                        width: "150px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {subSkill.techStkName}
                                </Typography>
                                <Box sx={{ width: "30%" }}>
                                    <BorderLinearProgress
                                        variant="determinate"
                                        value={subSkill.Scale * 20}
                                        sx={{
                                            marginTop: "4px",
                                            marginLeft: "17px",
                                        }}
                                    />
                                </Box>
                                <Box sx={{ marginLeft: "10px" }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "10px",
                                        }}
                                    >
                                        {subSkill.Scale}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                </AccordionDetails>
            </Accordion>
        );

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'empname',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            width: 150,
            editable: true,
        },
        {
            field: 'grade',
            headerName: 'Grade',

            width: 110,
            editable: true,
        },
        {
            field: 'location',
            headerName: 'Location',

            width: 110,
            editable: true,
        },
        {
            field: 'projname',
            headerName: 'Project Name',

            width: 110,
            editable: true,
        },
        {
            field: 'yearofexp',
            headerName: 'Experience',

            width: 110,
            editable: true,
        },
        {
            field: 'Skills',
            headerName: 'Skills',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 300,
            renderCell: (params) => (
                renderAccordion(params)),

        },
    ];


    const data1 = [{
        deptId: "1",
        deptName: "dept 1",
      
            primaryId: "1",
            primaryName: "Primary 1",
            primaryScale:5,
            techStckList: [{
                techStkId: "1",
                techStkName: "tech stack 1",
                Scale:4,
                combinationId: "111"
            },
            {
                techStkId: "2",
                techStkName: "tech stack 2",
                combinationId: "112",
                Scale:4,

            },
            {
                techStkId: "3",
                techStkName: "tech stack 3",
                combinationId: "113",
                Scale:4,

            },]
        
    }]
    const rows = empDetails?.map((item) => ({
        ...item,
        id: 1,
        data1: data1
    }));

    useEffect(() => {
        setempDetails(employeeDetails)
    }, [employeeDetails])
    console.log("rows", employeeDetails);
    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}

export default Overview

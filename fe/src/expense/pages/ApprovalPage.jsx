import React, { useEffect, useState } from 'react'
import DataGridComponent from "../../common/DataGridComponent";
import { axiosInstance } from '../../hooks/useApiCall';
import { currencies } from '../utils';
import { approvalPageColumns } from '../gridColumns';
import { IconButton, Tab, Tabs } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { buttons } from '../../theme';
import { useNavigate } from 'react-router-dom';

const ApprovalPage = () => {
    const [rows, setrows] = useState([]);
    const [financerows, setfinancerows] = useState([]);
    const [value, setValue] = useState('1');
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("User"));
    useEffect(() => {
        const fetchManagerApprovals = async () => {
            const response = await axiosInstance({
                url: '/expense/fetch-approvals',
                method: 'POST',
                data: { empid: user?.empid }
            })
            const formattedRows = response?.data?.results?.map((item, index) => ({
                id: index + 1,
                expenseid: item.expenseid,
                empid: item.empid,
                project: `${item.projid}-${item.projname}`,
                expensename: item.expensename,
                amount: `${currencies.find(i => i.id === item.currencyid)?.currency} ${item.amount}`,
                date: new Date(item.raisedate).toLocaleDateString()
            }))
            setrows(formattedRows);
        }
        const fetchFinanceApprovals = async () => {
            const response = await axiosInstance({
                url: '/expense/fetch-finance-approvals',
                method: 'GET',
            })
            const formattedRows = response?.data?.results?.map((item, index) => ({
                id: index + 1,
                expenseid: item.expenseid,
                empid: item.empid,
                project: `${item.projid}-${item.projname}`,
                expensename: item.expensename,
                amount: `${currencies.find(i => i.id === item.currencyid)?.currency} ${item.amount}`,
                date: new Date(item.raisedate).toLocaleDateString()
            }))
            setfinancerows(formattedRows);
        }

        fetchManagerApprovals();
        if (user?.dept === 'Business') {
            fetchFinanceApprovals();
        }
    }, [])

    const handleViewClick = (row) => {
        if(user?.dept === 'Business'){
            navigate(`/expense/approvals/${row.expenseid}+approvals+2`)
        }
        else {
            navigate(`/expense/approvals/${row.expenseid}+approvals+1`)
        }
    }

    const columns = approvalPageColumns.map((col) => {
        if (col.field === 'view') {
            return {
                ...col,
                renderCell: (params) => (
                    <IconButton
                        size="small"
                        sx={{ color: buttons.background }}
                        onClick={() => handleViewClick(params.row)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                ),
            };
        }
        return col;
    });

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Tabs
                value={value}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                sx={{ marginBottom: "10px" }}
            >
                {user?.dept==='Business' && <Tab value="1" label="Finance" sx={{ textTransform: "none", fontFamily: "Montserrat" }} />}
                <Tab value="2" label="Managerial" sx={{ textTransform: "none", fontFamily: "Montserrat" }} />
            </Tabs>
            {value === '1' && <DataGridComponent rows={financerows} columns={columns} height={'78vh'} />}
            {value === '2' && <DataGridComponent rows={rows} columns={columns} height={'78vh'} />}
        </>
    )
}

export default ApprovalPage
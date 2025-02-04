import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { buttons } from '../theme';

export const expenseOverviewColumns = [
    { field: 'id', headerName: 'No.', width: 90 },
    {
        field: 'project',
        headerName: 'Project',
        flex: 1,
        editable: false,
    },
    {
        field: 'expensename',
        headerName: 'Expense Name',
        flex: 1,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        editable: false,
    },
    {
        field: 'stage',
        headerName: 'Stage',
        flex: 1,
        editable: false,
    },
    {
        field: 'view',
        headerName: 'View',
        flex: 0.5,
        align: "center",
        headerAlign: "center",
        editable: false,
        renderCell: (params) => (
            <IconButton size='small' sx={{ color: buttons.background }}>
                <VisibilityIcon />
            </IconButton>
        ),
    },
];


export const approvalPageColumns = [
    { field: 'id', headerName: 'No.', width: 90 },
    {
        field: 'empid',
        headerName: 'Employee Id',
        flex: 1,
        editable: false,
    },
    {
        field: 'project',
        headerName: 'Project',
        flex: 1,
        editable: false,
    },
    {
        field: 'expensename',
        headerName: 'Expense Name',
        flex: 1,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        editable: false,
    },
    {
        field: 'view',
        headerName: 'View',
        flex: 0.5,
        editable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <IconButton size='small' sx={{ color: buttons.background }}>
                <VisibilityIcon />
            </IconButton>
        ),
    },
];
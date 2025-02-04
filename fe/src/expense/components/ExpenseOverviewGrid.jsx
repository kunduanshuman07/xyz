import * as React from 'react';
import DataGridComponent from '../../common/DataGridComponent';
import { action, approvalstages, currencies } from '../utils';
import { expenseOverviewColumns } from '../gridColumns';
import { IconButton } from '@mui/material';
import { buttons } from '../../theme';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

export default function ExpenseOverviewGrid({ data }) {
    const [rows, setrows] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(() => {
        const formattedRows = data?.map((item, index) => ({
            id: index + 1,
            expenseid: item.expenseid,
            project: `${item?.projid}-${item?.projname}`,
            expensename: item?.expensename,
            amount: `${currencies.find(i => i.id === item?.currencyid)?.currency} ${item?.amount}`,
            date: new Date(item.raisedate).toLocaleDateString(),
            status: `${action.find(i => i.id === item?.action)?.label}`,
            stage: `${approvalstages.find(i => i.id === item?.approvalstageid)?.label}`
        }))
        setrows(formattedRows);
    }, [data])

    const handleViewClick = (row) => {
        navigate(`/expense/overview/${row.expenseid}+overview`)
    }

    const columns = expenseOverviewColumns.map((col) => {
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

    return (
        <DataGridComponent rows={rows} columns={columns} height={500} />
    );
}

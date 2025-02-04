import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function DataGridComponent({ rows, columns, height }) {
    return (
        <Box sx={{ height: height, width: '100%', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px" }}>
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
                disableRowSelectionOnClick
                disableMultipleRowSelection
                slots={{ toolbar: GridToolbar }}
                sx={{ borderRadius: "10px", padding: "10px", fontFamily: "Montserrat" }}
                hideFooterSelectedRowCount
                density='comfortable'
            />
        </Box>
    );
}

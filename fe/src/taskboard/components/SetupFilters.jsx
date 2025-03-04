import React from 'react'
import { Box, Checkbox, Chip, FormControl, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useAssigneeFilter } from "../../context/AssigneFilterProvider";
import ClearIcon from '@mui/icons-material/Clear';
import { issuestatus } from '../utils';
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SetupFilters = () => {
    const { statusFilters, setStatusFilters } = useAssigneeFilter();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setStatusFilters(
            typeof value === 'string' ? value.split(',').reverse() : [...value].reverse()
        );
    };
    const statuses = {
        "0": "Setup",
        "1": "Inprogress",
        "2": "Done"
    }
    return (
        <Box display={'flex'}>
            <FormControl sx={{ width: 200, marginY: "auto", marginX: "10px" }} size='small'>
                <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: "12px", fontFamily: "montserrat" }}>Status</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={statusFilters}
                    onChange={handleChange}
                    input={<OutlinedInput label="Assignee" />}
                    sx={{
                        fontSize: "12px",
                        ".css-1toxriw-MuiList-root-MuiMenu-list": {
                            padding: "0px"
                        }
                    }}
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                gap: 0.5,
                                overflowX: 'auto',
                                maxWidth: 300,
                                '&::-webkit-scrollbar': { height: '0px' },
                                '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '4px' },
                            }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={statuses[value]} sx={{ fontFamily: "montserrat", fontSize: "8px", height: "18px" }} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {issuestatus?.map((name) => (
                        <MenuItem key={name.id} value={name.id} sx={{ fontSize: "10px" }}>
                            <Checkbox checked={statusFilters.includes(name.id)} size='small' checkedIcon={<AssignmentTurnedInIcon />} />
                            <ListItemText primary={name.label} sx={{
                                fontSize: "10px",
                                ".css-rizt0-MuiTypography-root": {
                                    fontSize: "0.8rem"
                                }
                            }} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {statusFilters?.length !== 0 &&
                <Tooltip title='Clear assignee filter'>
                    <IconButton sx={{ margin: "auto 5px" }} size='small' onClick={() => setStatusFilters([])}>
                        <ClearIcon sx={{ fontSize: "12px" }} />
                    </IconButton>
                </Tooltip>
            }
        </Box>
    )
}

export default SetupFilters;
import React from 'react'
import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
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


const AssigneeFilterSelect = () => {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          typeof value === 'string' ? value.split(',').reverse() : [...value].reverse()
        );
      };
    return (
        <FormControl sx={{ width: 300, marginY: "auto" }} size='small'>
            <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: "12px", fontFamily: "montserrat" }}>Assignee</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
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
                            <Chip key={value} label={value} sx={{ fontFamily: "montserrat", fontSize: "8px", height: "18px" }} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name} sx={{ fontSize: "10px" }}>
                        <Checkbox checked={personName.includes(name)} size='small' checkedIcon={<AssignmentTurnedInIcon/>}/>
                        <ListItemText primary={name} sx={{
                            fontSize: "10px",
                            ".css-rizt0-MuiTypography-root": {
                                fontSize: "0.8rem"
                            }
                        }} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default AssigneeFilterSelect